function require(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: "${name}"`);
  return value;
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export const env = {
  NODE_ENV: optional('NODE_ENV', 'development') as 'development' | 'production' | 'test',
  PORT:     Number(optional('PORT', '3000')),

  // Database
  DB_HOST:     optional('DB_HOST',     'localhost'),
  DB_PORT:     Number(optional('DB_PORT', '5432')),
  DB_NAME:     optional('DB_NAME',     'lex_flow'),
  DB_USER:     optional('DB_USER',     'postgres'),
  DB_PASSWORD: optional('DB_PASSWORD', ''),

  // Auth
  JWT_SECRET:             require('JWT_SECRET'),
  JWT_EXPIRES_IN_SECONDS: Number(optional('JWT_EXPIRES_IN_SECONDS', '3600')),

  // Forwarding
  MESSAGE_FORWARDER_URL: optional('MESSAGE_FORWARDER_URL', ''),
} as const;

export type Env = typeof env;