export interface FiltersResponse {
  categories: CategoryItem[];
  sizes: string[];
  genders: { label: string; value: string }[];
}

export interface SelectedFilters {
  category?: string;
  size: string[];
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CategoryItem {
  _id: string;
  name: string;
  image: string;
  goodsCount: number;
  availableSizes?: string[];
}
