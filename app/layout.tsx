import Nav from "@/components/Navigation/Nav";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./_trpc/Provider";
import { ClerkProvider } from "@clerk/nextjs";

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
    <html lang="en">
      <body className={`${inter.className} `}>
        <ClerkProvider>
          <Provider>
            <Nav />
            {children}
          </Provider>
        </ClerkProvider>
      </body>
    </html>
  );
}
