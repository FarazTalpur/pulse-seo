import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface BackendLoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name?: string | null;
  };
  organization: {
    id: string;
    name: string;
    slug: string;
    role: string;
  } | null;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const backendUrl = process.env.BACKEND_URL;
        if (!backendUrl) {
          console.error("BACKEND_URL environment variable is not set");
          return null;
        }

        try {
          const response = await fetch(`${backendUrl}/v1/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data: BackendLoginResponse = await response.json();

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name ?? null,
            role: data.organization?.role ?? "member",
            organizationId: data.organization?.id ?? null,
            organizationName: data.organization?.name ?? null,
            organizationSlug: data.organization?.slug ?? null,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role ?? "member";
        token.organizationId = (user as { organizationId?: string | null })
          .organizationId;
        token.organizationName = (user as { organizationName?: string | null })
          .organizationName;
        token.organizationSlug = (user as { organizationSlug?: string | null })
          .organizationSlug;
        token.accessToken = (user as { accessToken?: string }).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) ?? "member";
        session.user.organizationId = token.organizationId as string | null;
        session.user.organizationName = token.organizationName as string | null;
        session.user.organizationSlug = token.organizationSlug as string | null;
        session.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
