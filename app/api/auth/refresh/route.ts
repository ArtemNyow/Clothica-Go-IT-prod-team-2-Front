import { NextRequest, NextResponse } from 'next/server';
import { api,  } from '@/app/api/api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';


export async function POST(req: NextRequest) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const parsedCookies = parse(cookieHeader);

    const refreshToken = parsedCookies.refreshToken;
    if (!refreshToken) {
      return NextResponse.json({ message: 'Session not found' }, { status: 401 });
    }

    const apiRes = await api.post('/auth/refresh', null, {
      headers: {
        Cookie: cookieHeader, 
      },
    });

    const setCookieHeader = apiRes.headers['set-cookie'];
    const response = NextResponse.json({ message: 'Session refreshed' });

    if (setCookieHeader) {
      const cookiesArray = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
      for (const cookieStr of cookiesArray) {
        const parsed = parse(cookieStr);
        if (parsed.sessionId) response.cookies.set('sessionId', parsed.sessionId, { httpOnly: true });
        if (parsed.accessToken) response.cookies.set('accessToken', parsed.accessToken, { httpOnly: true });
        if (parsed.refreshToken) response.cookies.set('refreshToken', parsed.refreshToken, { httpOnly: true });
      }
    }

    return response;
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json({ message: 'Session not found or expired' }, { status: 401 });
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
