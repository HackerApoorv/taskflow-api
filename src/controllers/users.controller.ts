import { Request, Response } from 'express';

export const users = [
  { id: 1, name: 'Apoorv', email: 'apoorv@email.com' },];

export const getUsers = (_req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request<{id: string}>, res: Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name.trim() || !email.trim()) {
    return res.status(400).json({ message: 'Name and email are required' });
  } 
  const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: newUserId, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request<{id: string}>, res: Response) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex] = { ...users[userIndex], name, email };
  res.json(users[userIndex]);
};

export const deleteUser = (req: Request<{id: string}>, res: Response) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
};
