'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import css from './ProfilePage.module.css';
import Loader from '@/components/Loader/Loader';

export default function ProfilePage() {
  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {}
    clearAuth();
    toast.success('Ви вийшли з системи');
    router.push('/');
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Кабінет</h1>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            Мої транзакції
          </h2>
          <div className={css.emptyState}>
            <p>У вас ще не було жодних замовлень!</p>
            <button
              onClick={() => router.push('/goods')}
              className={css.shopButton}
            >
              До покупок
            </button>
          </div>
        </section>

        <section className={css.section}>
          <h2 className={css.sectionTitle}>
            Особиста інформація
          </h2>
          <div className={css.userInfo}>
            <div className={css.infoRow}>
              <span className={css.label}>Ім'я:</span>
              <span className={css.value}>
                {user.firstName}
              </span>
            </div>
            {user.lastName && (
              <div className={css.infoRow}>
                <span className={css.label}>Прізвище:</span>
                <span className={css.value}>
                  {user.lastName}
                </span>
              </div>
            )}
            <div className={css.infoRow}>
              <span className={css.label}>Email:</span>
              <span className={css.value}>
                {user.email}
              </span>
            </div>
            <div className={css.infoRow}>
              <span className={css.label}>Телефон:</span>
              <span className={css.value}>
                {user.phone}
              </span>
            </div>
          </div>
        </section>

        <button
          onClick={handleLogout}
          className={css.logoutButton}
        >
          Вийти з кабінету
        </button>
      </div>
    </main>
  );
}
