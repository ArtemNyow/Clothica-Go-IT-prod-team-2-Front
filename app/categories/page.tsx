import { getCategories } from '@/lib/api/clientApi';
import CategoriesListClient from '../../app/categories/CategoriesListClient';
import {
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { dehydrate } from '@tanstack/react-query';

export default async function CategoryPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(1, 10),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CategoriesListClient
        dehydratedState={dehydratedState}
      />
    </HydrationBoundary>
  );
}
