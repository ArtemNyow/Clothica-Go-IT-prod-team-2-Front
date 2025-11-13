import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split('/').pop();
    if (!id)
      return NextResponse.json(
        { error: 'Missing id' },
        { status: 400 }
      );

    const { data } = await api.get(`/goods/${id}`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch good by id:', error);
    return NextResponse.json(
      { error: 'Failed to fetch good by id' },
      { status: 500 }
    );
  }
}
