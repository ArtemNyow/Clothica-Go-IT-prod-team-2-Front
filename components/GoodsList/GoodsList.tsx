import GoodInfo from '../GoodInfo/GoodInfo';
import { Good } from '@/types/goods';

export default function GoodsList({ goods }: { goods: Good[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {goods.map(good => <GoodInfo key={good._id} good={good} />)}
    </div>

  );
}
