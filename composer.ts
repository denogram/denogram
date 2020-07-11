// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { State, Context } from "./context.ts";
import { UpdateType, MessageSubType } from "./types.ts";

export interface NextFunction<T extends Context<State>> {
  (ctx?: T): Promise<void>;
}

export interface Middleware<T extends Context<State>> {
  (ctx: T, next: NextFunction<T>): Promise<void> | void;
}

export class Composer<T extends Context<State>> {
  middleware: Middleware<T>;

  constructor(...middleware: ReadonlyArray<Middleware<T>>) {
    this.middleware = Composer.compose<T>(middleware);
  }

  use(...middleware: ReadonlyArray<Middleware<T>>): void {
    this.middleware = Composer.compose<T>([this.middleware, ...middleware]);
  }

  on(
    updateType: UpdateType | UpdateType[] | MessageSubType | MessageSubType[],
    middleware: Middleware<T>,
  ): void {
    return this.use(Composer.mount<T>(updateType, middleware));
  }

  static mount<T extends Context<State>>(
    updateType: UpdateType | UpdateType[] | MessageSubType | MessageSubType[],
    middleware: Middleware<T>,
  ): Middleware<T> {
    return (ctx: T, next: NextFunction<T>) => {
      const updateTypes = typeof updateType === "string"
        ? [updateType]
        : updateType;
      ((updateTypes as UpdateType[]).includes(ctx.updateType) ||
        updateTypes.some((type: UpdateType | MessageSubType) =>
          ctx.updateSubTypes.includes(type as MessageSubType)
        )) &&
        middleware(ctx, next);
    };
  }

  static passThru<T extends Context<State>>(): Middleware<T> {
    return (ctx: T, next: NextFunction<T>) => next(ctx);
  }

  static compose<T extends Context<State>>(
    middleware: ReadonlyArray<Middleware<T>>,
  ): Middleware<T> {
    if (middleware.length === 0) {
      return Composer.passThru<T>();
    }

    if (middleware.length === 1) {
      return middleware[0];
    }

    return (ctx: T, next: NextFunction<T>) => {
      let index = -1;

      async function dispatch(i: number) {
        if (i <= index) {
          throw new Error("NextFunction called multiple times");
        }

        index = i;

        await (middleware[i] ?? next)(ctx, dispatch.bind(null, i + 1));
      }

      return dispatch(0);
    };
  }
}
