import type { Knex } from "knex";

const USER_ID = "00000000-0000-0000-0000-000000000001";
const CONVERSATION_ID = "00000000-0000-0000-0000-000000000002";
const MESSAGE_ID = "00000000-0000-0000-0000-000000000003";

export async function seed(knex: Knex): Promise<void> {
  // Clear in reverse dependency order to avoid FK violations
  await knex("messages").del();
  await knex("conversations").del();
  await knex("users").del();

  await knex("users").insert({
    id: USER_ID,
    phone_number: "+15551234567",
    created_at: new Date(),
  });

  await knex("conversations").insert({
    id: CONVERSATION_ID,
    user_id: USER_ID,
    channel: "whatsapp",
    status: "open",
    created_at: new Date(),
  });

  await knex("messages").insert({
    id: MESSAGE_ID,
    conversation_id: CONVERSATION_ID,
    sender_type: "user",
    content: "Hello, this is a seed message.",
    created_at: new Date(),
  });
}
