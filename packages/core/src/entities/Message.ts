import {
  MessageSenderType,
  parseMessageSenderType,
} from "../value-objects/MessageSenderType";
import { ValidationError } from "../errors/ValidationError";

export interface MessageProps {
  readonly id: string;
  readonly conversationId: string;
  readonly senderType: MessageSenderType;
  readonly content: string;
  readonly createdAt: Date;
}

export class Message {
  readonly id: string;
  readonly conversationId: string;
  readonly senderType: MessageSenderType;
  readonly content: string;
  readonly createdAt: Date;

  private constructor(props: MessageProps) {
    this.id = props.id;
    this.conversationId = props.conversationId;
    this.senderType = props.senderType;
    this.content = props.content;
    this.createdAt = props.createdAt;
  }

  static create(props: {
    id: string;
    conversationId: string;
    senderType: string;
    content: string;
    createdAt?: Date;
  }): Message {
    if (!props.id || props.id.trim() === "") {
      throw new ValidationError("Message id is required.", "id");
    }

    if (!props.conversationId || props.conversationId.trim() === "") {
      throw new ValidationError(
        "Message conversationId is required.",
        "conversationId",
      );
    }

    if (!props.content || props.content.trim() === "") {
      throw new ValidationError(
        "Message content must not be empty.",
        "content",
      );
    }

    const senderType = parseMessageSenderType(props.senderType);

    return new Message({
      id: props.id,
      conversationId: props.conversationId,
      senderType,
      content: props.content.trim(),
      createdAt: props.createdAt ?? new Date(),
    });
  }

  isFromUser(): boolean {
    return this.senderType === MessageSenderType.USER;
  }

  isSystemMessage(): boolean {
    return this.senderType === MessageSenderType.SYSTEM;
  }
}
