import type { Request, Response } from 'express';
import * as userService from '../services/user.service.js';


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

export const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  const userId = parseId(req.params.id);
  if (userId === null) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  await userService.deleteUser(userId);
  res.status(204).send();
};


export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const userId = parseId(req.params.id);
  if (userId === null) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const { name, email } = req.body ?? {};

  if (!isNonEmptyString(name) || !isNonEmptyString(email)) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = await userService.updateUser(userId, { name, email });
  res.json(user);
};