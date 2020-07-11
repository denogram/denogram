// Copyright 2020 the denogram authors. All rights reserved. MIT license.

export { Logger } from "./logger.ts";

const decoder = new TextDecoder();
export const decode = decoder.decode;

const encoder = new TextEncoder();
export const encode = encoder.encode;
