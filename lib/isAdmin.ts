import { auth } from "@clerk/nextjs";

export default function isAdmin(): string | null {
  const user = auth();
  if (user.userId === process.env.CMS_ADMIN) {
    return user.userId;
  } else {
    return null;
  }
}
