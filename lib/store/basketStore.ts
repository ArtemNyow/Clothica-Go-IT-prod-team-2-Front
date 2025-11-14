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

  isBasketOpen: boolean;
  openBasket: () => void;
  closeBasket: () => void;

  totalQuantity: () => number;
};

export const useBasketStore = create<BasketState>(
  (set, get) => ({
    items: [],

    addToBasket: (item: BasketItem) =>
      set(state => {
        const existing = state.items.find(
          i => i.id === item.id && i.size === item.size
        );

        if (existing) {
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

        return { items: [...state.items, item] };
      }),

    removeFromBasket: (id: string) =>
      set(state => ({
        items: state.items.filter(i => i.id !== id),
      })),

    updateQuantity: (id: string, qty: number) =>
      set(state => ({
        items: state.items.map(i =>
          i.id === id ? { ...i, quantity: qty } : i
        ),
      })),

    clearBasket: () => set({ items: [] }),

    isBasketOpen: false,
    openBasket: () => set({ isBasketOpen: true }),
    closeBasket: () => set({ isBasketOpen: false }),

    totalQuantity: () =>
      get().items.reduce(
        (sum: number, item: BasketItem) =>
          sum + item.quantity,
        0
      ),
  })
);
