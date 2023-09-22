import { appRouter } from "@/server/trpc/appRouter";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "@/server/trpc/context";
import { NextResponse } from "next/server";

const handler = (req: Request) => {
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
  return new NextResponse("RESPONSE FROM ROUTE HANDLER");
};

export { handler as GET, handler as POST };
