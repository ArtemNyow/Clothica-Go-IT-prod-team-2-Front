"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { fetchUserProfile } from "@/lib/api/clientApi";
import css from "./AuthProvider.module.css";

export default function AuthProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { setUser, clearAuth } = useAuthStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initUser = async () => {
      try {
        const user = await fetchUserProfile();
        if (mounted) setUser(user);
      } catch {
        if (mounted) clearAuth();
      } finally {
        if (mounted) setReady(true);
      }
    };

    initUser();
    return () => { mounted = false; };
  }, [setUser, clearAuth]);

  if (!ready) {
    return (
      <div className={css.loading}>
        <div className={css.spinner}></div>
        <p>Перевірка сесії...</p>
      </div>
    );
  }

  return <>{children}</>;
}