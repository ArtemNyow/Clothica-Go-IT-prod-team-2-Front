import { NextRequest, NextResponse } from 'next/server';
import { api } from '../api';

export async function GET(req: NextRequest) {
  try {
    const page = Number(
      req.nextUrl.searchParams.get('page') ?? 1
    );
    const perPage = Number(
      req.nextUrl.searchParams.get('perPage') ?? 10
    );
    const category =
      req.nextUrl.searchParams.get('category') ?? undefined;
    const minPrice =
      req.nextUrl.searchParams.get('minPrice') ?? undefined;
    const maxPrice =
      req.nextUrl.searchParams.get('maxPrice') ?? undefined;
    const size = req.nextUrl.searchParams.getAll('size');
    const gender =
      req.nextUrl.searchParams.get('gender') ?? undefined;

    const params: Record<string, any> = { page, perPage };

    if (category && category !== 'Всі товари')
      params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (size.length) params.size = size;
    if (gender) params.gender = gender;

    const { data } = await api.get('/goods', { params });

    return NextResponse.json({
      data: data?.data ?? [],
      totalGoods: data?.totalGoods ?? 0,
    });
  } catch (error: any) {
    console.error(
      'Failed to fetch goods:',
      error.response?.data || error
    );
    return NextResponse.json({ data: [], totalGoods: 0 });
  }
}
