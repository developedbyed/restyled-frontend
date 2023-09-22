import Nav from "@/components/Navigation/Nav";
import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { TRPCReactProvider } from "./Provider";
import { headers } from "next/headers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restyled",
  description: "A Next 13 App with Ecommerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <TRPCReactProvider headers={headers()}>
        <html lang="en">
          <body className={`${inter.className} `}>
            <Nav />
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
