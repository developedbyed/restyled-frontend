import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server"
import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp"
import { AppRouter } from "@/server/appRouter"
import { getUrl } from "@/lib/baseUrl"

export const serverTRPC = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        experimental_nextHttpLink({
          batch: true,
          url: getUrl(),
        }),
      ],
    }
  },
})
