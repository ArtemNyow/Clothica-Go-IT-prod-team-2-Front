import Hero from '@/components/Hero/Hero';
import PopularCategories from '@/components/CategoriesSection/PopularCategories';

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <Hero />
        <PopularCategories />
      </main>
    </>
  );
}
