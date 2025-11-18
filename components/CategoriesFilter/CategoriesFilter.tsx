'use client';

interface Props {
  categories: string[];
  selected?: string;
  onSelect: (category: string) => void;
}

export default function CategoriesFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-xl border transition ${
            selected === cat
              ? 'bg-black text-white border-black'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
