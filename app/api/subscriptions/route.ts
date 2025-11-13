import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email обовʼязковий' },
        { status: 400 }
      );
    }

    const { data } = await api.post('/subscriptions', {
      email,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    console.error('Failed to create subscription:', err);

    if (err.response?.status === 409) {
      return NextResponse.json(
        {
          error:
            err.response.data?.error || 'Вже підписаний',
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Не вдалося створити підписку' },
      { status: 500 }
    );
  }
}
