// Copyright 2020 the denogram authors. All rights reserved. MIT license.
import { Context } from "./context.ts";

export interface NextFunction<TContext extends Context> {
  (ctx?: TContext): Promise<void>;
}

export interface Middleware<TContext extends Context> {
  (ctx: TContext, next: NextFunction<TContext>): void | Promise<unknown>;
}

/** Composer */
export class Composer<TContext extends Context> {
  protected middleware: Middleware<TContext>;

  constructor(...middleware: ReadonlyArray<Middleware<TContext>>) {
    this.middleware = Composer.compose(middleware);
  }

  /** Register middleware */
  public use(middleware: Middleware<TContext>): void {
    this.middleware = Composer.compose<TContext>([this.middleware, middleware]);
  }

  protected static passThru<TContext extends Context>(): Middleware<TContext> {
    return (ctx: TContext, next: NextFunction<TContext>) => next(ctx);
  }

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
      return execute(0, ctx);
      function execute(i: number, context: TContext) {
        if (i <= index) {
          throw new Error("NextFunction called multiple times");
        }
        index = i;
        const handler = middleware[i] ? middleware[i] : next;
        handler(context, async (ctx = context) => execute(i + 1, ctx));
      }
    };
  }
}
