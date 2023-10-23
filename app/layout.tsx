import Nav from "@/components/Navigation/Nav"
import "@/app/globals.css"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/ThemeProvider"
import Toaster from "@/components/Toaster"

export const metadata: Metadata = {
  title: "Restyled",
  description: "A Next 13 App with Ecommerce",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className="">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster />
            <Nav />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
