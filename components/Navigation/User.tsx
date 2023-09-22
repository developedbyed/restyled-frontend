"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaUserAlt } from "react-icons/fa";

export default function User() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <FaUserAlt />
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
