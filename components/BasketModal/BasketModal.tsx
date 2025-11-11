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

  // Закриття по клавіші Escape
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

  // Закриття по кліку на бекдроп
  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) router.back();
  };

  // --- Оформлення замовлення ---
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
        shippingInfo: {
          firstName: 'Ім’я користувача',
          lastName: 'Прізвище користувача',
          phone: '+380XXXXXXXXX',
          city: 'Київ',
          postOffice: '№1',
          comment: '',
        },
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (!response.ok)
        throw new Error('Помилка оформлення замовлення');
      const result = await response.json();

      console.log('✅ Замовлення створено:', result);
      clearBasket();
      router.push('/order');
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
          <svg className={styles.icon}>
            <use href="/icons/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <div className={styles.header}>
          <svg className={styles.iconBasket}>
            <use href="/icons/sprite.svg#icon-basket"></use>
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
