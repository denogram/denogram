import { Bot, Context } from "../../mod.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);

bot.start((ctx: Context) => {
  ctx.reply("hello, world");
});

bot.launch();
