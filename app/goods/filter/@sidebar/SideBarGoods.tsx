'use client';
import React, { useState } from 'react';
import { Range } from 'react-range';
import styles from './SideBarGoods.module.css';
import {
  FiltersResponse,
  SelectedFilters,
} from '@/types/filters';

interface Props {
  filters: FiltersResponse;
  selectedFilters: SelectedFilters;
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<SelectedFilters>
  >;
  totalGoods: number;
  goodsLength: number;
}

const PRICE_MIN = 0;
const PRICE_MAX = 10000;
const STEP = 50;

export default function SideBarGoods({
  filters,
  selectedFilters,
  setSelectedFilters,
  totalGoods,
  goodsLength,
}: Props) {
  const handleCategoryClick = (catId?: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      category: prev.category === catId ? undefined : catId,
    }));
  };

  const handleSizeClick = (size: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      size: prev.size.includes(size)
        ? prev.size.filter(s => s !== size)
        : [...prev.size, size],
    }));
  };

  const handleGenderClick = (gender: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      gender: prev.gender === gender ? undefined : gender,
    }));
  };

  const handleClearAll = () => {
    setSelectedFilters({
      category: undefined,
      size: [],
      gender: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });
  };

  const clearPrice = () => {
    setSelectedFilters(prev => ({
      ...prev,
      minPrice: undefined,
      maxPrice: undefined,
    }));
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>
        {selectedFilters.category
          ? filters.categories.find(
              c => c._id === selectedFilters.category
            )?.name
          : 'Всі товари'}
      </h3>

      <div className={styles.filtersHeader}>
        <span>Фільтри</span>
        <button
          onClick={handleClearAll}
          className={styles.clearBtn}
        >
          Очистити всі
        </button>
      </div>

      <div className={styles.showCount}>
        Показано {goodsLength} з {totalGoods}
      </div>

      <div className={styles.filterBlock}>
        <h4>Категорії</h4>
        <div
          className={`${styles.filterItem} ${!selectedFilters.category ? styles.selected : ''}`}
          onClick={() => handleCategoryClick(undefined)}
        >
          Усі
        </div>
        {filters.categories.map(c => (
          <div
            key={c._id}
            className={`${styles.filterItem} ${selectedFilters.category === c._id ? styles.selected : ''}`}
            onClick={() => handleCategoryClick(c._id)}
          >
            {c.name} ({c.goodsCount})
          </div>
        ))}
      </div>

      <div className={styles.filterBlock}>
        <div className={styles.filterHeader}>
          <h4>Розмір</h4>
          <button
            onClick={() =>
              setSelectedFilters(prev => ({
                ...prev,
                size: [],
              }))
            }
            className={styles.clearBtn}
          >
            Очистити
          </button>
        </div>
        <div className={styles.checkboxList}>
          {filters.sizes.map(size => {
            const checked =
              selectedFilters.size.includes(size);
            return (
              <label
                key={size}
                className={styles.checkboxLabel}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleSizeClick(size)}
                  className={styles.hiddenInput}
                />

                <span
                  className={`${styles.customCheckbox} ${checked ? styles.checked : ''}`}
                >
                  {checked && (
                    <svg
                      width="12"
                      height="10"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.5 5L4.5 8L10.5 2"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>

                <span className={styles.labelText}>
                  {size}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className={styles.filterBlock}>
        <div className={styles.filterHeader}>
          <h4>Ціна</h4>
          <button
            onClick={clearPrice}
            className={styles.clearBtn}
          >
            Очистити
          </button>
        </div>

        <div className={styles.rangeValues}>
          {selectedFilters.minPrice ?? PRICE_MIN} ₴ —{' '}
          {selectedFilters.maxPrice ?? PRICE_MAX} ₴
        </div>

        <Range
          step={STEP}
          min={PRICE_MIN}
          max={PRICE_MAX}
          values={[
            selectedFilters.minPrice ?? PRICE_MIN,
            selectedFilters.maxPrice ?? PRICE_MAX,
          ]}
          onChange={values =>
            setSelectedFilters(prev => ({
              ...prev,
              minPrice: values[0],
              maxPrice: values[1],
            }))
          }
          renderTrack={({ props, children }) => (
            <div {...props} className={styles.rangeTrack}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className={styles.rangeThumb} />
          )}
        />
      </div>

      {/* Стать (Радіокнопки) */}
      <div className={styles.filterBlock}>
        <div className={styles.filterHeader}>
          <h4>Стать</h4>
          <button
            onClick={() =>
              setSelectedFilters(prev => ({
                ...prev,
                gender: undefined,
              }))
            }
            className={styles.clearBtn}
          >
            Очистити
          </button>
        </div>
        <div className={styles.radioList}>
          {filters.genders.map(g => {
            const checked =
              selectedFilters.gender === g.value;
            return (
              <label
                key={g.value || 'all'}
                className={styles.radioLabel}
              >
                <input
                  type="radio"
                  checked={checked}
                  onChange={() =>
                    handleGenderClick(g.value)
                  }
                  className={styles.hiddenInput}
                />
                <span
                  className={`${styles.customRadio} ${checked ? styles.radioChecked : ''}`}
                />
                <span className={styles.labelText}>
                  {g.label}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
