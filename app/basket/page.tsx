'use client';

import { useEffect } from 'react';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import BasketModal from '@/components/BasketModal/BasketModal';

export default function BasketPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const openedFromUI = searchParams.get('from') === 'ui';

  useEffect(() => {
    if (!openedFromUI) {
      router.replace('/goods');
    }
  }, [openedFromUI, router]);

  return openedFromUI ? <BasketModal /> : null;
}
