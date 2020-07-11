// PORT=80 BOT_TOKEN=<bot_token> deno run --allow-env --allow-net webhook.ts

import * as telegram from "../mod.ts";

const port = parseInt(Deno.env.get("PORT") as string) || 80;
const token = Deno.env.get("BOT_TOKEN") as string;

const bot = new telegram.Bot(token);

bot.on("text", (ctx) => {
  if (ctx.message?.text === "/start") {
    ctx.reply("hello, world");
  }
});

bot.launch({
  // url: https://denogram.dev/<bot_token>
  webhook: {
    domain: "denogram.dev",
    path: `/${token}`,
    port,
  },
});
