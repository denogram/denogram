// DenoBot (@DenoBot)
import { Bot } from "../bot.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);

bot.use(async (ctx, next) => {
  try {
    await next(ctx);
  } catch (error) {
    console.log(error.message);
  }
});

bot.use(async (ctx) => {
  if (ctx.message?.text === "/start") {
    await ctx.reply("hello, world");
  }

  if (
    ctx.message?.text === "/stars" || ctx.message?.text === "/stars@DenoBot"
  ) {
    const res = await fetch("https://api.github.com/repos/denogram/denogram");
    const data = await res.json();
    await ctx.reply(`Stars: ${data.stargazers_count}`);
  }
});

bot.launch();
