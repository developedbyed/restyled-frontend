import { publicProcedure, protectedProcedure, router } from "./trpc"

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30]
  }),
  getUser: protectedProcedure.query(({ ctx }) => {
    return {
      secret: `${ctx.auth?.userId} is using a protected procedure`,
    }
  }),
})

export type AppRouter = typeof appRouter
