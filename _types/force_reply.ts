// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/** Ref: https://core.telegram.org/bots/api#forcereply */
export interface ForceReply {
  force_reply: true;
  selective?: boolean;
}
