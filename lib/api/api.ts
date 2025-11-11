import axios, { AxiosError } from 'axios';

// Для прямих запитів на backend (categories, subscriptions, feedbacks, тощо)
export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: false, // ← false, бо не потрібні cookies для публічних даних
});

// Для запитів через Next.js API routes (auth)
export const localApi = axios.create({
  baseURL: '/api', // ← Локальні Next.js routes!
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;