import knex, { type Knex } from "knex";
import config from "./knexfile";

/**
 * Singleton Knex instance.
 * Consumers import `db` for query building.
 * process.env is never read here — all config comes from knexfile.ts.
 */
export const db: Knex = knex(config);
