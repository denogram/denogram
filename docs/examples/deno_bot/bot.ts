// DenoBot (@DenoBot)
import { Bot } from "../../../mod.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN") as string);

bot.start(((ctx) => ctx.reply("hello, world")));

bot.launch();
