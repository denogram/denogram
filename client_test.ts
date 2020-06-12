import { TelegramClient } from "./client.ts";
import { User } from "./_types/mod.ts";
import { assertThrowsAsync } from "./deps.ts";

Deno.test("getMe without token throws error", () => {
  const client = new TelegramClient("");
  assertThrowsAsync(async () => {
    await client.method<User>("getMe");
  });
});
