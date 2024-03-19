import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { FirestoreAdapter, initFirestore } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";

const { private_key } = JSON.parse(
  process.env.FIRESTORE_PRIVATE_KEY ? process.env.FIRESTORE_PRIVATE_KEY : ""
);

export const firestore = initFirestore({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: private_key,
  }),
});

export const config = {
  // theme: {
  //   logo: "https://next-auth.js.org/img/logo/logo-sm.png",
  // },
  debug: true,
  adapter: FirestoreAdapter(firestore),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  basePath: "/api/auth",
  callbacks: {
    authorized({ request, auth }) {
      return true;
    },
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
