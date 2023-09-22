import { z } from "zod";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  test: publicProcedure.query(async (opts) => {
    return `hello from test ${opts.ctx.session.userId}`;
  }),
  woo: publicProcedure.query(async (opts) => {
    return "woooooo";
  }),
});

export type AppRouter = typeof appRouter;
