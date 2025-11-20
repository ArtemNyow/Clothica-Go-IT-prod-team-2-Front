'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import {
  fetchUserProfile,
  refreshAccessToken,
} from '@/lib/api/clientApi';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    // Пропускаємо сторінки auth
    if (pathname.startsWith('/auth')) return;

    // Якщо немає користувача — нічого не робимо
    if (!user) return;

    const silentlyFetchProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUser(profile);
      } catch (err: any) {
        // Якщо 401 — пробуємо тихий рефреш
        if (err?.response?.status === 401) {
          try {
            await refreshAccessToken(); // тихий рефреш
            const profile = await fetchUserProfile(); // повторно отримуємо профіль
            setUser(profile);
          } catch {
            // якщо рефреш не пройшов — чистимо auth і редірект
            clearAuth();
            const protectedRoutes = ['/profile'];
            if (
              protectedRoutes.some(route =>
                pathname.startsWith(route)
              )
            ) {
              router.push('/auth/login?needsAuth=1');
            }
          }
        } else {
          // інші помилки тихо чистимо auth
          clearAuth();
        }
      }
    };

    silentlyFetchProfile();
  }, [pathname, user, setUser, clearAuth, router]);

  return children;
}
