import { AxiosInstance } from 'axios';
import { printValue } from 'yup';

let isRefreshing = false;
let failedQueue: Array<(token?: any) => void> = [];

const processQueue = (error: any, value?: any) => {
  failedQueue.forEach(prom => prom(error || value));
  failedQueue = [];
};

export const attachAuthInterceptor = (
  axiosInstance: AxiosInstance
) => {
  axiosInstance.interceptors.response.use(
    response => response,

    async error => {
      const originalRequest = error.config;

      const pathname =
        originalRequest?.url?.split('?')[0] ?? '';
      const publicPaths = [
        '/',
        '/goods',
        '/categories',
        '/orders',
      ];
      const isPublic = publicPaths.some(path =>
        pathname.startsWith(path)
      );

      const isAuthEndpoint = [
        '/auth/refresh',
        '/auth/login',
        '/auth/register',
      ].some(endpoint => pathname.startsWith(endpoint));

      if (
        error.response?.status !== 401 ||
        isAuthEndpoint
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise(resolve => {
          failedQueue.push(() =>
            resolve(axiosInstance(originalRequest))
          );
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { useAuthStore } = await import(
        '@/lib/store/authStore'
      );

      try {
        await axiosInstance.post('/auth/refresh', null, {
          withCredentials: true,
        });

        processQueue(null);
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();

        if (typeof window !== 'undefined' && !isPublic) {
          window.location.href = '/auth/login';
        }

        processQueue(refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};
