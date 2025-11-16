'use client';

import GoodsOrderList, {
  GoodsItem,
} from '@/components/CreateOrder/GoodsOrderList';
import CreateOrderForm from '@/components/CreateOrder/CreateOrderForm';
import styles from '@/app/order/createOrder.module.css';

const CreateOrder = () => {
  const items: GoodsItem[] = [
    {
      id: 1,
      name: 'Футболка Oversize',
      price: 1000,
      quantity: 1,
      image: '/hoodie.jpg',
      rating: 4.8,
      reviews: 12,
    },
    {
      id: 2,
      name: 'Джинси Slim Fit',
      price: 900,
      quantity: 2,
      image: '/hoodie.jpg',
      rating: 4.6,
      reviews: 8,
    },
  ];

  return (
    <section className={styles.orderPage}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>
          Оформити замовлення
        </h1>

        <div className={styles.sectionsWrapper}>
          <GoodsOrderList items={items} />
          <CreateOrderForm />
        </div>
      </div>
    </section>
  );
};

export default CreateOrder;
