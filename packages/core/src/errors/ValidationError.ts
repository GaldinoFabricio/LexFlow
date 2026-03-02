import { DomainError } from "./DomainError";

export class ValidationError extends DomainError {
  public readonly field: string | undefined;

  constructor(message: string, field?: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
    this.field = field;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
