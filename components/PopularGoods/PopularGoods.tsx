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
import { useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import type { Swiper as SwiperType } from 'swiper';

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

  const [prevEl, setPrevEl] =
    useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] =
    useState<HTMLButtonElement | null>(null);
  const [paginationEl, setPaginationEl] =
    useState<HTMLDivElement | null>(null);

  const swiperRef = useRef<SwiperType | null>(null);

  const [isPrevDisabled, setPrevDisabled] = useState(true);
  const [isNextDisabled, setNextDisabled] = useState(false);

  const updateNavState = (swiper: SwiperType) => {
    setPrevDisabled(swiper.isBeginning);
    setNextDisabled(swiper.isEnd);
  };

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
        className={styles.slider}
        breakpoints={{
          375: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1440: { slidesPerView: 4 },
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
          updateNavState(swiper);
        }}
        onSlideChange={swiper => updateNavState(swiper)}
        navigation={{
          prevEl,
          nextEl,
        }}
        pagination={{
          el: paginationEl,
          clickable: true,
          dynamicBullets: true,
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
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

      <div className={styles.controlsContainer}>
        <div
          className={styles.paginationContainer}
          ref={node => setPaginationEl(node)}
        />

        <div className={styles.navButtons}>
          <button
            ref={node => setPrevEl(node)}
            className={`${styles.navPrev} ${isPrevDisabled ? styles.disabled : ''}`}
            aria-label="Назад"
            disabled={isPrevDisabled}
          >
            <svg className={styles.iconArrow}>
              <use href="/sprite.svg#icon-arrow-back" />
            </svg>
          </button>
          <button
            ref={node => setNextEl(node)}
            className={`${styles.navNext} ${isNextDisabled ? styles.disabled : ''}`}
            aria-label="Вперед"
            disabled={isNextDisabled}
          >
            <svg className={styles.iconArrow}>
              <use href="/sprite.svg#icon-arrow-forward" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularGoods;
