"use client";
import Link from "next/link";
import User from "./User";
import { ShoppingBag } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <header className="max-w-6xl m-auto bg-background text-foreground p-6">
      <nav>
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
                <ShoppingBag className="text-foreground text-lg" />
              </Button>
            </li>
            <li>
              <User />
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
