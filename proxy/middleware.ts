import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken');
  const authRoutes = ['/auth'];
  const privateRoutes = ['/profile'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
    
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  if (isPrivateRoute && !accessToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    loginUrl.searchParams.set('needsAuth', 'true');
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/auth/:path*',
  ],
};