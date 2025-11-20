export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { api, ApiError } from '@/app/api/api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const res = await api.get('/user/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

