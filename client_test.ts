import { Client } from "./client.ts";
import { User } from "./_types/mod.ts";
import { test, assertThrowsAsync } from "./test_deps.ts";

test("getMe without token throws error", () => {
  const client = new Client("");
  assertThrowsAsync(() => client.method<User>("getMe"));
});
