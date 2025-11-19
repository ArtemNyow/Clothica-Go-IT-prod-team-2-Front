'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BasketModal.module.css';
import { useBasketStore } from '@/lib/store/basketStore';
import GoodsOrderList from './GoodsOrderList';
import MessageNoInfo from './MessageNoInfo';
import { __next_app__ } from 'next/dist/build/templates/app-page';

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
    document.body.style.position = 'fixed';

    document.body.style.width = '100%';

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown
      );
      document.body.style.position = '';
      document.body.style.top = '';
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const handleNavigate = (path: string) => {
    document.body.style.overflow = 'unset';
    router.push(path);
    window.location.href = path;
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Закрити кошик"
        >
          <svg className={styles.icon}>
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>

        <h2 className={styles.title}>Ваш кошик</h2>

        {items.length > 0 ? (
          <>
            <div className={styles.modalContent}>
              <GoodsOrderList items={items} />
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.secondaryBtn}
                onClick={() => handleNavigate('/goods')}
              >
                Продовжити покупки
              </button>

              <button
                className={styles.primaryBtn}
                onClick={() => handleNavigate('/orders')}
              >
                Оформити замовлення
              </button>
            </div>
          </>
        ) : (
          <MessageNoInfo
            text="Ваш кошик порожній, мерщій до покупок!"
            buttonText="До покупок"
            onClick={() => handleNavigate('/goods')}
          />
        )}
      </div>
    </div>
  );
}
