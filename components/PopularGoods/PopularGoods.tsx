'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './PopularGoods.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getGoodsbyFeedback } from '@/lib/api/clientApi';
import { Good } from '@/types/goods';

const PopularGoods = () => {
  const {
    data: goods,
    isLoading,
    isError,
  } = useQuery<Good[]>({
    queryKey: ['popularGoods'],
    queryFn: () =>
      getGoodsbyFeedback({ page: 1, perPage: 10 }),
  });

  if (isLoading) {
    return (
      <section className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.categoryLabel}>
            Популярні товари
          </span>
          <div className={styles.viewAll}>Всі товари</div>
        </div>
        <div className={styles.slider}>Loading...</div>
      </section>
    );
  }

  if (isError || !goods || goods.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.categoryLabel}>
          Популярні товари
        </span>
        <Link href="/goods" className={styles.viewAll}>
          Всі товари
        </Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          375: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1440: { slidesPerView: 4 },
        }}
        className={styles.slider}
      >
        {goods.map(item => (
          <SwiperSlide
            key={item._id}
            className={styles.slide}
          >
            <div className={styles.card}>
              <div className={styles.imageBox}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  suppressHydrationWarning
                />
              </div>
              <div className={styles.info}>
                <h3 className={styles.title}>
                  {item.name}
                </h3>
                <div className={styles.row}>
                  <div className={styles.leftMeta}>
                    <span className={styles.metaItem}>
                      <svg className={styles.icon}>
                        <use href="/sprite.svg#icon-icon-star-fill" />
                      </svg>
                      {item.avgRating ?? 0}
                    </span>
                    <span className={styles.metaItem}>
                      <svg className={styles.icon}>
                        <use href="/sprite.svg#icon-comment-section" />
                      </svg>
                      {item.feedbackCount ?? 0}
                    </span>
                  </div>
                  <span className={styles.price}>
                    {item.price.value} грн
                  </span>
                </div>
                <Link
                  href={`/goods/${item._id}`}
                  className={styles.moreBtn}
                >
                  Детальніше
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default PopularGoods;
