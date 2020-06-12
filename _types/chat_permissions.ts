// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Chat permissions.
 * Ref: https://core.telegram.org/bots/api#chatpermissions
 */
export interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
}
