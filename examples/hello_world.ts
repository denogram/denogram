// BOT_TOKEN=<bot_token> deno run --allow-env --allow-net hello_world.ts

import { createBot } from "../mod.ts";

const token = Deno.env.get("BOT_TOKEN") as string;

const bot = createBot(token);

for await (const update of bot) {
  if (update.message !== undefined) {
    const { chat, text } = update.message;

    if (text === "/start") {
      try {
        await bot.telegram.sendMessage({
          chat_id: chat.id,
          text: "hello, world",
        });
      } catch (err) {
        console.error(err);
      }
    }
  }
}
