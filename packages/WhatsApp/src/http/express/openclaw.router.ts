import type { Express, Request, Response, NextFunction } from "express";
import { createOpenClawWebhookHandler } from "../OpenClawWebhookHandler";
import { OpenClawParseError } from "../../parser/OpenClawMessageParser";
import { ForwardError } from "../../services/HttpMessageForwarder";
import type { IMessageForwarder } from "../../services/IMessageForwarder";

/**
 * Mounts the OpenClaw WhatsApp webhook route onto an Express app.
 *
 * All parsing and forwarding is delegated — this file's only job is
 * translating between Express req/res and the framework-free handler.
 */
export function mountOpenClawWebhook(
  app: Express,
  forwarder: IMessageForwarder,
): void {
  const handle = createOpenClawWebhookHandler(forwarder);

  app.post(
    "/webhooks/whatsapp",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const result = await handle(req.body);
        res.status(200).json(result);
      } catch (err) {
        if (err instanceof OpenClawParseError) {
          res.status(400).json({
            success: false,
            error: {
              code: "INVALID_PAYLOAD",
              message: err.message,
              field: err.field,
            },
          });
          return;
        }

        if (err instanceof ForwardError) {
          res.status(502).json({
            success: false,
            error: { code: "FORWARD_FAILED", message: err.message },
          });
          return;
        }

        next(err);
      }
    },
  );
}
