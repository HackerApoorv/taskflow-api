export type ErrorCode =
  | 'USER_NOT_FOUND'
  | 'EMAIL_TAKEN'
  | 'DOMAIN_BLOCKED';

export class AppError extends Error {
  readonly code: ErrorCode;

  constructor(code: ErrorCode, message: string) {
    super(message);
    this.name = 'AppError';
    this.code = code;
  }
}