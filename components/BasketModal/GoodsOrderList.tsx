'use client';

import {
  BasketItem,
  useBasketStore,
} from '@/lib/store/basketStore';
import styles from './BasketModal.module.css';

type GoodsOrderListProps = {
  items: BasketItem[];
};

export default function GoodsOrderList({
  items,
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
    <div className={styles.orderList}>
      <ul className={styles.list}>
        {items.map(item => (
          <li
            key={`${item._id}-${item.size}`}
            className={styles.listItem}
          >
            <div className={styles.itemInfo}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
              )}
              <div className={styles.itemDetails}>
                <div>
                  <p className={styles.itemName}>
                    {item.name}
                  </p>
                  {item.size && (
                    <p className={styles.itemSize}>
                      Розмір: {item.size}
                    </p>
                  )}
                  <div className={styles.ItemWrap}>
                    <p className={styles.itemfeetbacks}>
                      <svg className={styles.itemStar}>
                        <use href="/sprite.svg#icon-icon-star-fill"></use>
                      </svg>
                      {item.avgRating}
                    </p>
                    <p className={styles.itemfeetbacks}>
                      <svg className={styles.itemStar}>
                        <use href="/sprite.svg#icon-comment-section"></use>
                      </svg>
                      {item.feedbackCount}
                    </p>
                  </div>
                </div>
                <p className={styles.itemTotalPrice}>
                  {(
                    item.price.value * item.quantity
                  ).toLocaleString()}{' '}
                  {item.price.currency}
                </p>
                <div className={styles.qtyControl}>
                  <input
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
                    className={styles.qtyInput}
                  />
                </div>
              </div>
            </div>

            <div className={styles.itemRight}>
              <button
                className={styles.removeBtn}
                onClick={() => removeFromBasket(item._id)}
                aria-label="Видалити товар"
              >
                <svg
                  className={styles.iconRemove}
                  width={20}
                  height={20}
                >
                  <use href="/sprite.svg#icon-trash"></use>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Підсумок під списком товарів */}
      <div className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Проміжний підсумок</span>
          <span>{subtotal.toLocaleString()} грн</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Доставка (5%)</span>
          <span>{delivery.toLocaleString()} грн</span>
        </div>
        <div className={styles.summaryTotal}>
          <span>Всього</span>
          <span>{total.toLocaleString()} грн</span>
        </div>
      </div>
    </div>
  );
}
