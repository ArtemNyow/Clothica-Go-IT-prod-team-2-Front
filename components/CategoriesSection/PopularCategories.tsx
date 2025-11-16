import { getCategories } from '@/lib/api/clientApi';
import PopularCategoriesClient from './PopularCategoriesClient';

export default async function PopularCategoriesServer() {
  const categories = await getCategories(1, 10);

  return (
    <PopularCategoriesClient categories={categories} />
  );
}
