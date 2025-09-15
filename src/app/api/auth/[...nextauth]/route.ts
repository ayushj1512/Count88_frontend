import NextAuth, { Session, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";

// 🔹 Custom user type extending NextAuth's User
export interface ExtendedUser extends User {
  id: string; // must be required, NextAuth expects this
  phone?: string | null;
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials
      ): Promise<User | null> {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

        if (!res.ok) return null;

        const user = (await res.json()) as ExtendedUser;

        // ✅ Ensure `id` exists
        if (!user.id) {
          user.id = user.email ?? "temp-id";
        }

        return user as User;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWT & { user?: ExtendedUser };
      user?: ExtendedUser;
    }) {
      if (user) token.user = user;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT & { user?: ExtendedUser };
    }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
