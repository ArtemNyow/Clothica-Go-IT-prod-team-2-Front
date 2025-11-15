import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  console.log('🛣️ Middleware check:', {
    pathname,
    hasAccessToken: !!accessToken,
    hasRefreshToken: !!refreshToken,
  });

  const authRoutes = ['/auth'];
  const privateRoutes = ['/profile'];

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );
  const isAuthRoute = authRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute && !accessToken && !refreshToken) {
    console.log('❌ No tokens, redirecting to login');
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPrivateRoute && (accessToken || refreshToken)) {
    console.log(
      '✅ Has token, allowing access (interceptor will refresh if needed)'
    );
  }

  if (isAuthRoute && (accessToken || refreshToken)) {
    console.log(
      '🔄 Already logged in, redirecting to home'
    );
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/auth/:path*'],
};
