import Hero from '@/components/Hero/Hero';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import PopularCategories from '@/components/CategoriesSection/PopularCategories';
import StyleFeatures from '@/components/StyleFeatures/StyleFeatures';
import PopularGoods from '@/components/PopularGoods/PopularGoods';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Hero />
      <StyleFeatures />
      <PopularCategories />
      <PopularGoods />
      <ReviewsList />
    </main>
  );
}
