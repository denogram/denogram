// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { serve, Server } from "./deps.ts";
import { Update } from "./types.ts";
import { decoder } from "./_util/mod.ts";

export interface WebhookServerOptions {
  path: string;
  handler: (update: Update) => Promise<void> | void;
}

export class WebhookServer {
  #server?: Server;
  readonly #options: WebhookServerOptions;

  constructor(options: WebhookServerOptions) {
    this.#options = options;
  }

  async listen(port: number, hostname?: string): Promise<void> {
    this.#server = serve({ port, hostname });
    for await (const req of this.#server) {
      if (req.method !== "POST" && req.url !== this.#options.path) {
        continue;
      }

      // Read request body
      const buf: Uint8Array = await Deno.readAll(req.body);

      // Decode and parse request body
      const update = JSON.parse(decoder.decode(buf));

      // Handle update
      this.#options.handler(update);
    }
  }

  close(): void {
    if (this.#server !== undefined) {
      this.#server.close();
    }
  }
}
