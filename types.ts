// Copyright 2020 the denogram authors. All rights reserved. MIT license.

export type UpdateType =
  | "message"
  | "edited_message"
  | "channel_post"
  | "edited_channel_post"
  | "inline_query"
  | "chosen_inline_result"
  | "callback_query"
  | "shipping_query"
  | "pre_checkout_query"
  | "poll"
  | "poll_answer";

/** ref: https://core.telegram.org/bots/api#update */
export interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  callback_query?: CallbackQuery;
  shipping_query?: ShippingQuery;
  pre_checkout_query?: PreCheckoutQuery;
  poll?: Poll;
  poll_answer?: PollAnswer;
}

/** ref: https://core.telegram.org/bots/api#webhookinfo */
export interface WebhookInfo {
  url: string;
  has_custom_certificate: boolean;
  pending_update_count: number;
  last_error_date?: number;
  last_error_message?: string;
  max_connections?: number;
  allowed_updates?: string[];
}

/** ref: https://core.telegram.org/bots/api#user */
export interface User {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  can_join_groups?: boolean;
  can_read_all_group_messages?: boolean;
  supports_inline_queries?: boolean;
}

export type ChatType = "private" | "group" | "supergroup" | "channel";

/** ref: https://core.telegram.org/bots/api#chat */
export interface Chat {
  id: number;
  type: ChatType;
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

export type MessageSubType =
  | "text"
  | "animation"
  | "audio"
  | "document"
  | "photo"
  | "sticker"
  | "video"
  | "video_note"
  | "voice"
  | "contact"
  | "dice"
  | "game"
  | "poll"
  | "venue"
  | "location"
  | "new_chat_members"
  | "left_chat_member"
  | "new_chat_title"
  | "new_chat_photo"
  | "delete_chat_photo"
  | "group_chat_created"
  | "supergroup_chat_created"
  | "channel_chat_created"
  | "migrate_to_chat_id"
  | "migrate_from_chat_id"
  | "pinned_message"
  | "invoice"
  | "successful_payment"
  | "connected_website"
  | "passport_data"
  | "forward_date";

/** ref: https://core.telegram.org/bots/api#message */
export interface Message {
  message_id: number;
  from?: User;
  date: number;
  chat: Chat;
  forward_from?: User;
  forward_from_chat?: Chat;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  reply_to_message?: Message;
  via_bot?: User;
  edit_date?: number;
  media_group_id?: number;
  author_signature?: string;
  text?: string;
  entities?: MessageEntity[];
  animation?: Animation;
  audio?: Audio;
  document?: Document;
  photo?: PhotoSize[];
  sticker?: Sticker;
  video?: Video;
  video_note?: VideoNote;
  voice?: Voice;
  caption?: String;
  caption_entities?: MessageEntity[];
  contact?: Contact;
  dice?: Dice;
  game?: Game;
  poll?: Poll;
  venue?: Venue;
  location?: Location;
  new_chat_members?: User[];
  left_chat_member?: User;
  new_chat_title?: String;
  new_chat_photo?: PhotoSize[];
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;
  channel_chat_created?: true;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: Message;
  invoice?: Invoice;
  successful_payment?: SuccessfulPayment;
  connected_website?: string;
  passport_data?: PassportData;
  reply_markup?: InlineKeyboardMarkup;
}

export type MessageEntityType =
  | "mention"
  | "hashtag"
  | "cashtag"
  | "bot_command"
  | "url"
  | "email"
  | "phone_number"
  | "bold"
  | "italic"
  | "underline"
  | "strikethrough"
  | "code"
  | "pre"
  | "text_link"
  | "text_mention";

/** ref: https://core.telegram.org/bots/api#messageentity */
export interface MessageEntity {
  type: MessageEntityType;
  offset: number;
  length: number;
  url?: string;
  user?: User;
  language?: string;
}

/** ref: https://core.telegram.org/bots/api#photosize */
export interface PhotoSize {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  file_size?: number;
}

/** ref: https://core.telegram.org/bots/api#animation */
export interface Animation {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb: PhotoSize;
  file_name: string;
  mime_type: string;
  file_size: number;
}

/** ref: https://core.telegram.org/bots/api#audio */
export interface Audio {
  file_id: string;
  file_unique_id: string;
  duration: number;
  performer?: string;
  title?: string;
  mime_type?: string;
  file_size?: number;
  thumb?: PhotoSize;
}

/** ref: https://core.telegram.org/bots/api#document */
export interface Document {
  file_id: string;
  file_unique_id: string;
  thumb?: PhotoSize;
  file_name?: string;
  mime_type?: string;
  file_size?: number;
}

/** ref: https://core.telegram.org/bots/api#video */
export interface Video {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  duration: number;
  thumb?: PhotoSize;
  mime_type?: string;
  file_size?: number;
}

/** ref: https://core.telegram.org/bots/api#videonote */
export interface VideoNote {
  file_id: string;
  file_unique_id: string;
  length: number;
  duration: number;
  thumb?: PhotoSize;
  file_size?: number;
}

/** ref: https://core.telegram.org/bots/api#voice */
export interface Voice {
  file_id: string;
  file_unique_id: string;
  duration: number;
  mime_type?: string;
  file_size?: number;
}

/** ref: https://core.telegram.org/bots/api#contact */
export interface Contact {
  phone_number: number;
  first_name: string;
  last_name?: string;
  user_id?: number;
  vcard?: string;
}

/** ref: https://core.telegram.org/bots/api#dice */
export interface Dice {
  emoji: string;
  value: number;
}

/** ref: https://core.telegram.org/bots/api#polloption */
export interface PollOption {
  text: string;
  voter_count: number;
}

/** ref: https://core.telegram.org/bots/api#pollanswer */
export interface PollAnswer {
  poll_id: string;
  user: User;
  option_ids: number[];
}

export type PollType = "regular" | "quiz";

/** ref: https://core.telegram.org/bots/api#poll */
export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  total_voter_count: number;
  is_closed: boolean;
  is_anonymous: boolean;
  type: PollType;
  allows_multiple_answers: boolean;
  correct_option_id?: number;
  explanation?: string;
  explanation_entities?: MessageEntity[];
  open_period?: number;
  close_date?: number;
}

