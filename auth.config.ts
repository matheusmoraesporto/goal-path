import type { NextAuthConfig } from "next-auth";
import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return !!auth?.user;
    },
  },
  providers: []
} satisfies NextAuthConfig;
