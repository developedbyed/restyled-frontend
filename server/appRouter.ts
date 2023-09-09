import { publicProcedure, protectedProcedure, router } from "./trpc"
import { fetchProducts } from "@/lib/fetchProducts"

export const appRouter = router({
  getProducts: publicProcedure.query(async () => {
    return await fetchProducts()
  }),
  getTodos: protectedProcedure.query(({ ctx }) => {
    console.log(`router: ${ctx.auth.userId}`)
    return [10, 20, 30]
  }),
})

export type AppRouter = typeof appRouter
