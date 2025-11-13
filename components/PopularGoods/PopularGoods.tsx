import { Good } from '@/types/goods';
import GoodsSwiper from './GoodsSwiper';
import { getGoodsByFeedback } from '@/lib/api/clientApi';

export default async function PopularGoods() {
  const goods: Good[] = await getGoodsByFeedback();
  return <GoodsSwiper goods={goods} />;
}
