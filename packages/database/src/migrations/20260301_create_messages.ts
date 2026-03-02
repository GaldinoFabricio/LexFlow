import type { Knex } from "knex";

const TABLE = "messages";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TABLE, (table: Knex.CreateTableBuilder) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table
      .uuid("conversation_id")
      .notNullable()
      .references("id")
      .inTable("conversations")
      .onDelete("CASCADE");
    table.string("sender_type").notNullable();
    table.text("content").notNullable();
    table
      .timestamp("created_at", { useTz: true })
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TABLE);
}
