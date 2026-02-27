function require(name: string): string {
  const value = process.env[name];
  if (!value)
    throw new Error(`Missing required environment variable: "${name}"`);
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  NODE_ENV: optional("NODE_ENV", "development") as
    | "development"
    | "production"
    | "test",
  PORT: Number(optional("PORT", "3000")),
  MESSAGE_FORWARDER_URL: optional("MESSAGE_FORWARDER_URL", ""),
} as const;

export type Env = typeof env;
