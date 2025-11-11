'use client';

import Image from 'next/image';
import styles from './page.module.css';
import Hero from '@/components/Hero/Hero';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import PopularCategories from '@/components/CategoriesSection/PopularCategories';
import Link from 'next/link';
import StyleFeatures from '@/components/StyleFeatures/StyleFeatures';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Hero />
       <ReviewsList />
      <StyleFeatures />
      <PopularCategories />
    </main>
  );
}
