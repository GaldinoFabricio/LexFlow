import type { Knex } from "knex";

const TABLE = "conversations";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE, (table: Knex.CreateTableBuilder) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.string("channel").notNullable().defaultTo("whatsapp");
    table.string("status").notNullable();
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE);
}
