import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  
  interface User {
    accessToken: string;
    refreshToken: string;
    role: string;
    accessTokenExpires: number;
  }

  
  interface Session {
    accessToken?: string;
    error?: "RefreshAccessTokenError";
    user?: User; 
  }
}

declare module "next-auth/jwt" {

  interface JWT {
    accessToken: string;
    refreshToken: string;
    role: string;
    accessTokenExpires: number;
    error?: "RefreshAccessTokenError";
  }
}