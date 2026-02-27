import type { Message } from '../entities/Message';

export interface IMessageRepository {
  save(message: Message): Promise<Message>;
  findById(id: string): Promise<Message | null>;
  findAll(): Promise<Message[]>;
}