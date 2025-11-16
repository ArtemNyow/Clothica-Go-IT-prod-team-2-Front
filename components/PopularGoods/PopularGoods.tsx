import { getGoodsByFeedback } from '@/lib/api/clientApi';
import PopularGoodsClient from './PopularGoodsClient';

const PopularGoods = async () => {
  // серверний запит
  const goods = await getGoodsByFeedback();

  if (!goods || goods.length === 0) return null;

  return <PopularGoodsClient goods={goods} />;
};

export default PopularGoods;
