export type LogLevel = "debug" | "info" | "warn" | "error";

export interface ILogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, meta?: Record<string, unknown>): void;
}

export class ConsoleLogger implements ILogger {
  constructor(private readonly context: string = "App") {}

  private write(
    level: LogLevel,
    message: string,
    meta?: Record<string, unknown>,
  ): void {
    const entry = JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      ...(meta !== undefined ? { meta } : {}),
    });

    level === "error" || level === "warn"
      ? console.error(entry)
      : console.log(entry);
  }

  debug(message: string, meta?: Record<string, unknown>): void {
    this.write("debug", message, meta);
  }
  info(message: string, meta?: Record<string, unknown>): void {
    this.write("info", message, meta);
  }
  warn(message: string, meta?: Record<string, unknown>): void {
    this.write("warn", message, meta);
  }
  error(message: string, meta?: Record<string, unknown>): void {
    this.write("error", message, meta);
  }

  child(context: string): ConsoleLogger {
    return new ConsoleLogger(`${this.context}:${context}`);
  }
}
