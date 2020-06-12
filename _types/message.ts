// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { User } from "./user.ts";
import { Chat } from "./chat.ts";
import { MessageEntity } from "./message_entity.ts";
import { Animation } from "./animation.ts";
import { Audio } from "./audio.ts";
import { Document } from "./document.ts";
import { PhotoSize } from "./photo_size.ts";
import { Sticker } from "./stickers/sticker.ts";
import { Video } from "./video.ts";
import { VideoNote } from "./video_note.ts";
import { Voice } from "./voice.ts";
import { Contact } from "./contact.ts";
import { Dice } from "./dice.ts";
import { Game } from "./games/game.ts";
import { Poll } from "./poll.ts";
import { Venue } from "./venue.ts";
import { Location } from "./location.ts";
import { Invoice } from "./payments/invoice.ts";
import { SuccessfulPayment } from "./payments/successful_payment.ts";
import { PassportData } from "./telegram_passport/passport_data.ts";
import { InlineKeyboardMarkup } from "./inline_keyboard_markup.ts";

/**
 * Message.
 * Ref: https://core.telegram.org/bots/api#message
 */
export interface Message {
  /** Unique message identifier inside this chat */
  message_id: number;
  /** Sender, empty for messages sent to channels */
  from?: User;
  /** Date the message was sent in Unix time */
  date: number;
  /** Conversation the message belongs to */
  chat: Chat;
  /** For forwarded messages, sender of the original message */
  forward_from?: User;
  /** For messages forwarded from channels, information about the original channel */
  forward_from_chat?: Chat;
  /** For messages forwarded from channels, identifier of the original message in the channel */
  forward_from_message_id?: number;
  /** For messages forwarded from channels, signature of the post author if present */
  forward_signature?: string;
  /** Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
  forward_sender_name?: string;
  /** For forwarded messages, date the original message was sent in Unix time */
  forward_date?: number;
  /**
   * For replies, the original message.
   * Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
   */
  reply_to_message?: Message;
  /** Bot through which the message was sent */
  via_bot?: User;
  /** Date the message was last edited in Unix time */
  edit_date?: number;
  /** The unique identifier of a media message group this message belongs to */
  media_group_id?: number;
  /** Signature of the post author for messages in channels */
  author_signature?: string;
  /** For text messages, the actual UTF-8 text of the message, 0-4096 characters */
  text?: string;
  /** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
  entities?: MessageEntity[];
  /**
   * Message is an animation, information about the animation.
   * For backward compatibility, when this field is set, the document field will also be set
   */
  animation?: Animation;
  /** Message is an audio file, information about the file */
  audio?: Audio;
  /** Message is a general file, information about the file */
  document?: Document;
  /** Message is a photo, available sizes of the photo */
  photo?: PhotoSize[];
  /** Message is a sticker, information about the sticker */
  sticker?: Sticker;
  /** Message is a video, information about the video */
  video?: Video;
  /** Message is a video note, information about the video message */
  video_note?: VideoNote;
  /** Message is a voice message, information about the file */
  voice?: Voice;
  /** Caption for the animation, audio, document, photo, video or voice, 0-1024 characters */
  caption?: String;
  /** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
  caption_entities?: MessageEntity[];
  /** Message is a shared contact, information about the contact */
  contact?: Contact;
  /** Message is a dice with random value from 1 to 6 */
  dice?: Dice;
  /**
   * Message is a game, information about the game.
   * Ref: https://core.telegram.org/bots/api#games
   */
  game?: Game;
  /** Message is a native poll, information about the poll */
  poll?: Poll;
  /**
   * Message is a venue, information about the venue.
   * For backward compatibility, when this field is set, the location field will also be set
   */
  venue?: Venue;
  /** Message is a shared location, information about the location */
  location?: Location;
  /** New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
  new_chat_members?: User[];
  /** A member was removed from the group, information about them (this member may be the bot itself) */
  left_chat_member?: User;
  /** A chat title was changed to this value */
  new_chat_title?: String;
  /** A chat photo was change to this value */
  new_chat_photo?: PhotoSize[];
  /** Service message: the chat photo was deleted */
  delete_chat_photo?: true;
  /** Service message: the group has been created */
  group_chat_created?: true;
  /**
   * Service message: the supergroup has been created.
   * This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created.
   * It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.
   */
  supergroup_chat_created?: true;
  /**
   * Service message: the channel has been created.
   * This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created.
   * It can only be found in reply_to_message if someone replies to a very first message in a channel.
   */
  channel_chat_created?: true;
  /**
   * The group has been migrated to a supergroup with the specified identifier.
   * This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it.
   * But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
   */
  migrate_to_chat_id?: number;
  /**
   * The supergroup has been migrated from a group with the specified identifier.
   * This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it.
   * But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
   */
  migrate_from_chat_id?: number;
  /**
   * Specified message was pinned.
   * Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply.
   */
  pinned_message?: Message;
  /**
   * Message is an invoice for a payment, information about the invoice.
   * Ref: https://core.telegram.org/bots/api#payments
   */
  invoice?: Invoice;
  /**
   * Message is a service message about a successful payment, information about the payment.
   * Ref: https://core.telegram.org/bots/api#payments
   */
  successful_payment?: SuccessfulPayment;
  /**
   * The domain name of the website on which the user has logged in.
   * Ref: https://core.telegram.org/widgets/login
   */
  connected_website?: string;
  /** Telegram Passport data */
  passport_data?: PassportData;
  /**
   * Inline keyboard attached to the message.
   * login_url buttons are represented as ordinary url buttons.
   */
  reply_markup?: InlineKeyboardMarkup;
}
