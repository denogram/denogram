// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { PhotoSize } from "../photo_size.ts";
import { MaskPosition } from "./mask_position.ts";

/**
 * Sticker.
 * Ref: https://core.telegram.org/bots/api#sticker
 */
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
