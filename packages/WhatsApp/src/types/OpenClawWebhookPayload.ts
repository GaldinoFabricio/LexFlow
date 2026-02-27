/**
 * OpenClaw WhatsApp webhook payload types.
 *
 * Based on: https://docs.openclaw.ai/channels/whatsapp
 *
 * OpenClaw normalises inbound messages from Baileys (WhatsApp Web) before
 * delivering them. These types represent the normalised wire format.
 */

// ── Sender identity ──────────────────────────────────────────────────────────

/** E.164 phone number, e.g. "+15551234567" */
export type E164PhoneNumber = string;

/** WhatsApp group JID, e.g. "120363XXXXXXXX@g.us" */
export type GroupJid = string;

/** Direct-chat JID, e.g. "15551234567@s.whatsapp.net" */
export type DirectJid = string;

export type ChatJid = GroupJid | DirectJid;

// ── Media ────────────────────────────────────────────────────────────────────

/**
 * Media types that WhatsApp can deliver.
 * Media-only inbound messages use placeholders in the normalised body.
 */
export type WhatsAppMediaType =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "sticker";

/** Normalised media placeholder that appears in message body */
export type MediaPlaceholder = `<media:${WhatsAppMediaType}>`;

// ── Quoted reply context ─────────────────────────────────────────────────────

/**
 * When a message is a quoted reply, OpenClaw appends structured context
 * to the body:
 *
 *   [Replying to +1555 id:ABC123]
 *   <quoted text or <media:...>>
 *   [/Replying]
 */
export interface QuotedReplyContext {
  /** Stanza ID of the message being replied to */
  readonly replyToId: string;
  /** Body of the quoted message, or a media placeholder */
  readonly replyToBody: string;
  /** E.164 of the original sender, when known */
  readonly replyToSender: E164PhoneNumber | null;
}

// ── DM policy ────────────────────────────────────────────────────────────────

export type DmPolicy = "pairing" | "allowlist" | "open" | "disabled";

// ── Group activation ─────────────────────────────────────────────────────────

export type GroupActivationMode = "mention" | "always";

// ── Inbound message context ──────────────────────────────────────────────────

export type MessageContext = "direct" | "group" | "self";

// ── Core webhook payload ─────────────────────────────────────────────────────

/**
 * Normalised inbound message payload delivered by the OpenClaw gateway.
 *
 * Source event on the gateway side: Baileys `messages.upsert`.
 * Status/broadcast chats are filtered out before this payload is emitted.
 */
export interface OpenClawWebhookPayload {
  /** Unique WhatsApp stanza / message ID */
  readonly messageId: string;

  /** ISO-8601 timestamp of when the message was sent */
  readonly timestamp: string;

  /** Sender phone number in E.164 format */
  readonly from: E164PhoneNumber;

  /** Destination JID — group JID for group chats, direct JID for DMs */
  readonly chatJid: ChatJid;

  /** Whether the message arrived in a group chat */
  readonly isGroup: boolean;

  /** Whether the message was sent by the gateway's own linked number */
  readonly fromMe: boolean;

  /**
   * Normalised message body.
   * - Text messages: plain text content.
   * - Media-only messages: a placeholder string, e.g. `<media:image>`.
   * - Quoted replies: body + appended `[Replying to …] … [/Replying]` block.
   */
  readonly body: string;

  /**
   * Structured quoted-reply metadata, populated when the sender replied to
   * an earlier message. `null` when the message is not a reply.
   */
  readonly quotedReply: QuotedReplyContext | null;

  /**
   * Present when the message contains a media attachment.
   * The `body` will contain the corresponding `<media:…>` placeholder.
   */
  readonly mediaType: WhatsAppMediaType | null;

  /**
   * OpenClaw account ID that received this message.
   * Relevant when running multiple WhatsApp accounts in one gateway.
   * Defaults to `"default"` for single-account setups.
   */
  readonly accountId: string;

  /**
   * Display name of the sender as known to the gateway.
   * May be absent if the sender is not in the contact list.
   */
  readonly senderName: string | null;

  /**
   * For group messages: display name and JID of the participant who sent it.
   * `null` for direct messages.
   */
  readonly groupParticipant: {
    readonly jid: string;
    readonly name: string | null;
  } | null;
}

// ── Outbound send params ─────────────────────────────────────────────────────

/** Parameters for sending a message via the OpenClaw gateway */
export interface OpenClawSendParams {
  readonly chatJid: ChatJid;
  readonly text: string;
  readonly accountId?: string;
  /** For group messages: participant JID to quote-reply to */
  readonly replyToId?: string;
}

// ── Reaction params ──────────────────────────────────────────────────────────

export interface OpenClawReactionParams {
  readonly chatJid: ChatJid;
  readonly messageId: string;
  readonly emoji: string;
  readonly remove?: boolean;
  readonly participant?: string;
  readonly fromMe?: boolean;
  readonly accountId?: string;
}
