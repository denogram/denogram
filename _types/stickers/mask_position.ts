// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Position on faces where a mask should be placed by default.
 * Ref: https://core.telegram.org/bots/api#maskposition
 */
export interface MaskPosition {
  point: string;
  x_shift: number;
  y_shift: number;
  scale: number;
}
