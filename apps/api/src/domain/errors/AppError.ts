export class AppError extends Error {
  public readonly code: string;
  public readonly statusHint: number;

  constructor(message: string, code: string, statusHint = 500) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusHint = statusHint;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
