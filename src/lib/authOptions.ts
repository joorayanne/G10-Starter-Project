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
        if (!credentials?.email || !credentials?.password) return null;

        const res = await fetch(
          "https://a2sv-application-platform-backend-team10.onrender.com/auth/token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );

        const result = await res.json();
        console.log("BACKEND API RESPONSE FOR ROLE:", result.data);

        const { id, access, refresh, role } = result.data;
        const decodedAccessToken = jwtDecode<{ exp: number }>(access);
        const accessTokenExpires = decodedAccessToken.exp * 1000;

        return {
          id,
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
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          role: user.role,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      const isExpired = Date.now() > (token.accessTokenExpires as number);
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

          return {
            ...token,
            accessToken: newAccessToken,
            accessTokenExpires: newDecodedToken.exp * 1000,
          };
        } catch (err) {
          console.error("Failed to refresh access token", err);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      session.accessToken = token.accessToken as string;
      return session;
    },

    
    
   
  },
  secret: process.env.NEXTAUTH_SECRET,
};
