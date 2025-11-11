import { NextResponse } from 'next/server';
import { api, ApiError } from '@/app/api/api';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  
  try {
    await api.post('/auth/logout', {}, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    
    const response = NextResponse.json({ success: true });
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 0,
    };
    
    response.cookies.set('accessToken', '', cookieOptions);
    response.cookies.set('refreshToken', '', cookieOptions);
    response.cookies.set('sessionId', '', cookieOptions);
    
    console.log("✅ Cookies cleared in logout route");
    
    return response;
  } catch (error) {
    console.error("❌ Logout route error:", error);
    
    const response = NextResponse.json(
      { error: (error as ApiError).response?.data?.error ?? "Logout failed" },
      { status: 500 }
    );
    
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 0,
    };
    
    response.cookies.set('accessToken', '', cookieOptions);
    response.cookies.set('refreshToken', '', cookieOptions);
    response.cookies.set('sessionId', '', cookieOptions);
    
    return response;
  }
}