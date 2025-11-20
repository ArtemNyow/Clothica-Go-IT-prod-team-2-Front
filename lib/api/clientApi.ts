import {
  fetchReviewsResponse,
  Review,
  ReviewRequestBody,
} from '@/types/review';

import { nextServer } from './api';
import type { User, RegisterRequest } from '@/types/user';
import { Category } from '@/types/category';
import { Order } from '@/types/order';
import { GetGoodsParams, Good } from '@/types/goods';

export const login = async (
  phone: string,
  password: string
): Promise<User> => {
  const cleanPhone = phone.replaceAll(/[\s()\-+]/g, '');
  const res = await nextServer.post('/auth/login', {
    phone: cleanPhone,
    password,
  });
  return res.data;
};

export const register = async (
  payload: RegisterRequest
): Promise<User> => {
  const cleanPayload = {
    firstName: payload.firstName.trim(),
    phone: payload.phone
      .trim()
      .replaceAll(/[\s()\-+]/g, ''),
    password: payload.password,
  };

  const res = await nextServer.post(
    '/auth/register',
    cleanPayload
  );
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const fetchUserProfile = async (): Promise<User> => {
  const res = await nextServer.get('/user/me');
  return res.data;
};

export const updateUserProfile = async (
  payload: Partial<User>
): Promise<User> => {
  const { data } = await nextServer.patch<User>(
    '/user/edit',
    payload
  );
  return data;
};

export const refreshAccessToken = async (): Promise<{
  accessToken: string;
}> => {
  const res = await nextServer.post('/auth/refresh');
  return res.data;
};

export const getCategories = async (
  page: number = 1,
  perPage: number = 10
): Promise<Category[]> => {
  const { data } = await nextServer.get<{
    data: Category[];
  }>('/categories', {
    params: { page, perPage },
  });
  return data.data || [];
};

export const sendSubscription = async (email: string) => {
  try {
    const res = await nextServer.post('/subscriptions', {
      email,
    });
    return res.data.message;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.error ||
        'Не вдалося створити підписку'
    );
  }
};

export const fetchReviews = async (
  id?: string
): Promise<Review[]> => {
  const response =
    await nextServer.get<fetchReviewsResponse>(
      '/feedbacks',
      {
        params: id ? { goodId: id } : {},
      }
    );
  console.log(response.data.feedbacks);
  return response.data.feedbacks || [];
};

export const createReview = async (
  review: ReviewRequestBody
): Promise<Review> => {
  const res = await nextServer.post<Review>(
    '/feedbacks',
    review
  );
  return res.data;
};

export const getGoodsByFeedback = async (
  params: GetGoodsParams = {}
): Promise<Good[]> => {
  const { data } = await nextServer.get<{ data: Good[] }>(
    '/goods',
    { params }
  );

  const goods = data.data ?? [];

  return goods
    .filter(good => (good.feedbackCount ?? 0) > 0)
    .sort(
      (a, b) =>
        (b.feedbackCount ?? 0) - (a.feedbackCount ?? 0)
    )
    .sort(
      (a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0)
    );
};

export const getGoods = async (
  params: GetGoodsParams = {},
  page: number = 1,
  perPage: number = 15
) => {
  const response = await nextServer.get('/goods', {
    params: { ...params, page, perPage },
    paramsSerializer: params => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, v));
        } else if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  });

  return {
    data: response.data.data,
    totalGoods: response.data.totalGoods,
  };
};

export const getGoodById = async (id: string) => {
  const res = await nextServer.get(`/goods/${id}`);
  return res.data;
};

export const createOrder = async (payload: any) => {
  const { data } = await nextServer.post(
    '/orders',
    payload
  );
  return data;
};

export const getMyOrders = async () => {
  const { data } = await nextServer.get('/orders');
  return data;
};

export const fetchMyOrders = async (): Promise<Order[]> => {
  try {
    const { data } = await nextServer.get<{
      message: string;
      page: number;
      perPage: number;
      totalOrders: number;
      totalPages: number;
      data: Order[];
    }>('/orders/my');
    return data.data || [];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};
