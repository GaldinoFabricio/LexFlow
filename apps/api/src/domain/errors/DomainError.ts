import { AppError } from "./AppError";

export class DomainError extends AppError {
  constructor(message: string, code: string, statusHint = 400) {
    super(message, code, statusHint);
    this.name = "DomainError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string, id?: string) {
    super(
      id ? `${resource} with id "${id}" not found.` : `${resource} not found.`,
      "NOT_FOUND",
      404,
    );
    this.name = "NotFoundError";
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR", 422);
    this.name = "ValidationError";
  }
}

export class InvalidMessageError extends DomainError {
  constructor(reason: string) {
    super(`Invalid message: ${reason}`, "INVALID_MESSAGE", 422);
    this.name = "InvalidMessageError";
  }
}
