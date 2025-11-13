'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/app/order/createOrder.module.css';

export type GoodsItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  rating: number;
  reviews: number;
};

type Props = {
  items: GoodsItem[];
};

const GoodsOrderList = ({ items }: Props) => {
  const [goods, setGoods] = useState(items);

  const handleQuantityChange = (
    id: number,
    quantity: number
  ) => {
    if (quantity < 1) return;
    setGoods(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setGoods(prev => prev.filter(item => item.id !== id));
  };

  const delivery = 70;
  const subtotal = goods.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + delivery;

  return (
    <div className={styles.orderProducts}>
      <h2 className={styles.blockTitle}>Товари</h2>

      <div className={styles.productsList}>
        {goods.map(item => (
          <div key={item.id} className={styles.productCard}>
            <Image
              className={styles.productImage}
              src={item.image}
              alt={item.name}
              width={70}
              height={70}
            />

            <div className={styles.productInfo}>
              <div className={styles.productText}>
                <p className={styles.productName}>
                  {item.name}
                </p>

                <div className={styles.productMeta}>
                  <div className={styles.productMeta}>
                    <div className={styles.ratingGroup}>
                      <svg width="14" height="14">
                        <use href="/sprite.svg#icon-icon-star-fill" />
                      </svg>
                      <span
                        className={styles.productRating}
                      >
                        {item.rating}
                      </span>
                    </div>

                    <div className={styles.reviewsGroup}>
                      <svg width="14" height="14">
                        <use href="/sprite.svg#icon-comment-section" />
                      </svg>
                      <span
                        className={styles.productReviews}
                      >
                        {item.reviews}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.productRight}>
                <p className={styles.productPrice}>
                  {(item.price * item.quantity).toFixed(2)}{' '}
                  грн
                </p>

                <div className={styles.quantityButtonRow}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    aria-label="Видалити товар"
                    className={styles.removeButton}
                  >
                    <svg width="20" height="20">
                      <use href="/sprite.svg#icon-trash" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.orderSummary}>
        <div className={styles.summaryRow}>
          <span>Проміжний підсумок</span>
          <span>{subtotal.toFixed(2)} грн</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Доставка</span>
          <span>{delivery.toFixed(2)} грн</span>
        </div>
        <div className={styles.summaryRowTotal}>
          <span>Всього</span>
          <span>{total.toFixed(2)} грн</span>
        </div>
      </div>
    </div>
  );
};

export default GoodsOrderList;
