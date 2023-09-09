"use client"
import Link from "next/link"
import User from "./User"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Nav() {
  return (
    <header className=" flex justify-between py-8">
      <Link href={"/"}>Restyled.</Link>
      <div className="flex gap-4">
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Link href={"/login"}>Basket</Link>
      </div>
    </header>
  )
}
