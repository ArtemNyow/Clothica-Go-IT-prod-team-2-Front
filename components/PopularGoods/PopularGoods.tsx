'use client';

import { Good } from '@/types/goods';
import { getGoodsByFeedback } from '@/lib/api/clientApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './PopularGoods.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import Loader from '../Loader/Loader';

const PopularGoods = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Good[]>({
    queryKey: ['goods'],
    queryFn: () => getGoodsByFeedback(),
  });

  const goods = Array.isArray(data) ? data : [];

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const updatePaginationPosition = () => {
      if (!paginationRef.current) return;
      if (window.innerWidth < 768) {
        paginationRef.current.style.display = 'flex';
        paginationRef.current.style.justifyContent =
          'flex-start';
        paginationRef.current.style.left = '20px';
        paginationRef.current.style.transform = 'none';
      } else {
        paginationRef.current.style.justifyContent =
          'center';
        paginationRef.current.style.left = '50%';
        paginationRef.current.style.transform =
          'translateX(-50%)';
      }
    };

    window.addEventListener(
      'resize',
      updatePaginationPosition
    );
    updatePaginationPosition();

    return () =>
      window.removeEventListener(
        'resize',
        updatePaginationPosition
      );
  }, []);

  if (isLoading) return <Loader />;
  if (isError || goods.length === 0) return null;

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
        breakpoints={{
          375: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1440: { slidesPerView: 4 },
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
          el: paginationRef.current,
          bulletClass: styles.bullet,
          bulletActiveClass: styles.bulletActive,
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

      <div className={styles.paginationWrapper}>
        <div
          ref={paginationRef}
          className={`swiper-pagination ${styles.pagination}`}
          suppressHydrationWarning
        ></div>
      </div>

      <div className={styles.navButtons}>
        <button
          ref={prevRef}
          className={styles.navPrev}
          aria-label="Назад"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <svg className={styles.iconArrow}>
            <use href="/sprite.svg#icon-arrow-back" />
          </svg>
        </button>
        <button
          ref={nextRef}
          className={styles.navNext}
          aria-label="Вперед"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <svg className={styles.iconArrow}>
            <use href="/sprite.svg#icon-arrow-forward" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default PopularGoods;
