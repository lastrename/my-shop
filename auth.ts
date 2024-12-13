import type { Provider } from "@auth/core/providers";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Yandex from "next-auth/providers/yandex";

const prisma = new PrismaClient();

const providers: Provider[] = [Google, Yandex];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;

      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.AUTH_SECRET,
});
