import { create } from 'zustand';

type BasketItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
};

type BasketState = {
  items: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearBasket: () => void;
};

export const useBasketStore = create<BasketState>(set => ({
  items: [],

  addToBasket: item =>
    set(state => {
      const existing = state.items.find(
        i => i.id === item.id && i.size === item.size
      );

      if (existing) {
        // Якщо товар вже є — збільшуємо кількість
        return {
          items: state.items.map(i =>
            i.id === item.id && i.size === item.size
              ? {
                  ...i,
                  quantity: i.quantity + item.quantity,
                }
              : i
          ),
        };
      }

      // Якщо такого ще немає — додаємо новий
      return { items: [...state.items, item] };
    }),

  removeFromBasket: id =>
    set(state => ({
      items: state.items.filter(i => i.id !== id),
    })),

  updateQuantity: (id, qty) =>
    set(state => ({
      items: state.items.map(i =>
        i.id === id ? { ...i, quantity: qty } : i
      ),
    })),

  clearBasket: () => set({ items: [] }),
}));
