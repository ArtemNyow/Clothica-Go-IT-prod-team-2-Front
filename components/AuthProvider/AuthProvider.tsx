'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { fetchUserProfile } from '@/lib/api/clientApi';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    if (pathname.startsWith('/auth')) return;

    if (user) return;

    fetchUserProfile()
      .then(setUser)
      .catch(() => {
        clearAuth();

        const protectedRoutes = ['/profile'];

        if (
          protectedRoutes.some(route =>
            pathname.startsWith(route)
          )
        ) {
          router.push('/auth/login?needsAuth=1');
        }
      });
  }, [pathname]);

  return children;
}
