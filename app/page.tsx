import Hero from '@/components/Hero/Hero';
import PopularCategories from '@/components/CategoriesSection/PopularCategories';
import ReviewsList from '@/components/ReviewsList/ReviewsList';

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <Hero />
        <PopularCategories />
        <ReviewsList />
      </main>
    </>
  );
}
