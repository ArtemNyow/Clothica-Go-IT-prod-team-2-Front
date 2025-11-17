import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { getGoodById } from '@/lib/api/clientApi';
import GoodsDetailsClient from './GoodDetailsClient';

type PageDetailsPageProps = {
  params: Promise<{ id: string }>;
};
export default async function GoodByIdPage({
  params,
}: PageDetailsPageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['product', id],
    queryFn: () => getGoodById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <GoodsDetailsClient />
    </HydrationBoundary>
  );
}
