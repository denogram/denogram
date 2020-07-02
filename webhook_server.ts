// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { serve, Server } from "./deps.ts";
import { Update } from "./types.ts";

export interface WebhookServerOptions {
  path: string;
  handler: (update: Update) => Promise<void> | void;
}

export class WebhookServer {
  #server?: Server;

  constructor(readonly options: WebhookServerOptions) {}

  async listen(port: number): Promise<void> {
    this.#server = serve({ port });
    for await (const req of this.#server) {
      if (req.method !== "POST" && req.url !== this.options.path) continue;

      // Read request body
      const buf: Uint8Array = await Deno.readAll(req.body);
      // Decode and parse request body
      const update = JSON.parse(new TextDecoder().decode(buf));

      this.options.handler(update);
    }
  }

  close(): void {
    if (this.#server !== undefined) {
      this.#server.close();
    }
  }
}
