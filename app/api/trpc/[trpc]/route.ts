import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/server/appRouter"
import { createTRPCContext } from "@/server/context"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    onError(opts) {
      const { error, type, path, input, ctx, req } = opts
      if (error.code === "UNAUTHORIZED") {
        console.log(error.message)
      }
    },
    createContext: () => createTRPCContext({ req }),
  })

export { handler as GET, handler as POST }
