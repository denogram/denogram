// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { test, assertThrowsAsync } from "./test_deps.ts";
import { Client } from "./client.ts";
import { User } from "./types.ts";

test("getMe without token throws error", () => {
  const client = new Client("");
  assertThrowsAsync(() => client.method<User>("getMe"));
});
