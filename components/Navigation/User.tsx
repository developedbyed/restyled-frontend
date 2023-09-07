"use client"

import { SignIn } from "@clerk/nextjs"

export default function User() {
  return (
    <div>
      <h1>User</h1>
      <SignIn />
    </div>
  )
}
