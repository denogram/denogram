// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { ChatPhoto } from "./chat_photo.ts";
import { Message } from "./message.ts";
import { ChatPermissions } from "./chat_permissions.ts";

/** Chat */
export interface Chat {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  photo?: ChatPhoto;
  description?: string;
  invite_link?: string;
  pinned_message?: Message;
  permissions?: ChatPermissions;
  slow_mode_delay?: number;
  sticker_set_name?: string;
  can_set_sticker_set?: boolean;
}
