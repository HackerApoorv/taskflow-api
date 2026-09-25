import { Request, Response } from 'express';
import { db } from '../prisma/db';

export const getUsers = async (_req: Request, res: Response) => {
  const users = await db.orm.public.User.all();

  res.json(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const userId = parseInt(req.params.id);

  const user = await db.orm.public.User.first({
    id: userId,
  });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  
  const { name, email } = req.body;
  if (!name.trim() || !email.trim()) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newUser = await db.orm.public.User.create({
    name,
    email,
  });
  res.status(201).json(newUser);
};


export const deleteUser = async (req: Request<{id: string}>, res: Response) => {
  const userId = parseInt(req.params.id);
  await db.orm.public.User.where({
    id: userId,
  }).delete();
  res.status(204).send();
};
