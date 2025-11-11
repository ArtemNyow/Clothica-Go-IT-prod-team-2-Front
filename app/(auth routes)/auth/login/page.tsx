"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const needsAuth = searchParams.get('needsAuth');
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (needsAuth === 'true' && !hasShownToast.current) {
      toast.error("Для доступу до цієї сторінки потрібна авторизація", {
        id: 'auth-required', // ← Унікальний ID щоб не дублювати
      });
      hasShownToast.current = true;
    }
  }, [needsAuth]);

  return <LoginForm />;
}