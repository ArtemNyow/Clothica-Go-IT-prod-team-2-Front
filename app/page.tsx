import Hero from '@/components/Hero/Hero';
import ReviewsList from '@/components/ReviewsList/ReviewsList';
import PopularCategories from '@/components/CategoriesSection/PopularCategories';
import StyleFeatures from '@/components/StyleFeatures/StyleFeatures';
import PopularGoods from '@/components/PopularGoods/PopularGoods';
import GoodReviews from '@/components/GoodReviews/GoodReviews';

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <Hero />
      <GoodReviews />
      <StyleFeatures />
      <PopularCategories />
      <PopularGoods />
      <ReviewsList />
    </main>
  );
}
