import { ValidationError } from "../errors/ValidationError";

export enum MessageSenderType {
  USER = "USER",
  SYSTEM = "SYSTEM",
  AGENT = "AGENT",
}

const VALID = new Set<string>(Object.values(MessageSenderType));

export function parseMessageSenderType(value: string): MessageSenderType {
  if (!VALID.has(value)) {
    throw new ValidationError(
      `Invalid MessageSenderType: "${value}". Must be one of: ${[...VALID].join(", ")}.`,
      "senderType",
    );
  }
  return value as MessageSenderType;
}
