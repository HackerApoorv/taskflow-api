import type { Request, Response } from 'express';
import { db } from '../prisma/db.js';
import * as userService from '../services/user.services.js';

// "12" -> 12, but "12abc", "0", "-1", "abc" -> null
function parseId(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  const id = Number(raw);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export const getUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const userId = parseId(req.params.id);
  if (userId === null) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  const user = await userService.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body ?? {};

  if (!isNonEmptyString(name) || !isNonEmptyString(email)) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = await userService.createUser({ name, email });
  res.status(201).json(user);
};

// ─── TODO (your task): move these two into the service ───────────────

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const userId = parseInt(req.params.id);
  await db.orm.public.User.where({ id: userId }).delete();
  res.status(204).send();
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;

  if (!name.trim() || !email.trim()) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = await db.orm.public.User.first({ id: userId });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  try {
    const updatedUser = await db.orm.public.User.where({ id: userId }).update({
      name,
      email,
    });
    return res.json(updatedUser);
  } catch (error) {
    return res.status(409).json({ error: 'Email already exists' });
  }
};