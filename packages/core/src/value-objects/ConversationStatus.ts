import { ValidationError } from "../errors/ValidationError";

export enum ConversationStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  ARCHIVED = "ARCHIVED",
}

const VALID = new Set<string>(Object.values(ConversationStatus));

export function parseConversationStatus(value: string): ConversationStatus {
  if (!VALID.has(value)) {
    throw new ValidationError(
      `Invalid ConversationStatus: "${value}". Must be one of: ${[...VALID].join(", ")}.`,
      "status",
    );
  }
  return value as ConversationStatus;
}
