import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type BasketItem = {
  _id: string;
  name: string;
  price: { value: number; currency: string };
  image?: string;
  size?: string;
  quantity: number;
  feedbackCount?: number;
  avgRating?: number;
};

type BasketState = {
  items: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (id: string) => void;
  clearBasket: () => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  addTestItems: () => void;
};

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      addToBasket: item => {
        set(state => {
          const exists = state.items.find(
            i => i._id === item._id && i.size === item.size
          );
          if (exists) {
            return {
              items: state.items.map(i =>
                i._id === item._id && i.size === item.size
                  ? {
                      ...i,
                      quantity: i.quantity + item.quantity,
                    }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },

      removeFromBasket: id =>
        set(state => ({
          items: state.items.filter(i => i._id !== id),
        })),

      clearBasket: () => set({ items: [] }),

      updateQuantity: (id, quantity) =>
        set(state => ({
          items: state.items.map(i =>
            i._id === id ? { ...i, quantity } : i
          ),
        })),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) =>
            sum + item.price.value * item.quantity,
          0
        ),

      addTestItems: () => {
        set({
          items: [
            {
              _id: '6877b9f116ae59c7b60d0110',
              name: "Худі 'Active Motion Green'",
              price: { value: 1599, currency: 'грн' },
              image:
                'https://ftp.goit.study/img/goods/6877b9f116ae59c7b60d0110.webp',
              quantity: 1,
              size: 'M',
              feedbackCount: 1,
              avgRating: 5,
            },
            {
              _id: '6877b9f116ae59c7b60d0151',
              name: "Піжама 'Soft Dream Pink'",
              price: { value: 1599, currency: 'грн' },
              image:
                'https://ftp.goit.study/img/goods/6877b9f116ae59c7b60d0151.webp',
              quantity: 1,
              size: 'S',
              feedbackCount: 1,
              avgRating: 5,
            },
            {
              _id: '6877b9f116ae59c7b60d0145',
              name: "Куртка 'Softshell Active Grey'",
              price: { value: 3499, currency: 'грн' },
              image:
                'https://ftp.goit.study/img/goods/6877b9f116ae59c7b60d0145.webp',
              quantity: 1,
              size: 'L',
              feedbackCount: 1,
              avgRating: 5,
            },
            {
              _id: '6877b9f116ae59c7b60d0188',
              name: "Сукня 'Summer Bloom Yellow'",
              price: { value: 2499, currency: 'грн' },
              image:
                'https://ftp.goit.study/img/goods/6877b9f116ae59c7b60d0188.webp',
              quantity: 1,
              size: 'M',
              feedbackCount: 1,
              avgRating: 5,
            },
          ],
        });
      },
    }),

    {
      name: 'basket-storage',
    }
  )
);
