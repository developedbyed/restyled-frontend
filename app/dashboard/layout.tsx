"use client"

import "@/app/globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    {
      label: "Add Product",
      path: "/dashboard/add-product",
    },
    {
      label: "Products",
      path: "/dashboard/products",
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
    },
  ] as const
  const pathname = usePathname()

  return (
    <>
      <nav className="max-w-6xl m-auto bg-background text-foreground px-6  ">
        <h1 className="text-4xl pt-8">Dashboard</h1>
        <Separator className="my-4" />
        <ul className="flex items-center gap-12 font-lg font-bold text-sm text-muted-foreground">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.path)
            return (
              <li key={link.path}>
                <Link
                  className={
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }
                  href={link.path}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <section className="max-w-5xl m-auto py-6">{children}</section>
    </>
  )
}
