// BOT_TOKEN=<bot_token> deno run --allow-env --allow-net webhook.ts
import * as telegram from "../mod.ts";

const token = Deno.env.get("BOT_TOKEN") as string;

const bot = new telegram.Bot(token);

bot.use((ctx) => {
  if (ctx.message?.text === "/start") {
    ctx.reply("hello, world");
  }
});

bot.launch({
  webhook: {
    url: `https://denogram.ngrok.io/${token}`,
    port: 80,
  },
});
