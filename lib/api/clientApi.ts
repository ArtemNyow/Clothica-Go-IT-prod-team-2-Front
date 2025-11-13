import {
  fetchReviewsResponse,
  Review,
} from '@/types/review';
import { nextServer } from './api';
import type { User, RegisterRequest } from '@/types/user';
import { Category } from '@/types/category';
import { GetGoodsParams, Good } from '@/types/goods';
import { log } from 'console';

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
    '/user/me',
    payload
  );
  return data;
};

export const checkSession = async (): Promise<{
  accessToken?: string;
}> => {
  const res = await nextServer.get('/auth/session');
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

export const fetchReviews = async (): Promise<Review[]> => {
  const response =
    await nextServer.get<fetchReviewsResponse>(
      '/feedbacks'
    );
  console.log(response.data.feedbacks);
  return response.data.feedbacks || [];
};

export const getGoodsByFeedback = async (
  params: GetGoodsParams = {}
): Promise<Good[]> => {
  const { data } = await nextServer.get<{ data: Good[] }>(
    '/goods',
    { params }
  );

  const filteredGoods = data.data.filter(
    good => (good.feedbackCount ?? 0) > 0
  );

  return filteredGoods;
};

export const getGoods = async (
  params: GetGoodsParams = {}
): Promise<Good[]> => {
  const { data } = await nextServer.get<{ data: Good[] }>(
    '/goods',
    {
      params,
    }
  );

  return data.data;
};

export const getGoodById = async (id: string) => {
  const res = await nextServer.get(`/goods/${id}`);
  return res.data;
};
