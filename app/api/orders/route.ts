import { NextResponse } from 'next/server';
import { api } from '../api';

export async function GET() {
  try {
    const res = await api.get('/orders/me');
    return NextResponse.json(res.data);
  } catch (err) {
    console.error('[GET /orders] Error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await api.post('/orders', body);

    return NextResponse.json(res.data);
  } catch (err) {
    console.error('[POST /orders] Error:', err);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
