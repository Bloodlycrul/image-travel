// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends DefaultUser {
    password: string;
    name: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
    };
  }

  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
    image?: string | null;
  }
}
