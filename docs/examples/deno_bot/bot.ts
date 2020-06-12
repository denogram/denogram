// DenoBot (@DenoBot)
import { Bot } from "../../../mod.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);

bot.start(((ctx) => ctx.reply("hello, world")));

bot.command("stars", async (ctx) => {
  const res = await fetch("https://api.github.com/repos/denogram/denogram");
  const data = await res.json();
  await ctx.reply(`Stars: ${data.stargazers_count}`);
});

bot.launch();
