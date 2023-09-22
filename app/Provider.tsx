"use client";
import { getUrl } from "@/lib/baseUrl";
import { AppRouter } from "@/server/trpc/appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createTRPCReact,
  unstable_httpBatchStreamLink,
} from "@trpc/react-query";
import { useState } from "react";
import SuperJSON from "superjson";

export const trpc = createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: {
  children: React.ReactNode;
  headers: Headers;
}) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        unstable_httpBatchStreamLink({
          url: getUrl(),
          headers() {
            const headers = new Map(props.headers);
            return Object.fromEntries(headers);
          },
        }),
      ],
    })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpc.Provider>
    </QueryClientProvider>
  );
}
