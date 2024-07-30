import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { env } from "process";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
