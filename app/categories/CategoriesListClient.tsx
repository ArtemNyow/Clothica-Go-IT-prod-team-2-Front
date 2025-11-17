'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/lib/api/clientApi';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '@/components/Loader/Loader';
import css from './CategoriesPage.module.css';
import { Category } from '@/types/category';

type Props = {
  dehydratedState: unknown;
};

const perPage = 10;

export default function CategoriesListClient({}: Props) {
  const [page] = useState(1);

  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ['categories', page],
    queryFn: () => getCategories(page, perPage),
  });

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1439,
  });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  const defaultVisibleCount = isDesktop ? 6 : 4;
  const [visibleCount, setVisibleCount] = useState(
    defaultVisibleCount
  );

  const handleLoadMore = () => {
    if (isMobile) setVisibleCount(p => p + 1);
    else if (isTablet) setVisibleCount(p => p + 2);
    else setVisibleCount(p => p + 3);
  };

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className={css.error}>Помилка завантаження</p>
    );

  const categories = data ?? [];
  const visibleCategories = categories.slice(
    0,
    visibleCount
  );
  const hasMore = visibleCount < categories.length;

  return (
    <section className={css.categoriesSection}>
      <div className={css.categories}>
        <h2 className={css.title}>Категорії</h2>
      </div>

      <ul className={css.CategoriesList}>
        {visibleCategories.map((category: Category) => (
          <li
            key={category._id}
            className={css.CategoriesItem}
          >
            <Link
              href={`/categories/${category._id}`}
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
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          className={css.button}
          onClick={handleLoadMore}
        >
          Показати більше
        </button>
      )}
    </section>
  );
}
