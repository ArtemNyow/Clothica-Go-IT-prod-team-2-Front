'use client';

import CreateOrderForm from '@/components/CreateOrder/CreateOrderForm';
import { useBasketStore } from '@/lib/store/basketStore';
import styles from '@/app/orders/createOrder.module.css';

import GoodsOrderList from '../BasketModal/GoodsOrderList';
import MessageNoInfo from '../BasketModal/MessageNoInfo';
import { useRouter } from 'next/navigation';

const CreateOrder = () => {
  const items = useBasketStore(state => state.items);
  const router = useRouter();
  return (
    <section className={styles.orderPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          Оформити замовлення
        </h1>

        <div className={styles.sectionsWrapper}>
          {items.length > 0 ? (
            <>
              <GoodsOrderList items={items} />
              <CreateOrderForm />
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
    </section>
  );
};

export default CreateOrder;
