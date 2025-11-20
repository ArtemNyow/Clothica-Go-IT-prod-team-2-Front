'use client';
import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
// Імпортуйте стилі Swiper, якщо вони ще не підключені глобально
import 'swiper/css';
import 'swiper/css/navigation';
import { Keyboard, A11y, Navigation } from 'swiper/modules'; // Додав Navigation модуль явно
import Link from 'next/link';
import css from './ReviewsList.module.css';
import { Review } from '@/types/review';
import { fetchReviews } from '@/lib/api/clientApi';
import Loader from '../Loader/Loader';
import NoGoodReviews from '../GoodReviews/NoGoodReviews';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <svg key={i} className={css.star}>
          <use href="/sprite.svg#icon-icon-star-fill"></use>
        </svg>
      );
    } else if (i - 0.5 <= rating) {
      stars.push(
        <svg key={i} className={css.star}>
          <use href="/sprite.svg#icon-icon-star-half-fill"></use>
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className={css.star}>
          <use href="/sprite.svg#icon-star-no-fill"></use>
        </svg>
      );
    }
  }
  return <div className={css.rating}>{stars}</div>;
};

type ReviewsListProps = {
  id?: string;
  title?: string;
  showAddButton?: boolean;
  onOpenModal?: () => void;
};

const ReviewsList = ({
  id,
  title = 'Останні відгуки',
  showAddButton,
  onOpenModal,
}: ReviewsListProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    data = [],
    error,
    isLoading,
    isError,
  } = useQuery<Review[]>({
    queryKey: id ? ['reviews', id] : ['reviews'],
    queryFn: () => fetchReviews(id),
  });

  const reviews = Array.isArray(data) ? data : [];
  const totalReviews = reviews.length;

  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const updateNavigationState = (swiper: any) => {
    if (swiper) {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
      setIsLocked(swiper.isLocked);
    }
  };

  const handlePrevClick = () => {
    if (swiperRef.current && !isBeginning)
      swiperRef.current.slidePrev();
  };
  const handleNextClick = () => {
    if (swiperRef.current && !isEnd)
      swiperRef.current.slideNext();
  };

  if (isLoading) return <Loader />;
  if (isError)
    return <p>Помилка: {(error as Error).message}</p>;
  if (!mounted) return null;

  if (totalReviews === 0) {
    return (
      <div className={css.NoContextWrap}>
        <NoGoodReviews onOpenModal={onOpenModal} />
      </div>
    );
  }

  // Використовуємо цей стиль, щоб переконатися, що контейнер слайдера має правильну ширину
  // Це часто вирішує проблему "одне на одному"
  const swiperContainerStyle = {
    width: '100%',
    position: 'relative' as const,
  };

  return (
    <div className={css.container}>
      <div className={css.buttonWrapper}>
        <h2 className={css.title}>{title}</h2>
        {showAddButton && (
          <button
            className={`${css.addButton} ButtonGreen`}
            onClick={onOpenModal}
          >
            Залишити відгук
          </button>
        )}
      </div>

      {/* Важливо: прибрати className={css.list} якщо там є display: flex */}
      <div style={swiperContainerStyle}>
        <Swiper
          modules={[Keyboard, A11y, Navigation]}
          // observer та observeParents критичні, коли контент завантажується асинхронно
          // це змушує swiper перерахувати розміри і прибирає накладання
          observer={true}
          observeParents={true}
          watchOverflow={true}
          spaceBetween={32}
          keyboard={{ enabled: true }}
          a11y={{ enabled: true }}
          onSwiper={swiper => {
            swiperRef.current = swiper;
            updateNavigationState(swiper);
          }}
          onSlideChange={swiper =>
            updateNavigationState(swiper)
          }
          onResize={swiper => updateNavigationState(swiper)}
          onLock={swiper => updateNavigationState(swiper)}
          onUnlock={swiper => updateNavigationState(swiper)}
          // Логіка відображення:
          breakpoints={{
            // Мобільні (до 768px): завжди 1 слайд
            320: {
              slidesPerView: 1,
            },
            // Планшет (від 768px):
            // Якщо відгуків >= 2, показуємо 2. Якщо лише 1, показуємо 1 (на всю ширину або як налаштовано)
            768: {
              slidesPerView: Math.min(totalReviews, 2),
            },
            // Десктоп (від 1440px):
            // Максимум 3. Але якщо відгуків 2, покаже 2 (широких).
            1440: {
              slidesPerView: Math.min(totalReviews, 3),
            },
          }}
        >
          {reviews.map(review => (
            <SwiperSlide
              key={review._id}
              style={{ height: 'auto' }}
            >
              {/* li замінено на div або переконайтеся, що css.listItem має width: 100% */}
              <div
                className={css.listItem}
                style={{ height: '100%' }}
              >
                <div className={css.descContainer}>
                  <StarRating rating={review.rate} />
                  <p className={css.text}>
                    {review.description}
                  </p>
                </div>
                <div className={css.authorContainer}>
                  <h3 className={css.author}>
                    {review.author}
                  </h3>
                  {!showAddButton && (
                    <Link
                      href={`/goods?category=${review.categoryId}`}
                      className={css.link}
                    >
                      {review.category}
                    </Link>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {!isLocked && (
        <div className={css.btnContainer}>
          <button
            className={`${css.navBtn} ${isBeginning ? css.disabled : ''}`}
            onClick={handlePrevClick}
            disabled={isBeginning}
          >
            <svg>
              <use href="/sprite.svg#icon-arrow-back"></use>
            </svg>
          </button>
          <button
            className={`${css.navBtn} ${isEnd ? css.disabled : ''}`}
            onClick={handleNextClick}
            disabled={isEnd}
          >
            <svg>
              <use href="/sprite.svg#icon-arrow-forward"></use>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
