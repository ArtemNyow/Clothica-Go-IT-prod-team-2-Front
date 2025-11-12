 export interface Good {
  _id: string;
  name: string;
  image: string;
  price: {
    value: number;
    currency?: string;
  };
  avgRating?: number;
  feedbackCount?: number;
}

 export interface GetGoodsParams {
  page?: number;
  perPage?: number;
  category?: string;
  gender?: string;
  size?: string[];
  minPrice?: number;
  maxPrice?: number;
}