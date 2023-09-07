"use client"
import Link from "next/link"
import User from "./User"
import { SignIn } from "@clerk/nextjs"

export default function Nav() {
  return (
    <header>
      <Link href={"/"}>Restyled.</Link>
      {/* <SignIn /> */}
      <Link href={"/login"}>Basket</Link>
    </header>
  )
}
