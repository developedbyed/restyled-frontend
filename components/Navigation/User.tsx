"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserCircle } from "lucide-react";

export default function User() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <UserCircle />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
