// Source code of the DenoBot (@DenoBot)

import { Bot } from "https://deno.land/x/telegram@v0.0.3/mod.ts";

const token = Deno.env.get("BOT_TOKEN") as string;

async function fetchSourceCode(): Promise<string> {
  const res = await fetch(
    "https://raw.githubusercontent.com/denogram/denogram/master/examples/deno_bot.ts",
  );
  return res.text();
}

async function fetchStars(): Promise<number> {
  const res = await fetch("https://api.github.com/repos/denogram/denogram");
  const data = await res.json();
  return data.stargazers_count;
}

const bot = new Bot(token);

// Error handler
bot.use(async (ctx, next) => {
  try {
    await next(ctx);
  } catch (err) {
    console.error(err.message);
  }
});

bot.on("text", async (ctx) => {
  const text = ctx.message?.text;

  if (text === "/start") {
    await ctx.reply("hello, world");
  }

  if (text === "/stars" || text === "/stars@DenoBot") {
    const stars = await fetchStars();
    await ctx.reply(`Stars: ${stars}`);
  }

  if (text === "/src" || text === "/src@DenoBot") {
    const src = await fetchSourceCode();
    await ctx.replyWithMarkdownV2(`\`\`\`${src}\`\`\``);
  }
});

bot.launch();
