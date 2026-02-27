/**
 * IncomingMessageDto
 *
 * Internal representation of an inbound WhatsApp message after it has been
 * received from the OpenClaw gateway. This DTO travels from the whatsapp
 * package into the application layer.
 *
 * Rules:
 * - No OpenClaw-specific field names leak beyond this boundary.
 * - All fields are readonly (immutable once created).
 * - No methods — plain data only.
 */

export type IncomingMessageChannel = "whatsapp";

export type IncomingMessageContext = "direct" | "group" | "self";

export interface IncomingMessageAttachment {
  /** Normalised media kind */
  readonly kind: "image" | "video" | "audio" | "document" | "sticker";
}

export interface IncomingMessageReply {
  /** ID of the message being replied to */
  readonly toMessageId: string;
  /** Text or media placeholder of the quoted message */
  readonly toBody: string;
  /** E.164 of the original author, when known */
  readonly toSender: string | null;
}

export interface IncomingMessageDto {
  /** Provider-assigned message ID (WhatsApp stanza ID) */
  readonly id: string;

  /** Always 'whatsapp' for this package */
  readonly channel: IncomingMessageChannel;

  /** ISO-8601 timestamp of when the message was sent by the user */
  readonly sentAt: string;

  /** Sender phone number in E.164 format, e.g. "+15551234567" */
  readonly from: string;

  /** Destination chat identifier (group JID or direct JID) */
  readonly chatId: string;

  /** Whether the message originated in a group chat */
  readonly isGroup: boolean;

  /** Normalised text body of the message */
  readonly body: string;

  /**
   * Populated when the user replied to a previous message.
   * `null` for standalone messages.
   */
  readonly reply: IncomingMessageReply | null;

  /**
   * Present when the message contains a media file.
   * `null` for text-only messages.
   */
  readonly attachment: IncomingMessageAttachment | null;

  /** Display name of the sender, when available */
  readonly senderName: string | null;

  /** Context in which the message was received */
  readonly context: IncomingMessageContext;

  /**
   * OpenClaw account ID that received this message.
   * Useful when running multiple WhatsApp accounts.
   */
  readonly accountId: string;
}
