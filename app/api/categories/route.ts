import { NextResponse } from 'next/server';
import { Category } from '@/types/category';
import { api } from '../api';

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page') || 1);
    const perPage = Number(
      url.searchParams.get('perPage') || 10
    );

    const res = await api.get<{
      data: Category[];
    }>('/categories', {
      params: { page, perPage },
    });

    return NextResponse.json(res.data || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
