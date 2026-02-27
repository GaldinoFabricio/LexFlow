import type { IncomingMessageDto } from '../dto/IncomingMessageDto';

export interface IMessageForwarder {
  forward(message: IncomingMessageDto): Promise<void>;
}