import { db } from '../prisma/db.js';
import { AppError } from '../errors/app-error.js';

export async function getAllUsers() {
  return db.orm.public.User.all();
}

export async function getUserById(id: number) {
  return db.orm.public.User.first({ id });
}

export async function createUser(data: { name: string; email: string }) {
  const email = data.email.trim().toLowerCase();

  const taken = await db.orm.public.User.first({ email });
  if (taken) {
    throw new AppError('EMAIL_TAKEN', 'Email already exists');
  }

  return db.orm.public.User.create({
    name: data.name.trim(),
    email,
  });
}

export async function deleteUser(id: number) {
  const user = await db.orm.public.User.first({ id });
  if (!user) {
    throw new AppError('USER_NOT_FOUND', 'User not found');
  }
  await db.orm.public.User.where({ id }).delete();
}

export async function updateUser(id: number, data: { name: string; email: string }) {
  const user = await db.orm.public.User.first({ id });
  if (!user) {
    throw new AppError('USER_NOT_FOUND', 'User not found');
  }

  const email = data.email.trim().toLowerCase();
  if (email !== user.email) {
    const taken = await db.orm.public.User.first({ email });
    if (taken) {
      throw new AppError('EMAIL_TAKEN', 'Email already exists');
    }
  }

  return db.orm.public.User.where({ id }).update({
    name: data.name.trim(),
    email,
  });
}