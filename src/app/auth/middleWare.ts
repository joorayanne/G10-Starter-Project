// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access')?.value;


  if (!accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  const base64Payload = accessToken.split('.')[1];
  const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
  const role = payload.role;


  const path = request.nextUrl.pathname;

  if (path.startsWith('/admin') && (role !== 'admin' || role !== 'manager')) {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  if (path.startsWith('/Manager-side') && role !== 'manager') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  if (path.startsWith('/Revieweee') && role !== 'reviewer') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }


  return NextResponse.next(); 
}
// middleware.ts (bottom of file)
export const config = {
  matcher: [
    '/admin/:path*',
    '/Manager-side/:path*',
    '/test/:path*',
    '/applicant-routes/:path*'
  ]
};