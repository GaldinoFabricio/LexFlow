export type MessageChannel = "whatsapp" | "email" | "sms";
export type MessageDirection = "inbound" | "outbound";
export type MessageStatus =
  | "pending"
  | "processing"
  | "delivered"
  | "failed"
  | "read";

export interface MessageProps {
  readonly id: string;
  readonly channel: MessageChannel;
  readonly direction: MessageDirection;
  readonly status: MessageStatus;
  readonly from: string;
  readonly to: string;
  readonly body: string;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export class Message {
  readonly id: string;
  readonly channel: MessageChannel;
  readonly direction: MessageDirection;
  readonly status: MessageStatus;
  readonly from: string;
  readonly to: string;
  readonly body: string;
  readonly metadata: Readonly<Record<string, unknown>>;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: MessageProps) {
    this.id = props.id;
    this.channel = props.channel;
    this.direction = props.direction;
    this.status = props.status;
    this.from = props.from;
    this.to = props.to;
    this.body = props.body;
    this.metadata = props.metadata;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static create(props: MessageProps): Message {
    if (!props.id) throw new Error("Message id is required.");
    if (!props.body) throw new Error("Message body is required.");
    if (!props.from) throw new Error("Message from is required.");
    if (!props.to) throw new Error("Message to is required.");
    return new Message(props);
  }

  withStatus(status: MessageStatus): Message {
    return Message.create({ ...this.toProps(), status, updatedAt: new Date() });
  }

  toProps(): MessageProps {
    return {
      id: this.id,
      channel: this.channel,
      direction: this.direction,
      status: this.status,
      from: this.from,
      to: this.to,
      body: this.body,
      metadata: this.metadata,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
