"use client";

import "@/app/globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
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
  ] as const;
  const pathname = usePathname();

  return (
    <div className="max-w-4xl mx-auto">
      <nav className=" bg-background text-foreground">
        <ul className="flex items-center gap-12 font-lg font-bold text-sm text-muted-foreground">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.path);
            return (
              <li key={link.path}>
                <Link
                  className={
                    isActive ? "text-primary" : "text-muted-foreground"
                  }
                  href={link.path}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Card className="my-4 p-4">{children}</Card>
    </div>
  );
}
