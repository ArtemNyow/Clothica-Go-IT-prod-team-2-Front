export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  phone: string;
  email: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ---------- AUTH ----------
export interface RegisterRequest {
  firstName: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}
