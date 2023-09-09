import { initTRPC, TRPCError } from "@trpc/server"
import { type Context } from "./context"
import superjson from "superjson"

const t = initTRPC.context<Context>().create()

// check if the user is signed in, otherwise throw a UNAUTHORIZED CODE
const isAuthed = t.middleware((opts) => {
  const { ctx, next } = opts
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Sign in buddy ✨" })
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const router = t.router
