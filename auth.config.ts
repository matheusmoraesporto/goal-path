import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      if (nextUrl.pathname.startsWith("/signup")) {
        return true;
      }
      return !!auth?.user;
    },
  },
  providers: []
} satisfies NextAuthConfig;
