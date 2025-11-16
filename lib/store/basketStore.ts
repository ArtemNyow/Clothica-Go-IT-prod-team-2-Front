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
    }),
    {
      name: 'basket-storage',
    }
  )
);
