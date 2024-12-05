"use client";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        // Get users from our in-memory storage
        const users = global.users || [];
        const user = users.find((u: any) => u.email === credentials.email);

        if (!user || user.password !== credentials.password) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          type: user.type
        };
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.type = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).type = token.type;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };