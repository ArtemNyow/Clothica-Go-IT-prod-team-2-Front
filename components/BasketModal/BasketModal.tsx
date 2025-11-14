'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BasketModal.module.css';
import { useBasketStore } from '@/lib/store/basketStore';
import GoodsOrderList from './GoodsOrderList';
import MessageNoInfo from './MessageNoInfo';

export default function BasketModal() {
  const router = useRouter();
  const { items, clearBasket } = useBasketStore();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    },
    [router]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () =>
      document.removeEventListener(
        'keydown',
        handleKeyDown
      );
  }, [handleKeyDown]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) router.back();
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;

    try {
      const orderData = {
        items: items.map(item => ({
          goodId: item.id,
          qty: item.quantity,
          price: item.price,
          size: item.size || 'M',
        })),
      };
    } catch (error) {
      console.error(
        '❌ Помилка при оформленні замовлення:',
        error
      );
    }
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
        >
          <svg
            className={styles.icon}
            width={24}
            height={24}
          >
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <div className={styles.header}>
          <svg className={styles.iconBasket}>
            <use href="/sprite.svg#icon-basket"></use>
          </svg>
          <h2 className={styles.title}>Ваш кошик</h2>
        </div>

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
                onClick={handleCheckout}
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
