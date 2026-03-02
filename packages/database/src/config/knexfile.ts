import type { Knex } from "knex";

// ── Env helpers ───────────────────────────────────────────────────────────────

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value)
    throw new Error(`Missing required environment variable: "${name}"`);
  return value;
}

function requireEnvInt(name: string): number {
  const raw = requireEnv(name);
  const parsed = parseInt(raw, 10);
  if (isNaN(parsed))
    throw new Error(
      `Environment variable "${name}" must be an integer, got: "${raw}"`,
    );
  return parsed;
}

// ── Config ────────────────────────────────────────────────────────────────────

export interface DatabaseConnectionConfig {
  readonly host: string;
  readonly port: number;
  readonly user: string;
  readonly password: string;
  readonly database: string;
}

function loadConnectionConfig(): DatabaseConnectionConfig {
  return {
    host: requireEnv("DB_HOST"),
    port: requireEnvInt("DB_PORT"),
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASSWORD"),
    database: requireEnv("DB_NAME"),
  };
}

const development: Knex.Config = {
  client: "pg",
  connection: loadConnectionConfig(),
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
    tableName: "knex_migrations",
    extension: "ts",
  },
};

export default development;
