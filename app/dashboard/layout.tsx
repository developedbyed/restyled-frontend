import "@/app/globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A Next 13 App with Ecommerce",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <ul className="flex justify-between items-center">
          <li>
            <Link href={"/"}>Create</Link>
          </li>
          <li>
            <Link href={"/"}>Products</Link>
          </li>
          <li>
            <Link href={"/"}>Orders</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
