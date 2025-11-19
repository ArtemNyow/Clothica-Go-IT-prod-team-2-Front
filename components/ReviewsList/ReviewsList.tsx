'use client';
import { useRef, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Keyboard, A11y } from 'swiper/modules';
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

  const updateNavigationState = () => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
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

  const showNavigation = totalReviews >= 4;
  const swiperSlidesPerView = Math.min(totalReviews, 3);

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

      <div className={css.list}>
        <Swiper
          modules={[Keyboard, A11y]}
          slidesPerView={1}
          breakpoints={{
            375: { slidesPerView: 1 },
            768: {
              slidesPerView: Math.min(
                swiperSlidesPerView,
                2
              ),
            },
            1440: { slidesPerView: swiperSlidesPerView },
          }}
          spaceBetween={32}
          keyboard={{ enabled: true }}
          onSwiper={swiper => {
            swiperRef.current = swiper;
            updateNavigationState();
          }}
          onSlideChange={updateNavigationState}
          a11y={{ enabled: true }}
          allowTouchMove={showNavigation}
        >
          {reviews.map(review => (
            <SwiperSlide key={review._id}>
              <li className={css.listItem}>
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
                  <Link
                    href={`/categories/${review.category}`}
                    className={css.link}
                  >
                    {review.category}
                  </Link>
                </div>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {showNavigation && (
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
