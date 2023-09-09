import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import { getAuth } from "@clerk/nextjs/server"
import type { SignedInAuthObject, SignedOutAuthObject } from "@clerk/nextjs/api"

interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject
}

export const createContextInner = async ({ auth }: AuthContext) => {
  return {
    auth,
  }
}

export const createTRPCContext = async ({ req }: { req: Request }) => {
  // @ts-ignore
  return await createContextInner({ auth: getAuth(req) })
}

export type Context = trpc.inferAsyncReturnType<typeof createTRPCContext>
