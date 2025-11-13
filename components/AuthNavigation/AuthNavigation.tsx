'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import css from './AuthNavigation.module.css';

type AuthNavigationProps = {
  onLinkClick?: () => void;
};

export default function AuthNavigation({
  onLinkClick,
}: AuthNavigationProps) {
  const { user, isAuthenticated, clearAuth } =
    useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
      clearAuth();
      toast.success('Ви вийшли з системи');
      router.push('/');
      if (onLinkClick) onLinkClick();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Помилка виходу');
    }
  };

  return (
    <div className={css.authNav}>
      {isAuthenticated && user ? (
        <>
          <Link
            href="/profile"
            className={css.link}
            onClick={onLinkClick}
          >
            Кабінет
          </Link>
          <button
            onClick={handleLogout}
            className={css.link}
          >
            Вийти
          </button>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className={css.link}
            onClick={onLinkClick}
          >
            Вхід
          </Link>
          <Link
            href="/auth/register"
            className={css.link}
            onClick={onLinkClick}
          >
            Реєстрація
          </Link>
        </>
      )}
    </div>
  );
}
