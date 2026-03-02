import { ValidationError } from "../errors/ValidationError";

/** E.164 format: optional +, 7–15 digits */
const PHONE_NUMBER_REGEX = /^\+?[1-9]\d{6,14}$/;

export class User {
  readonly id: string;
  readonly phoneNumber: string;
  readonly createdAt: Date;

  private constructor(id: string, phoneNumber: string, createdAt: Date) {
    this.id = id;
    this.phoneNumber = phoneNumber;
    this.createdAt = createdAt;
  }

  static create(props: {
    id: string;
    phoneNumber: string;
    createdAt?: Date;
  }): User {
    if (!props.id || props.id.trim() === "") {
      throw new ValidationError("User id is required.", "id");
    }

    const phone = props.phoneNumber?.trim();

    if (!phone) {
      throw new ValidationError("Phone number is required.", "phoneNumber");
    }

    if (!PHONE_NUMBER_REGEX.test(phone)) {
      throw new ValidationError(
        `Invalid phone number format: "${phone}". Expected E.164 format (e.g. +15551234567).`,
        "phoneNumber",
      );
    }

    return new User(props.id.trim(), phone, props.createdAt ?? new Date());
  }

  isSameUser(otherUserId: string): boolean {
    return this.id === otherUserId;
  }
}
