// Copyright 2020 the denogram authors. All rights reserved. MIT license.

import { State, Context } from "./context.ts";
import { UpdateType, MessageSubType } from "./types.ts";

/** Middleware next function */
export interface NextFunction<T extends Context<State>> {
  (ctx?: T): Promise<void>;
}

/** Middleware */
export interface Middleware<T extends Context<State>> {
  (ctx: T, next: NextFunction<T>): Promise<void> | void;
}

/** Composer */
export class Composer<T extends Context<State>> {
  middleware: Middleware<T>;

  constructor(...middleware: ReadonlyArray<Middleware<T>>) {
    this.middleware = Composer.compose(middleware);
  }

  /** Register middleware */
  use(...middleware: ReadonlyArray<Middleware<T>>): void {
    this.middleware = Composer.compose<T>(
      [this.middleware, ...middleware],
    );
  }

  /** Register middleware for update types */
  on(
    updateType:
      | UpdateType
      | UpdateType[]
      | MessageSubType
      | MessageSubType[],
    middleware: Middleware<T>,
  ): void {
    return this.use(Composer.mount(updateType, middleware));
  }

  static mount<T extends Context<State>>(
    updateType:
      | UpdateType
      | UpdateType[]
      | MessageSubType
      | MessageSubType[],
    middleware: Middleware<T>,
  ): Middleware<T> {
    return (ctx: T, next: NextFunction<T>) => {
      if (typeof updateType === "string") {
        (ctx.updateType === updateType ||
          ctx.updateSubTypes.includes(updateType as MessageSubType)) &&
          middleware(ctx, next);
        return;
      }

      ((updateType as UpdateType[]).includes(ctx.updateType) ||
        updateType.some(
          (type: UpdateType | MessageSubType) =>
            ctx.updateSubTypes.includes(type as MessageSubType),
        )) && middleware(ctx, next);
    };
  }

  static passThru<T extends Context<State>>(): Middleware<T> {
    return (ctx: T, next?: NextFunction<T>) => next && next(ctx);
  }

  /** Compose middleware */
  static compose<T extends Context<State>>(
    middleware: ReadonlyArray<Middleware<T>>,
  ): Middleware<T> {
    if (middleware.length === 0) {
      return Composer.passThru();
    }

    if (middleware.length === 1) {
      return middleware[0];
    }

    return (ctx: T, next?: NextFunction<T>) => {
      let index = -1;

      async function dispatch(i: number) {
        if (i <= index) {
          throw new Error("NextFunction called multiple times");
        }

        index = i;

        const handler = middleware[i] ?? next;
        await handler(ctx, dispatch.bind(null, i + 1));
      }

      return dispatch(0);
    };
  }
}
