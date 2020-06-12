// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/** Ref: https://core.telegram.org/bots/api#replykeyboardremove */
export interface ReplyKeyboardRemove {
  remove_keyboard: true;
  selective?: boolean;
}
