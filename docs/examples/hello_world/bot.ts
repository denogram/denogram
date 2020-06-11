// BOT_TOKEN=<bot_token> deno run --allow-env --allow-net bot.ts
import * as telegram from "https://deno.land/x/telegram/mod.ts";

const bot = new telegram.Bot(Deno.env.get("BOT_TOKEN") as string);

bot.start((ctx) => ctx.reply("hello, world"));

bot.launch();
