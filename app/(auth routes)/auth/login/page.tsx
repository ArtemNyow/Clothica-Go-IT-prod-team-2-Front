"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const needsAuth = searchParams.get('needsAuth');
  
  useEffect(() => {
    if (needsAuth === "1") {
     toast.error("Для доступу до цієї сторінки потрібна авторизація", {
      id: 'auth-required',
      });
    }
  }, [needsAuth]);

  return <LoginForm />;
}