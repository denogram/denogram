// Copyright 2020 the denogram authors. All rights reserved. MIT license.
/**
 * Point on the map.
 * Ref: https://core.telegram.org/bots/api#location
 */
export interface Location {
  /** Longitude as defined by sender */
  longitude: number;
  /** Latitude as defined by sender */
  latitude: number;
}
