export interface Good {
  _id: string;
  name: string;
  image: string;
  price: {
    value: number;
    currency?: string;
  };
  size?: string[];
  description?: string;
  feedbacks?: Feedback[];
  prevDescription?: string;
  gender?: string;
  characteristics?: string[];
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

export type Feedback = {
  _id: string;
  author: string;
  date: string;
  description: string;
  rate: number;
  category: string;
  goodId: string;
};
