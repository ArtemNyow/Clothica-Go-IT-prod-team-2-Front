import axios, { AxiosError } from 'axios';

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: false, 
});

export const localApi = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

export type ApiError = AxiosError<{ error: string }>;