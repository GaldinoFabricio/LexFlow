import type { OpenClawWebhookPayload } from "../types/OpenClawWebhookPayload";
import type {
  IncomingMessageDto,
  IncomingMessageContext,
  IncomingMessageReply,
  IncomingMessageAttachment,
} from "../dto/IncomingMessageDto";

// ── Parser error ─────────────────────────────────────────────────────────────

export class OpenClawParseError extends Error {
  public readonly field: string;

  constructor(field: string, reason: string) {
    super(`Invalid OpenClaw payload — field "${field}": ${reason}`);
    this.name = "OpenClawParseError";
    this.field = field;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// ── Validation helpers ────────────────────────────────────────────────────────

function requireString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new OpenClawParseError(field, "must be a non-empty string");
  }
  return value;
}

function requireIso8601(value: unknown, field: string): string {
  const str = requireString(value, field);
  if (isNaN(Date.parse(str))) {
    throw new OpenClawParseError(field, "must be a valid ISO-8601 date string");
  }
  return str;
}

function requireBoolean(value: unknown, field: string): boolean {
  if (typeof value !== "boolean") {
    throw new OpenClawParseError(field, "must be a boolean");
  }
  return value;
}

// ── Context resolution ────────────────────────────────────────────────────────

function resolveContext(
  payload: OpenClawWebhookPayload,
): IncomingMessageContext {
  if (payload.fromMe) return "self";
  if (payload.isGroup) return "group";
  return "direct";
}

// ── Reply mapping ─────────────────────────────────────────────────────────────

function mapReply(
  payload: OpenClawWebhookPayload,
): IncomingMessageReply | null {
  if (!payload.quotedReply) return null;

  return {
    toMessageId: requireString(
      payload.quotedReply.replyToId,
      "quotedReply.replyToId",
    ),
    toBody: requireString(
      payload.quotedReply.replyToBody,
      "quotedReply.replyToBody",
    ),
    toSender: payload.quotedReply.replyToSender ?? null,
  };
}

// ── Attachment mapping ────────────────────────────────────────────────────────

function mapAttachment(
  payload: OpenClawWebhookPayload,
): IncomingMessageAttachment | null {
  if (!payload.mediaType) return null;

  const allowed = ["image", "video", "audio", "document", "sticker"] as const;
  if (!allowed.includes(payload.mediaType as (typeof allowed)[number])) {
    throw new OpenClawParseError(
      "mediaType",
      `unknown media type "${payload.mediaType}"`,
    );
  }

  return { kind: payload.mediaType };
}

// ── Main parser ───────────────────────────────────────────────────────────────

/**
 * Transforms a raw OpenClaw WhatsApp webhook payload into an IncomingMessageDto.
 *
 * - Validates all required fields, throwing OpenClawParseError on failure.
 * - Pure function: no HTTP calls, no side effects, no domain entities.
 */
export function parseOpenClawPayload(
  payload: OpenClawWebhookPayload,
): IncomingMessageDto {
  return {
    id: requireString(payload.messageId, "messageId"),
    channel: "whatsapp",
    sentAt: requireIso8601(payload.timestamp, "timestamp"),
    from: requireString(payload.from, "from"),
    chatId: requireString(payload.chatJid, "chatJid"),
    isGroup: requireBoolean(payload.isGroup, "isGroup"),
    body: requireString(payload.body, "body"),
    reply: mapReply(payload),
    attachment: mapAttachment(payload),
    senderName: payload.senderName ?? null,
    context: resolveContext(payload),
    accountId: requireString(payload.accountId, "accountId"),
  };
}
