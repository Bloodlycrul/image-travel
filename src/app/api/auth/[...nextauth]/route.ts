import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/Database/db";
import { NextAuthOptions } from "next-auth";

const handler: NextAuthOptions = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
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
        console.log(credentials);

        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: credentials?.username,
            },
          });

          if (!existingUser) {
            console.log("No user found");
            return null;
          }

          if (existingUser) {
            if (existingUser.password === credentials.password) {
              console.log(existingUser);
              const user = {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
              };
              return user;
            }
          } else {
            console.log("Invalid password");
            return null;
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],

  // Add the custom page for signIn
  pages: {
    signIn: "/pages/auth/signin",
    signOut: "/auth/signout",
    error: "/pages/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },

  // This is the JWT Secret used to encrypt the user
  secret: process.env.NEXTAUTH_SECRET,
  // Here is the Callback used to authenticate the user
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      const email = user.email;
      if (!email) return false;

      try {
        let dbExistingUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!dbExistingUser) {
          dbExistingUser = await prisma.user.create({
            data: {
              email,
              name: user?.name,
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
  },

  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",

  // @ts-ignore
  async jwt(token: any, user: any): Promise<any> {
    if (user) {
      token.id = user.id;
      token.email = user.email;
      token.name = user.name;
    }
    return token;
  },

  // @ts-ignore
  async session({ session, token }): Promise<any> {
    if (session.user) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.name = token.name;
    }
    return session;
  },

  // async redirect({ url, baseUrl }): Promise<any> {},
});

export { handler as GET, handler as POST };
