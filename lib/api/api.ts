import axios from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach(prom =>
    error ? prom.reject(error) : prom.resolve()
  );
  failedQueue = [];
};

nextServer.interceptors.response.use(
  response => {
    console.log('✅ Response OK:', response.config.url);
    return response;
  },
  async error => {
    console.log('❌ Interceptor caught error:', {
      status: error.response?.status,
      url: error.config?.url,
      retry: error.config?._retry,
    });

    const originalRequest = error.config;
    const isAuthEndpoint = [
      '/auth/refresh',
      '/auth/login',
      '/auth/register',
    ].some(endpoint =>
      originalRequest.url?.includes(endpoint)
    );

    console.log('🔍 Check conditions:', {
      is401: error.response?.status === 401,
      notRetry: !originalRequest._retry,
      notAuthEndpoint: !isAuthEndpoint,
      shouldRefresh:
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !isAuthEndpoint,
    });

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      if (isRefreshing) {
        console.log(
          '⏳ Already refreshing, adding to queue'
        );
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => nextServer(originalRequest));
      }

      console.log('🔄 Starting refresh process...');
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('📡 Calling POST /auth/refresh');
        const refreshResponse =
          await nextServer.post('/auth/refresh');
        console.log(
          '✅ Refresh successful:',
          refreshResponse.data
        );

        processQueue(null);

        console.log(
          '🔁 Retrying original request:',
          originalRequest.url
        );
        return nextServer(originalRequest);
      } catch (refreshError) {
        console.log('❌ Refresh FAILED:', refreshError);
        processQueue(refreshError);

        if (typeof window !== 'undefined') {
          const { useAuthStore } = await import(
            '@/lib/store/authStore'
          );
          useAuthStore.getState().clearAuth();

          if (
            !window.location.pathname.startsWith('/auth')
          ) {
            console.log('🔄 Redirecting to /auth/login');
            window.location.href = '/auth/login';
          }
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
        console.log('✅ Refresh process completed');
      }
    }

    return Promise.reject(error);
  }
);
