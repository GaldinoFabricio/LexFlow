import type { IMessageForwarder } from "../../domain/ports/IMessageForwarder";
import type { Message } from "../../domain/entities/Message";

export class HttpMessageForwarder implements IMessageForwarder {
  constructor(private readonly targetUrl: string) {}

  async forward(message: Message): Promise<void> {
    const response = await fetch(this.targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message.toProps()),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to forward message "${message.id}": HTTP ${response.status} ${response.statusText}`,
      );
    }
  }
}
