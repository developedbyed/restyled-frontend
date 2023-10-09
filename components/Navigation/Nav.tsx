"use client";
import Link from "next/link";
import User from "./User";
import { FaShoppingCart } from "react-icons/fa";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";

export default function Nav() {
  return (
    <header className="bg-background text-foreground p-6">
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
                <FaShoppingCart className="text-foreground text-lg" />
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
