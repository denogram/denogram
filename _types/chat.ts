// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { ChatPhoto } from "./chat_photo.ts";
import { Message } from "./message.ts";
import { ChatPermissions } from "./chat_permissions.ts";

/**
 * Chat.
 * Ref: https://core.telegram.org/bots/api#chat
 */
export interface Chat {
  /**
   * Unique identifier for this chat.
   * This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it.
   * But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
   */
  id: number;
  /** Type of chat, can be either “private”, “group”, “supergroup” or “channel” */
  type: "private" | "group" | "supergroup" | "channel";
  /** Title, for supergroups, channels and group chats */
  title?: string;
  /** Username, for private chats, supergroups and channels if available */
  username?: string;
  /** First name of the other party in a private chat */
  first_name?: string;
  /** Last name of the other party in a private chat */
  last_name?: string;
  /**
   * Chat photo.
   * Returned only in getChat.
   */
  photo?: ChatPhoto;
  /**
   * Description, for groups, supergroups and channel chats.
   * Returned only in getChat.
   */
  description?: string;
  /**
   * Chat invite link, for groups, supergroups and channel chats.
   * Each administrator in a chat generates their own invite links, so the bot must first generate the link using exportChatInviteLink.
   * Returned only in getChat.
   */
  invite_link?: string;
  /**
   * Pinned message, for groups, supergroups and channels.
   * Returned only in getChat.
   */
  pinned_message?: Message;
  /**
   * Default chat member permissions, for groups and supergroups.
   * Returned only in getChat.
   */
  permissions?: ChatPermissions;
  /**
   * For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user.
   * Returned only in getChat.
   */
  slow_mode_delay?: number;
  /**
   * For supergroups, name of group sticker set.
   * Returned only in getChat.
   */
  sticker_set_name?: string;
  /**
   * True, if the bot can change the group sticker set.
   * Returned only in getChat.
   */
  can_set_sticker_set?: boolean;
}
