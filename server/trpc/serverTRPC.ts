import { loggerLink } from "@trpc/client";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { experimental_nextCacheLink } from "@trpc/next/app-dir/links/nextCache";
import SuperJSON from "superjson";
import { appRouter } from "./appRouter";
import { auth } from "@clerk/nextjs";
import { db } from "../db";
import { cookies } from "next/headers";

export const serverTRPC = experimental_createTRPCNextAppDirServer<
  typeof appRouter
>({
  config() {
    return {
      transformer: SuperJSON,
      links: [
        loggerLink({
          enabled: (op) => true,
        }),
        experimental_nextCacheLink({
          revalidate: 5,
          router: appRouter,
          async createContext() {
            return {
              db: db,
              session: auth(),
              headers: {
                cookie: cookies().toString(),
                "x-trpc-source": "rsc-invoke",
              },
            };
          },
        }),
      ],
    };
  },
});
