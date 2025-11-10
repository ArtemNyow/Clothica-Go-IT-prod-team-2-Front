import { nextServer, ApiError } from './api';
import type {
  User,
  RegisterRequest,
  Category,
} from '@/types/user';

export const login = async (
  phone: string,
  password: string
): Promise<User> => {
  const cleanPhone = phone.replaceAll(/[\s()\-+]/g, '');
  try {
    const res = await nextServer.post('/auth/login', {
      phone: cleanPhone,
      password,
    });
    return res.data.user;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.error ||
        err.message ||
        'Помилка авторизації'
    );
  }
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
  try {
    const res = await nextServer.post(
      '/auth/register',
      cleanPayload
    );
    return res.data.user;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.error ||
        err.message ||
        'Помилка реєстрації'
    );
  }
};

export const logout = async (): Promise<void> => {
  try {
    await nextServer.post('/auth/logout');
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error || 'Logout failed'
    );
  }
};

export const fetchUserProfile = async (): Promise<User> => {
  const res = await nextServer.get('/users/me');
  return res.data;
};

export const updateUserProfile = async (
  payload: Partial<User>
): Promise<User> => {
  try {
    const { data } = await nextServer.patch<User>(
      '/users/me',
      payload
    );
    return data;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error || 'Update user failed'
    );
  }
};

export const checkSession = async (): Promise<{
  accessToken?: string;
}> => {
  try {
    const res = await nextServer.get('/auth/session');
    return res.data;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error || 'Session check failed'
    );
  }
};

export const getCategories = async (): Promise<
  Category[]
> => {
  try {
    const { data } = await nextServer.get<{
      data: Category[];
    }>('/categories', {
      params: { page: 1, perPage: 10 },
    });
    return data.data || [];
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error ||
        'Не вдалося отримати категорії'
    );
  }
};
