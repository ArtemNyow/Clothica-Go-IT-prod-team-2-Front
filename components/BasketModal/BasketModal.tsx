'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BasketModal.module.css';
import { useBasketStore } from '@/lib/store/basketStore';
import GoodsOrderList from './GoodsOrderList';
import MessageNoInfo from './MessageNoInfo';

export default function BasketModal() {
  const router = useRouter();
  const { items, getTotalPrice, clearBasket } =
    useBasketStore();
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    },
    [router]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      );
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={() => router.back()}
          aria-label="Закрити кошик"
        >
          <svg className={styles.icon}>
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <h2 className={styles.title}>Ваш кошик</h2>

        {items.length > 0 ? (
          <>
            <GoodsOrderList items={items} />

            <div className={styles.buttons}>
              <button
                className={styles.secondaryBtn}
                onClick={() => router.push('/goods')}
              >
                Продовжити покупки
              </button>

              <button
                className={styles.primaryBtn}
                onClick={() => router.push('/orders')}
              >
                Оформити замовлення
              </button>
            </div>
          </>
        ) : (
          <div className={styles.empty}>
            <MessageNoInfo
              text="Ваш кошик порожній, мерщій до покупок!"
              buttonText="До покупок"
              onClick={() => router.push('/goods')}
            />
          </div>
        )}
      </div>
    </div>
  );
}
