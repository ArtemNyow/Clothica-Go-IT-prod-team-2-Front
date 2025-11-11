import { Review } from "@/types/review";
import { nextServer, localApi, ApiError } from "./api";
import type { User, RegisterRequest, Category } from "@/types/user";

export const login = async (phone: string, password: string): Promise<User> => {
  const cleanPhone = phone.replaceAll(/[\s()\-+]/g, "");
  
  try {
    const res = await localApi.post("/auth/login", {
      phone: cleanPhone, 
      password 
    });
    return res.data;
  } catch (err: any) {
    const serverMessage = err.response?.data?.error || err.response?.data?.message;
    
    if (err.response?.status === 401) {
      throw new Error("Невірний номер телефону або пароль");
    } else if (serverMessage) {
      throw new Error(serverMessage);
    } else {
      throw new Error(err.message || "Помилка авторизації");
    }
  }
};

export const register = async (payload: RegisterRequest): Promise<User> => {
  const cleanPayload = {
    firstName: payload.firstName.trim(),
    phone: payload.phone.trim().replaceAll(/[\s()\-+]/g, ''),
    password: payload.password,
  };
  
  try {
    const res = await localApi.post('/auth/register', cleanPayload); // ← localApi!
    return res.data;
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
    await localApi.post('/auth/logout');
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error || 'Logout failed'
    );
  }
};

export const fetchUserProfile = async (): Promise<User> => {
  try {
    const res = await localApi.get("/user/me");
    return res.data;
  } catch (err) {
    throw new Error("Unauthorized");
  }
};

export const updateUserProfile = async (
  payload: Partial<User>
): Promise<User> => {
  try {
    const { data } = await localApi.patch<User>('/user/me', payload); // ← localApi!
    return data;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error || 'Update user failed'
    );
  }
};

export const checkSession = async (): Promise<{ accessToken?: string }> => {
  try {
    const res = await localApi.get('/auth/session');
    return res.data;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error || 'Session check failed'
    );
  }
};

export const getCategories = async (
  page: number = 1,
  perPage: number = 10
): Promise<Category[]> => {
  try {
    const { data } = await nextServer.get<{ data: Category[] }>('/categories', {
      params: { page, perPage },
    });
    return data.data || [];
  } catch (err) {
    const error = err as ApiError;
    throw new Error(
      error.response?.data?.error || 'Не вдалося отримати категорії'
    );
  }
};

export const sendSubscription = async (email: string) => {
  try {
    const res = await nextServer.post('/subscriptions', { email });
    return res.data.message;
  } catch (err: any) {
    if (err.response?.status === 409) {
      throw new Error('Цей email вже підписаний');
    }
    throw new Error('Сталася помилка, спробуйте пізніше');
  }
};

interface fetchReviewsResponse {
  page: number;
  perPage: number;
  totalFeedbacks: number;
  totalPages: number;
  feedbacks: Review[];
}

export const fetchReviews = async (): Promise<Review[]> => {
  try {
    const response = await nextServer.get<fetchReviewsResponse>("/feedbacks?perPage=10");
    return response.data.feedbacks || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};