/** ref: https://core.telegram.org/bots/api#location */
export interface Location {
  longitude: number;
  latitude: number;
}

/** ref: https://core.telegram.org/bots/api#venue */
export interface Venue {
  location: Location;
  title: string;
  address: string;
  foursquare_id?: string;
  foursquare_type: string;
}

/** ref: https://core.telegram.org/bots/api#userprofilephoto */
export interface UserProfilePhotos {
  total_count: number;
  photos: PhotoSize[];
}

/** ref: https://core.telegram.org/bots/api#file */
export interface File {
  file_id: string;
  file_unique_id: string;
  file_size?: number;
  file_path?: string;
}

export type ReplyMarkup =
  | InlineKeyboardMarkup
  | ReplyKeyboardMarkup
  | ReplyKeyboardRemove
  | ForceReply;

/** ref: https://core.telegram.org/bots/api#replykeyboardmarkup */
export interface ReplyKeyboardMarkup {
  keyboard: KeyboardButton[][];
  resize_keyboard?: boolean;
  one_time_keyboard?: boolean;
  selective?: boolean;
}

/** ref: https://core.telegram.org/bots/api#keyboardbutton */
export interface KeyboardButton {
  text: string;
  request_contact?: boolean;
  request_location?: boolean;
  request_poll?: KeyboardButtonPollType;
}

/** ref: https://core.telegram.org/bots/api#keyboardbuttonpolltype */
export interface KeyboardButtonPollType {
  type?: PollType;
}

