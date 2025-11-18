export interface Review {
  _id: string;
  goodId: string;
  category: string;
  author: string;
  rate: number;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}
export interface fetchReviewsResponse {
  page: number;
  perPage: number;
  totalFeedbacks: number;
  totalPages: number;
  feedbacks: Review[];
}
export interface ReviewRequestBody {
  goodId: string;
  author: string;
  rate: number;
  description: string;
}
