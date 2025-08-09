

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


const protectedRoutes: Record<string, string[]> = {
  "/admin": ["admin"],
  "/Manager-side": ["manager"],
  "/applicant-routes": ["applicant"],
  "/Reviewee": ["reviewer"],
};

export async function middleware(req: NextRequest) {

  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  
  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );


  if (!matchedRoute) {
    return NextResponse.next();
  }


  if (!token) {
    const signInUrl = new URL("/signin", req.url);
    
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  
  const userRole = token.role as string; 
  const allowedRoles = protectedRoutes[matchedRoute];

  if (!userRole || !allowedRoles.includes(userRole)) {
    
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  
  return NextResponse.next();
}


export const config = {
  matcher: [
    "/admin/:path*",
    "/Manager-side/:path*",
    "/applicant-routes/:path*",
    "/Reviewee/:path*",
  ],
};