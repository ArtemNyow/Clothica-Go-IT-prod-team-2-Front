import { nextServer, ApiError } from "./api";
import type { User, RegisterRequest } from "@/types/user";
import axios from "axios";

const localApi = axios.create({
  baseURL: "/api",
  withCredentials: true,
});
export const login = async (phone: string, password: string): Promise<User> => {
  const cleanPhone = phone.replaceAll(/[\s()\-+]/g, "");
  try {
    const res = await localApi.post("/auth/login", { phone: cleanPhone, password });
    return res.data.user;
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
    phone: payload.phone.trim().replaceAll(/[\s()\-+]/g, ""),
    password: payload.password,
  };
  try {
    const res = await localApi.post<User>("/auth/register", cleanPayload);
    return res.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.error || err.message || "Помилка реєстрації");
  }
};

export const logout = async (): Promise<void> => {
  try {
    await localApi.post("/auth/logout", {}, { withCredentials: true });
  } catch (err: any) {
    throw new Error(err.response?.data?.error || "Logout failed");
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

export const updateUserProfile = async (payload: Partial<User>): Promise<User> => {
  try {
    const { data } = await localApi.patch<User>("/user/me", payload);
    return data;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.response?.data?.error || "Update user failed");
  }
};

export const checkSession = async (): Promise<{ accessToken?: string }> => {
  try {
    const res = await localApi.get("/auth/session");
    return res.data;
  } catch (err) {
    const error = err as ApiError;
    throw new Error(error.response?.data?.error || "Session check failed");
  }
};
