import { users } from "./db/schema"
import { publicProcedure, protectedProcedure, router } from "./trpc"
import { fetchProducts } from "@/lib/fetchProducts"
import { fetchProduct } from "@/lib/fetchProduct"
import { z } from "zod"

export const appRouter = router({
  getProducts: publicProcedure.query(async () => {
    return await fetchProducts()
  }),
  getProduct: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async (opts) => {
      return await fetchProduct(opts.input.id)
    }),
})

export type AppRouter = typeof appRouter
