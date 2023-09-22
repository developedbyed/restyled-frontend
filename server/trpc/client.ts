// "use client";

// import { loggerLink } from "@trpc/client";
// import { experimental_createTRPCNextAppDirClient } from "@trpc/next/app-dir/client";
// import { experimental_nextHttpLink } from "@trpc/next/app-dir/links/nextHttp";
// import type { AppRouter } from "./appRouter";
// import superjson from "superjson";

// export const api = experimental_createTRPCNextAppDirClient<AppRouter>({
//   config() {
//     return {
//       transformer: superjson,
//       links: [
//         loggerLink({
//           enabled: (op) => true,
//         }),
//         experimental_nextHttpLink({
//           batch: true,
//           url: "/api/trpc",
//           headers() {
//             return {
//               "x-trpc-source": "client",
//             };
//           },
//         }),
//       ],
//     };
//   },
// });