/** ref: https://core.telegram.org/bots/api#replykeyboardremove */
export interface ReplyKeyboardRemove {
  remove_keyboard: true;
  selective?: boolean;
}

/** ref: https://core.telegram.org/bots/api#inlinekeyboardmarkup */
export interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

/** ref: https://core.telegram.org/bots/api#inlinekeyboardbutton */
export interface InlineKeyboardButton {
  text: string;
  url?: string;
  login_url?: LoginUrl;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  callback_game?: CallbackGame;
  pay?: boolean;
}

/** ref: https://core.telegram.org/bots/api#loginurl */
export interface LoginUrl {
  url: string;
  forward_text?: string;
  bot_username?: string;
  request_write_access?: boolean;
}

/** ref: https://core.telegram.org/bots/api#callbackquery */
export interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
}

/** ref: https://core.telegram.org/bots/api#forcereply */
export interface ForceReply {
  force_reply: true;
  selective?: boolean;
}

/** ref: https://core.telegram.org/bots/api#chatphoto */
export interface ChatPhoto {
  small_file_id: string;
  small_file_unique_id: string;
  big_file_id: string;
  big_file_unique_id: string;
}

/** ref: https://core.telegram.org/bots/api#chatpermissions */
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

/** ref: https://core.telegram.org/bots/api#botcommand */
export interface BotCommand {
  command: string;
  description: string;
}

/** ref: https://core.telegram.org/bots/api#responseparameters */
export interface ResponseParameters {
  migrate_to_chat_id?: number;
  retry_after?: number;
}

/** ref: https://core.telegram.org/bots/api#inputmedia */
export type InputMedia =
  | InputMediaPhoto
  | InputMediaVideo
  | InputMediaAnimation
  | InputMediaAudio
  | InputMediaDocument;

/** ref: https://core.telegram.org/bots/api#inputmediaphoto */
export interface InputMediaPhoto {
  type: "photo";
  media: string;
  caption?: string;
  parse_mode?: ParseMode;
}

/** ref: https://core.telegram.org/bots/api#inputmediavideo */
export interface InputMediaVideo {
  type: "video";
  media: string;
  thumb?: InputFile | string;
  caption?: string;
  parse_mode?: ParseMode;
  width?: number;
  height?: number;
  duration?: number;
  supports_streaming?: boolean;
}

/** ref: https://core.telegram.org/bots/api#inputmediaanimation */
export interface InputMediaAnimation {
  type: "animation";
  media: string;
  thumb?: InputFile | string;
  caption?: string;
  parse_mode?: ParseMode;
  width?: number;
  height?: number;
  duration?: number;
}

/** ref: https://core.telegram.org/bots/api#inputmediaaudio */
export interface InputMediaAudio {
  type: "audio";
  media: string;
  thumb?: InputFile | string;
  caption?: string;
  parse_mode?: ParseMode;
  duration?: number;
  performer?: string;
  title?: string;
}

/** ref: https://core.telegram.org/bots/api#inputmediadocument */
export interface InputMediaDocument {
  type: "document";
  media: string;
  thumb?: InputFile | string;
  caption?: string;
  parse_mode?: ParseMode;
}

/** ref: https://core.telegram.org/bots/api#inputfile */
export type InputFile = unknown;

/** ref: https://core.telegram.org/bots/api#sticker */
export interface Sticker {
  file_id: string;
  file_unique_id: string;
  width: number;
  height: number;
  is_animated: boolean;
  thumb?: PhotoSize;
  emoji?: string;
  set_name?: string;
  mask_position?: MaskPosition;
  file_size?: number;
}

/** ref: https://core.telegram.org/bots/api#maskposition */
export interface MaskPosition {
  point: string;
  x_shift: number;
  y_shift: number;
  scale: number;
}

/** ref: https://core.telegram.org/bots/api#inlinequery */
export interface InlineQuery {
  id: string;
  from: User;
  location?: Location;
  query: string;
  offset: string;
}

