'use client';

import {
  BasketItem,
  useBasketStore,
} from '@/lib/store/basketStore';
import styles from './BasketModal.module.css';

type GoodsOrderListProps = {
  items: BasketItem[];
  title?: string;
};

export default function GoodsOrderList({
  items,
  title,
}: GoodsOrderListProps) {
  const {
    updateQuantity,
    removeFromBasket,
    getTotalPrice,
  } = useBasketStore();

  const handleQuantityChange = (
    id: string,
    newQty: number
  ) => {
    if (newQty < 1) removeFromBasket(id);
    else updateQuantity(id, newQty);
  };

  const subtotal = getTotalPrice();
  const delivery = Math.round(subtotal * 0.05);
  const total = subtotal + delivery;

  return (
    <div className={styles.orderProducts}>
      <h2 className={styles.blockTitle}>{title}</h2>
      <div className={styles.productsList}>
        {items.map(item => (
          <div
            key={`${item._id}-${item.size}`}
            className={styles.productCard}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                width={70}
                height={70}
                className={styles.productImage}
              />
            )}

            <div className={styles.productInfo}>
              <div className={styles.productText}>
                <p className={styles.productName}>
                  {item.name}
                </p>

                {item.size && (
                  <p className={styles.productSize}>
                    Розмір: {item.size}
                  </p>
                )}

                <div className={styles.productMeta}>
                  <div className={styles.ratingGroup}>
                    <svg width="14" height="14">
                      <use href="/sprite.svg#icon-icon-star-fill" />
                    </svg>
                    <span className={styles.productRating}>
                      {item.avgRating}
                    </span>
                  </div>

                  <div className={styles.reviewsGroup}>
                    <svg width="14" height="14">
                      <use href="/sprite.svg#icon-comment-section" />
                    </svg>
                    <span className={styles.productReviews}>
                      {item.feedbackCount}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.productRight}>
                <p className={styles.productPrice}>
                  {(
                    item.price.value * item.quantity
                  ).toLocaleString()}{' '}
                  {item.price.currency}
                </p>

                <div className={styles.quantityButtonRow}>
                  <input
                    type="number"
                    min="1"
                    defaultValue={item.quantity}
                    onBlur={e => {
                      const val = Number(e.target.value);
                      handleQuantityChange(
                        item._id,
                        val < 1 ? 1 : val
                      );
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        const val = Number(
                          (e.target as HTMLInputElement)
                            .value
                        );
                        handleQuantityChange(
                          item._id,
                          val < 1 ? 1 : val
                        );
                      }
                    }}
                    className={styles.quantityInput}
                  />

                  <button
                    className={styles.removeButton}
                    onClick={() =>
                      removeFromBasket(item._id)
                    }
                    aria-label="Видалити товар"
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
          <span>{subtotal.toLocaleString()} грн</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Доставка (5%)</span>
          <span>{delivery.toLocaleString()} грн</span>
        </div>

        <div className={styles.summaryRowTotal}>
          <span>Всього</span>
          <span>{total.toLocaleString()} грн</span>
        </div>
      </div>
    </div>
  );
}
