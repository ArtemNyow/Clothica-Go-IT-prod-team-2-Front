import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('Middleware triggered:', pathname);

  const privateRoutes = ['/profile'];

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  const hasRefreshToken =
    request.cookies.has('refreshToken');

  if (isPrivateRoute && !hasRefreshToken) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'],
};
