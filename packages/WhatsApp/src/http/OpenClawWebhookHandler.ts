import { parseOpenClawPayload } from "../parser/OpenClawMessageParser";
import type { IMessageForwarder } from "../services/IMessageForwarder";
import type { OpenClawWebhookPayload } from "../types/OpenClawWebhookPayload";

// ── Response contract ─────────────────────────────────────────────────────────

export interface WebhookHandlerResult {
  readonly success: true;
  readonly messageId: string;
}

// ── Handler factory ───────────────────────────────────────────────────────────

export type WebhookHandler = (
  payload: OpenClawWebhookPayload,
) => Promise<WebhookHandlerResult>;

/**
 * Factory that composes the parser and forwarder into a single handler function.
 *
 * The returned function:
 *   1. Parses the raw OpenClaw payload into an IncomingMessageDto.
 *   2. Forwards the DTO to the internal backend via the injected forwarder.
 *   3. Returns a plain result object — no Express req/res, no HTTP coupling.
 *
 * Errors from the parser (OpenClawParseError) and forwarder (ForwardError)
 * propagate naturally so the caller (e.g. a route) can map them to HTTP responses.
 */
export function createOpenClawWebhookHandler(
  forwarder: IMessageForwarder,
): WebhookHandler {
  return async function handleWebhook(
    payload: OpenClawWebhookPayload,
  ): Promise<WebhookHandlerResult> {
    const dto = parseOpenClawPayload(payload);
    await forwarder.forward(dto);

    return { success: true, messageId: dto.id };
  };
}
