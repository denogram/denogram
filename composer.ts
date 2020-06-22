// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Context } from "./context.ts";
import { UpdateType, MessageSubType } from "./types.ts";

/** Middleware next function */
export interface NextFunction<TContext extends Context> {
  (ctx?: TContext): Promise<void>;
}

/** Middleware */
export interface Middleware<TContext extends Context> {
  (ctx: TContext, next: NextFunction<TContext>): void | Promise<void>;
}

/** Composer */
export class Composer<TContext extends Context> {
  protected middleware: Middleware<TContext>;

  constructor(...middleware: ReadonlyArray<Middleware<TContext>>) {
    this.middleware = Composer.compose(middleware);
  }

  /** Register middleware */
  public use(...middleware: ReadonlyArray<Middleware<TContext>>): void {
    this.middleware = Composer.compose<TContext>(
      [this.middleware, ...middleware],
    );
  }

  /** Register middleware for update types */
  public on(
    updateTypes: UpdateType[] | MessageSubType[] | UpdateType | MessageSubType,
    middleware: Middleware<TContext>,
  ): void {
    const types = this.normalizeTextArguments(updateTypes);
    return this.use(Composer.mount(types, middleware));
  }

  protected static mount<TContext extends Context>(
    updateTypes: UpdateType[] | MessageSubType[],
    middleware: Middleware<TContext>,
  ) {
    return (ctx: TContext, next: NextFunction<TContext>) => {
      (updateTypes as UpdateType[]).includes(ctx.updateType) ||
        updateTypes.some(
            (type: UpdateType | MessageSubType) =>
              ctx.updateSubTypes.includes(type as MessageSubType),
          ) && middleware(ctx, next) ||
        Composer.passThru();
    };
  }

  protected normalizeTextArguments(
    argument: UpdateType[] | MessageSubType[] | UpdateType | MessageSubType,
  ): any {
    if (typeof argument === "string") {
      return [argument];
    } else {
      return argument;
    }
  }

  protected static passThru<TContext extends Context>(): Middleware<TContext> {
    return (ctx: TContext, next: NextFunction<TContext>) => next(ctx);
  }

  /** Compose middleware */
  protected static compose<TContext extends Context>(
    middleware: ReadonlyArray<Middleware<TContext>>,
  ): Middleware<TContext> {
    if (middleware.length === 0) {
      return Composer.passThru();
    }
    if (middleware.length === 1) {
      return middleware[0];
    }
    return (ctx: TContext, next: NextFunction<TContext>) => {
      let index = -1;
      return call(0, ctx);
      async function call(i: number, context: TContext) {
        if (i <= index) {
          throw new Error("NextFunction called multiple times");
        }
        index = i;
        const handler = middleware[i] ?? next;
        await handler(
          context,
          async (ctx: TContext = context) => call(i + 1, ctx),
        );
      }
    };
  }
}
