'use client';

import { useBasketStore } from '@/lib/store/basketStore';
import styles from './BasketModal.module.css';

type GoodsOrderListProps = {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    size?: string;
  }[];
};

export default function GoodsOrderList({
  items,
}: GoodsOrderListProps) {
  const { updateQuantity, removeFromBasket } =
    useBasketStore();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.orderList}>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles.listItem}>
            <div className={styles.itemInfo}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
              )}
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>
                  {item.name}
                </p>
                {item.size && (
                  <p className={styles.itemSize}>
                    Розмір: {item.size}
                  </p>
                )}
                <p className={styles.itemPriceSingle}>
                  {item.price} грн / од.
                </p>

                <div className={styles.qtyControl}>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e =>
                      updateQuantity(
                        item.id,
                        Number(e.target.value)
                      )
                    }
                    className={styles.qtyInput}
                  />
                </div>
              </div>
            </div>

            <div className={styles.itemRight}>
              <p className={styles.itemTotalPrice}>
                {item.price * item.quantity} грн
              </p>

              <button
                className={styles.removeBtn}
                onClick={() => removeFromBasket(item.id)}
                aria-label="Видалити товар"
              >
                <svg className={styles.iconRemove}>
                  <use href="/icons/sprite.svg#icon-close"></use>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.summary}>
        <div className={styles.row}>
          <span>Проміжний підсумок</span>
          <span>{total.toLocaleString()} грн</span>
        </div>
        <div className={styles.row}>
          <span>Доставка</span>
          <span>—</span>
        </div>
        <div className={styles.totalRow}>
          <span>Всього</span>
          <span>{total.toLocaleString()} грн</span>
        </div>
      </div>
    </div>
  );
}
