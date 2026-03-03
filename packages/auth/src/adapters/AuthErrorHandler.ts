import type { Request, Response, NextFunction } from 'express';

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number = 401,
    public readonly code: string = 'AUTH_ERROR',
  ) {
    super(message);
    this.name = 'AuthError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function authErrorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (err instanceof AuthError) {
    res.status(err.statusCode).json({ error: { code: err.code, message: err.message } });
    return;
  }
  next(err);
}