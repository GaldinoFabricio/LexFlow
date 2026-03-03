export interface JwtConfig {
  readonly secret: string;
  readonly expiresInSeconds: number;
}

export function loadJwtConfig(): JwtConfig {
  const secret = process.env['JWT_SECRET'];
  if (!secret) throw new Error('Missing required environment variable: "JWT_SECRET"');

  const raw = process.env['JWT_EXPIRES_IN_SECONDS'];
  const expiresInSeconds = raw ? parseInt(raw, 10) : 3600; // default: 1 hour

  if (isNaN(expiresInSeconds) || expiresInSeconds <= 0) {
    throw new Error(`JWT_EXPIRES_IN_SECONDS must be a positive integer, got: "${raw}"`);
  }

  return { secret, expiresInSeconds };
}