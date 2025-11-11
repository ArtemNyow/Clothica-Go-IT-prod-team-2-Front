import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Список приватних роутів
  const privateRoutes = ['/profile', '/order', '/basket'];
  const isPrivateRoute = privateRoutes.some(route => pathname.startsWith(route));
  
  if (isPrivateRoute) {
    // Перевіряємо наявність accessToken в cookies
    const accessToken = request.cookies.get('accessToken');
    
    if (!accessToken) {
      // Немає токену → редірект на логін
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        loginUrl.searchParams.set('needsAuth', 'true');  // Зберігаємо куди хотів піти
        return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/order/:path*', 
    '/basket/:path*'
  ],
};