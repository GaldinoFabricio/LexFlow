import {
  ConversationStatus,
  parseConversationStatus,
} from "../value-objects/ConversationStatus";
import { ValidationError } from "../errors/ValidationError";
import { DomainError } from "../errors/DomainError";
import { Message } from "./Message";

export interface ConversationProps {
  readonly id: string;
  readonly userId: string;
  readonly status: ConversationStatus;
  readonly messages: Message[];
  readonly createdAt: Date;
}

export class Conversation {
  readonly id: string;
  readonly userId: string;
  readonly createdAt: Date;

  private _status: ConversationStatus;
  private _messages: Message[];

  private constructor(props: ConversationProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.createdAt = props.createdAt;
    this._status = props.status;
    this._messages = [...props.messages];
  }

  static create(props: {
    id: string;
    userId: string;
    status?: string;
    messages?: Message[];
    createdAt?: Date;
  }): Conversation {
    if (!props.id || props.id.trim() === "") {
      throw new ValidationError("Conversation id is required.", "id");
    }

    if (!props.userId || props.userId.trim() === "") {
      throw new ValidationError("Conversation userId is required.", "userId");
    }

    const status = parseConversationStatus(
      props.status ?? ConversationStatus.OPEN,
    );

    return new Conversation({
      id: props.id,
      userId: props.userId,
      status,
      messages: props.messages ?? [],
      createdAt: props.createdAt ?? new Date(),
    });
  }

  get status(): ConversationStatus {
    return this._status;
  }

  get messages(): ReadonlyArray<Message> {
    return this._messages;
  }

  isOpen(): boolean {
    return this._status === ConversationStatus.OPEN;
  }

  addMessage(message: Message): void {
    if (!this.isOpen()) {
      throw new DomainError(
        `Cannot add message to a ${this._status.toLowerCase()} conversation.`,
        "CONVERSATION_NOT_OPEN",
      );
    }

    if (message.conversationId !== this.id) {
      throw new DomainError(
        `Message conversationId "${message.conversationId}" does not match conversation "${this.id}".`,
        "MESSAGE_CONVERSATION_MISMATCH",
      );
    }

    this._messages.push(message);
  }

  close(): void {
    if (this._status === ConversationStatus.CLOSED) {
      throw new DomainError(
        "Conversation is already closed.",
        "ALREADY_CLOSED",
      );
    }
    this._status = ConversationStatus.CLOSED;
  }

  archive(): void {
    if (this._status === ConversationStatus.ARCHIVED) {
      throw new DomainError(
        "Conversation is already archived.",
        "ALREADY_ARCHIVED",
      );
    }
    this._status = ConversationStatus.ARCHIVED;
  }
}