/** ref: https://core.telegram.org/bots/api#choseninlineresult */
export interface ChosenInlineResult {
  result_id: string;
  from: User;
  location?: Location;
  inline_message_id?: string;
  query: string;
}

/** ref: https://core.telegram.org/bots/api#invoice */
export interface Invoice {
  title: string;
  description: string;
  start_parameter: string;
  currency: string;
  total_amount: number;
}

/** ref: https://core.telegram.org/bots/api#orderinfo */
export interface OrderInfo {
  name?: string;
  phone_number?: string;
  email?: string;
  shipping_address?: ShippingAddress;
}

/** ref: https://core.telegram.org/bots/api#shippingaddress */
export interface ShippingAddress {
  country_code: string;
  state: string;
  city: string;
  street_line1: string;
  street_line2: string;
  post_code: string;
}

/** ref: https://core.telegram.org/bots/api#successfulpayment */
export interface SuccessfulPayment {
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id?: string;
  order_info?: OrderInfo;
  telegram_payment_charge_id: string;
  provider_payment_charge_id: string;
}

/** ref: https://core.telegram.org/bots/api#shippingquery */
export interface ShippingQuery {
  id: string;
  from: User;
  invoice_payload: string;
  shipping_address: ShippingAddress;
}

/** ref: https://core.telegram.org/bots/api#precheckoutquery */
export interface PreCheckoutQuery {
  id: string;
  from: User;
  currency: string;
  total_amount: number;
  invoice_payload: string;
  shipping_option_id: string;
  order_info: OrderInfo;
}

/** ref: https://core.telegram.org/bots/api#passportdata */
export type PassportData = unknown;

/** ref: https://core.telegram.org/bots/api#game */
export interface Game {
  title: string;
  description: string;
  photo: PhotoSize[];
  text?: string;
  text_entities?: MessageEntity[];
  animation?: Animation;
}

/** ref: https://core.telegram.org/bots/api#callbackgame */
export type CallbackGame = unknown;

/** ref: https://core.telegram.org/bots/api#gamehighscore */
export interface GameHighScore {
  position: number;
  user: User;
  score: number;
}

/** ref: https://core.telegram.org/bots/api#getupdates */
export interface GetUpdatesParameters {
  offset: number;
  limit: number;
  timeout: number;
  allowedUpdates: string[];
}

/** ref: https://core.telegram.org/bots/api#setwebhook */
export interface SetWebhookParameters {
  url: string;
  certificate?: InputFile;
  max_connections?: number;
  allowed_updates?: string[];
}

/** ref: https://core.telegram.org/bots/api#formatting-options */
export type ParseMode = "MarkdownV2" | "HTML" | "Markdown";

/** ref: https://core.telegram.org/bots/api#sendmessage */
export interface SendMessageParameters {
  chat_id: number | string;
  text: string;
  parse_mode?: ParseMode;
  disable_web_page_preview?: boolean;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  reply_markup?: ReplyMarkup;
}

/** ref: https://core.telegram.org/bots/api#forwardmessage */
export interface ForwardMessageParameters {
  chat_id: number | string;
  from_chat_id: number | string;
  disable_notification?: boolean;
  message_id: number;
}

/** ref: https://core.telegram.org/bots/api#sendphoto */
export interface SendPhotoParameters {
  chat_id: number | string;
  photo: InputFile | string;
  caption?: string;
  parse_mode?: ParseMode;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  reply_markup?: ReplyMarkup;
}

/** ref: https://core.telegram.org/bots/api#sendaudio */
export interface SendAudioParameters {
  chat_id: number | string;
  audio: InputFile | string;
  caption?: string;
  parse_mode?: ParseMode;
  duration?: number;
  performer?: string;
  title?: string;
  thumb?: InputFile | string;
  disable_notification?: boolean;
  reply_to_message_id?: number;
  reply_markup?: ReplyMarkup;
}
