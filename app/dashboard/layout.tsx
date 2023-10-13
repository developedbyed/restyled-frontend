import "@/app/globals.css"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A Next 13 App with Ecommerce",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="max-w-6xl m-auto bg-background text-foreground px-6 py-12 ">
        <ul className="flex items-center gap-12 font-lg">
          <li>
            <Link href={"/add-product"}>Create</Link>
          </li>
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <Link href={"/orders"}>Orders</Link>
          </li>
        </ul>
        <h1 className="text-4xl pt-8">Dashboard</h1>
      </nav>
      {children}
    </>
  )
}
