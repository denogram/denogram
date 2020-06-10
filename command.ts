// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Handler } from "./handler.ts";

/** Command */
export interface Command {
  readonly command: string;
  readonly handler: Handler;
}
