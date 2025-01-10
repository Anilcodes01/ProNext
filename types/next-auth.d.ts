
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    username?: string | null;
    email?: string;
    avatarUrl?: string;
    bio?: string;
    city?: string;
    website?: string;
  }

  interface Session {
    user: User;
  }
}
