'use client';

import { getGoodById } from '@/lib/api/clientApi';
import { useParams, useRouter } from 'next/navigation';
import css from './GoodDetails.module.css';
import Image from 'next/image';
import Link from 'next/link';

import { Good } from '@/types/goods';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useBasketStore } from '@/lib/store/basketStore';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import Loader from '@/components/Loader/Loader';

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <svg key={i} className={css.svgPrice}>
          <use href="/sprite.svg#icon-icon-star-fill"></use>
        </svg>
      );
    } else if (i - 0.5 <= rating) {
      stars.push(
        <svg key={i} className={css.svgPrice}>
          <use href="/sprite.svg#icon-icon-star-half-fill"></use>
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className={css.svgPrice}>
          <use href="/sprite.svg#icon-star-no-fill"></use>
        </svg>
      );
    }
  }

  return <div className={css.stars}>{stars}</div>;
};

export default function GoodsDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: good,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getGoodById(id),
    refetchOnMount: false,
  });

  const router = useRouter();
  const addToBasket = useBasketStore(
    state => state.addToBasket
  );
  const clearBasket = useBasketStore(
    state => state.clearBasket
  );

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <Loader />;
  if (isError || !good)
    return <div>Error loading note.</div>;

  useEffect(() => {
    if (good?.size && good.size.length > 0) {
      setSelectedSize(good.size[0]);
    }
  }, [good]);

  const basketItem = {
    _id: good._id,
    name: good.name,
    price: good.price,
    image: good.image,
    size: selectedSize,
    quantity,
    feedbackCount: good.feedbackCount,
    avgRating: good.avgRating,
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Оберіть доступний розмір!');
      return;
    }

    addToBasket(basketItem);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Оберіть доступний розмір!');
      return;
    }
    if (quantity < 1) {
      alert('Мінімальна кількість 1');
      return;
    }
    clearBasket();
    addToBasket(basketItem);
    router.push('/orders');
  };

  if (!good || !good.size || good.size.length === 0) {
    return <p>Розміри товару недоступні.</p>;
  }
  return (
    <section className={css.categoriesSection}>
      <div className={css.imageWrapper}>
        <Image
          src={good.image}
          alt={good.name}
          width={416}
          height={277}
          className={css.IMG}
        />
      </div>
      <div className={css.listSection}>
        <ul className={css.list}>
          <li className={css.link}>
            <Link href="/goods">Всі товари</Link>
          </li>
          <li className={css.link}>
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-arrow-right" />
            </svg>
          </li>
          <li className={css.link}>
            <Link href="/categories">Категорія</Link>
          </li>
          <li className={css.link}>
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-arrow-right" />
            </svg>
          </li>
          <li className={css.link}>
            <Link href={`/goods/${id}`}>{good.name}</Link>
          </li>
        </ul>

        <div className={css.titleDiv}>
          <h2 className={css.title}>{good.name}</h2>
          <div className={css.price}>
            <p className={css.textTitel}>
              {good.price.value} {good.price.currency}
            </p>

            <div className={css.rating}>
              <StarRating rating={good.avgRating ?? 0} />
              <span className={css.ratingText}>
                ({good.avgRating ?? '—'}) •{' '}
                {good.feedbackCount ?? 0} відгуків
              </span>
            </div>
          </div>
        </div>

        <p className={css.text}>
          {good.prevDescription ?? ''}
        </p>
        <div className={css.form}>
          <label className={css.text} htmlFor="size-select">
            Розмір:
          </label>

          <div className={css.formSizeDiv}>
            <CustomSelect
              value={selectedSize}
              options={good.size}
              onChange={setSelectedSize}
            />
          </div>

          <div className={css.formButtons}>
            <button
              disabled={!selectedSize}
              type="button"
              className={css.buttonBasket}
              onClick={handleAddToCart}
            >
              Додати в кошик
            </button>
            <div className={css.formCount}>
              <input
                id="quantity"
                value={quantity}
                min={1}
                onChange={e =>
                  setQuantity(Number(e.target.value))
                }
                className={css.inputQuantity}
              />
            </div>
          </div>
          <button
            type="button"
            className={css.buttonBuy}
            onClick={handleBuyNow}
          >
            Купити зараз
          </button>
          <p className={css.formText}>
            Безкоштовна доставка для замовлень від 1000 грн
          </p>
        </div>
        <div className={css.descriptionBlock}>
          <h3 className={css.descriptionTitle}>Опис</h3>
          <p className={css.descriptionText}>
            {good.description}
          </p>
        </div>

        <div className={css.characterBlock}>
          <h3 className={css.characterTitel}>
            Основні характеристики:
          </h3>
          <ul className={css.characterList}>
            {good.characteristics?.map(
              (characteristic: string) => (
                <li
                  className={css.characterItem}
                  key={characteristic}
                >
                  {characteristic}
                </li>
              )
            )}

            <li className={css.characteristicItem}>
              <strong className={css.characteristicText}>
                Доступні розміри:
              </strong>
              {good['size'][0]} -{' '}
              {good['size'][good['size'].length - 1]}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
