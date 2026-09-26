import type { NextFunction, Request, Response } from 'express';
import { AppError, type ErrorCode } from '../errors/app-error.js';

const statusByCode: Record<ErrorCode, number> = {
  USER_NOT_FOUND: 404,
  EMAIL_TAKEN: 409,
  DOMAIN_BLOCKED: 403,
};

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (error instanceof AppError) {
    res.status(statusByCode[error.code]).json({ error: error.message });
    return;
  }

  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}