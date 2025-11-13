import { getCategories } from '@/lib/api/clientApi';
import { Category } from '@/types/category';
import CategorySwiper from './CategorySwiper';

export default async function PopularCategories() {
  const categories: Category[] = await getCategories(1, 10);

  return <CategorySwiper categories={categories} />;
}
