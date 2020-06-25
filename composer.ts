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
    updateType:
      | UpdateType
      | UpdateType[]
      | MessageSubType
      | MessageSubType[],
    middleware: Middleware<TContext>,
  ): void {
    return this.use(Composer.mount(updateType, middleware));
  }

  protected static mount<TContext extends Context>(
    updateType:
      | UpdateType
      | UpdateType[]
      | MessageSubType
      | MessageSubType[],
    middleware: Middleware<TContext>,
  ): Middleware<TContext> {
    return (ctx: TContext, next: NextFunction<TContext>) => {
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
