import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/auth/token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
          return null;
        }

        const { access, refresh, role } = result.data;
        const decodedAccessToken = jwtDecode<{ exp: number }>(access);
        const accessTokenExpires = decodedAccessToken.exp * 1000;

        return {
          id: result.data.id,
          accessToken: access,
          refreshToken: refresh,
          role,
          accessTokenExpires,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.accessTokenExpires = user.accessTokenExpires;
        return token;
      }

      const isExpired = Date.now() > token.accessTokenExpires;
      if (isExpired) {
        try {
          const res = await fetch(
            "https://a2sv-application-platform-backend-team10.onrender.com/auth/token/refresh",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ refresh: token.refreshToken }),
            }
          );

          const data = await res.json();
          if (!res.ok || !data.success)
            throw new Error("Failed to refresh token");

          const newAccessToken = data.data.access;
          const newDecodedToken = jwtDecode<{ exp: number }>(newAccessToken);

          token.accessToken = newAccessToken;
          token.accessTokenExpires = newDecodedToken.exp * 1000;
        } catch (err) {
          console.error("Failed to refresh access token", err);

          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },

    async redirect({ url, baseUrl }) {
      try {
        const parsedUrl = new URL(url, baseUrl);
        const role = parsedUrl.searchParams.get("role");
        
        if (role === "admin") return `${baseUrl}/admin`;
        if (role === "user") return `${baseUrl}/Manager-side`;
        return `${baseUrl}/${role}`;
      } catch {
        return baseUrl;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
