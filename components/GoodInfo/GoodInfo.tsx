

import { Good } from '@/types/goods';

export default function GoodInfo({ good }: { good: Good }) {
  return (
    <div className="border rounded-2xl shadow-sm p-4 flex flex-col gap-2">
      <img
        src={good.image}
        alt={good.name}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold">{good.name}</h3>
      <p className="text-gray-500">{good.price.value} {good.price.currency || '₴'}</p>
      {good.avgRating !== undefined && (
        <p className="text-sm text-gray-400">⭐ {good.avgRating} ({good.feedbackCount || 0})</p>
      )}
    </div>
  );
}
