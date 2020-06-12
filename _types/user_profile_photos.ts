// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { PhotoSize } from "./photo_size.ts";

/**
 * User's profile pictures.
 * Ref: https://core.telegram.org/bots/api#userprofilephoto
 */
export interface UserProfilePhotos {
  /** Total number of profile pictures the target user has */
  total_count: number;
  /** Requested profile pictures (in up to 4 sizes each) */
  photos: PhotoSize[];
}
