import { NextResponse } from 'next/server';
import { api, ApiError } from '@/app/api/api';

export async function POST(request: Request) {
  const body = await request.json();
  
  try {
    const { data, headers } = await api.post('/auth/register', body);
    
    const setCookieHeader = headers['set-cookie'];
    
    const response = NextResponse.json(data);
    
    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader) 
        ? setCookieHeader 
        : [setCookieHeader];
      
      cookiesArray.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
      });
    }
    
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: (error as ApiError).response?.data?.error ?? (error as ApiError).message },
      { status: (error as ApiError).response?.status || 500 }
    );
  }
}