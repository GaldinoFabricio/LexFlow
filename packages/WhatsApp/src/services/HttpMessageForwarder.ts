import type { IMessageForwarder } from './IMessageForwarder';
import type { IncomingMessageDto } from '../dto/IncomingMessageDto';

export class ForwardError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, statusText: string) {
    super(`Failed to forward message: HTTP ${statusCode} ${statusText}`);
    this.name = 'ForwardError';
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class HttpMessageForwarder implements IMessageForwarder {
  constructor(private readonly backendUrl: string) {}

  async forward(message: IncomingMessageDto): Promise<void> {
    const response = await fetch(this.backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new ForwardError(response.status, response.statusText);
    }
  }
}