// BOT_TOKEN=<bot_token> deno run --allow-env --allow-net hello_world.ts

import * as telegram from "../mod.ts";

const bot = new telegram.Bot(Deno.env.get("BOT_TOKEN") as string);

bot.on("text", (ctx) => {
  if (ctx.message?.text === "/start") {
    ctx.reply("hello, world");
  }
});

bot.launch();
