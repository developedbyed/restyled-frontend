"use client"
import Link from "next/link"
import User from "./User"
import { ShoppingBag } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import { Button } from "../ui/button"

export default function Nav() {
  return (
    <header className="bg-background text-foreground p-6">
      <nav className="max-w-6xl py-6 m-auto">
        <ul className="flex justify-between items-center">
          <li>
            <Link className="font-bold" href={"/"}>
              Restyled.
            </Link>
          </li>
          <div className="flex items-center gap-8">
            <li>
              <ModeToggle />
            </li>
            <li>
              <Button size={"icon"} variant="outline">
                <ShoppingBag
                  strokeWidth={"1.5px"}
                  className="text-foreground text-lg "
                />
              </Button>
            </li>
            <li>
              <User />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  )
}
