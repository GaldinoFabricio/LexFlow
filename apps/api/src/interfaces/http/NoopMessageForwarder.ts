import type { IMessageForwarder } from "../../domain/ports/IMessageForwarder";
import type { Message } from "../../domain/entities/Message";

export class NoopMessageForwarder implements IMessageForwarder {
  async forward(_message: Message): Promise<void> {
    // Intentional no-op — used in development and testing environments.
  }
}
