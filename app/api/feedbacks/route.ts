import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('perPage') || '10';
    const goodId = searchParams.get('goodId') || undefined;

    const params: Record<string, string> = {
      page,
      perPage,
    };
    if (goodId) params.goodId = goodId;

    const { data } = await api.get('/feedbacks', {
      params,
    });

    return NextResponse.json(data);
  } catch (err) {
    console.error('Failed to fetch feedbacks:', err);
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { data } = await api.post('/feedbacks', body);

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error('Failed to create feedback:', err);
    return NextResponse.json(
      { error: 'Failed to create feedback' },
      { status: 500 }
    );
  }
}
