'use client';
import { getCategories } from '@/lib/api/clientApi';

import Link from 'next/link';
import Image from 'next/image';
import css from './PopularCategories.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Category } from '@/types/category';
import { useQuery } from '@tanstack/react-query';

interface Props {
  categories: Category[];
}

function PopularCategories() {
  const {
    data = [],
    error,
    isLoading,
    isError,
  } = useQuery<Category[]>({
    queryKey: ['category'],
    queryFn: () => getCategories(1, 10),
  });

  const categories = Array.isArray(data) ? data : [];
  return (
    <section
      className={css.categoriesSection}
      id="PopularCategories"
    >
      <div className={css.categories}>
        <h2 className={css.title}>Популярні категорії</h2>
        <div className={css.buttonLink}>
          <Link href="/categories" className={css.button}>
            Всі категорії
          </Link>
        </div>
      </div>

      <div className={css.categoriesContainer}>
        <ul className={css.CategoriesList}>
          <Swiper
            modules={[Navigation, Keyboard, A11y]}
            spaceBetween={32}
            slidesPerView={1}
            navigation={{
              prevEl: `.${css.prevButton}`,
              nextEl: `.${css.nextButton}`,
              disabledClass: css.disabledButton,
            }}
            keyboard={{ enabled: true }}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 32 },
              1440: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className={css.categoriesSwiper}
          >
            {categories.map(category => (
              <SwiperSlide key={category._id}>
                <Link
                  href={`/goods?category=${category._id}`}
                  className={css.CategoriesLink}
                >
                  <div className={css.imageWrapper}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={416}
                      height={277}
                      className={css.categoriesIMG}
                    />
                  </div>
                  <p className={css.categoriesText}>
                    {category.name}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>

      <div className={css.swiperButtons}>
        <button className={css.prevButton}>
          <svg>
            <use href="/sprite.svg#icon-arrow-back" />
          </svg>
        </button>
        <button className={css.nextButton}>
          <svg>
            <use href="/sprite.svg#icon-arrow-forward" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default PopularCategories;
