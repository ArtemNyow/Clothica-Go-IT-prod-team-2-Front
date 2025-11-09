import axios, { AxiosError } from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api", // ✅ префікс /api залишити
  withCredentials: false,
});

export type ApiError = AxiosError<{ error: string }>;
