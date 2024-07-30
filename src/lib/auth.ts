import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your name" },
        username: { label: "username", type: "text", placeholder: "Email" },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ): Promise<any> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: credentials.username },
          });

          if (!existingUser) {
            console.log("No user found");
            return null;
          }

          if (existingUser.password === credentials.password) {
            return {
              id: existingUser.id,
              email: existingUser.email,
              name: existingUser.name,
            };
          }

          console.log("Invalid password");
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/photoslibrary https://www.googleapis.com/auth/photoslibrary.sharing https://www.googleapis.com/auth/photoslibrary.readonly",
        },
      },
    }),
  ],
  pages: {
    signIn: "/pages/auth/signin",
    signOut: "/auth/signout",
    error: "/pages/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      if (!email) return false;

      try {
        let dbExistingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (!dbExistingUser) {
          dbExistingUser = await prisma.user.create({
            data: {
              email,
              name: user?.name || "",
              //   @ts-ignore
              password: user?.password || "google",
              image: user?.image || null,
            },
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      console.log(account);
      if (account?.access_token) {
        token.accessToken = account.accessToken;
        console.log(token.accessToken);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
};
