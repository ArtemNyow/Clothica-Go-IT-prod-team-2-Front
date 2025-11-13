'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Good } from '@/types/goods';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];

  addToCart: (
    good: Good,
    size: string,
    quantity: number
  ) => void;
  buyNow: (
    good: Good,
    size: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (good, size, quantity) => {
        const item: CartItem = {
          _id: good._id,
          name: good.name,
          price: good.price.value,
          size,
          quantity,
          image: good.image,
        };

        set(state => ({
          cart: [...state.cart, item],
        }));
      },

      buyNow: (good, size, quantity) => {
        const item: CartItem = {
          _id: good._id,
          name: good.name,
          price: good.price.value,
          size,
          quantity,
          image: good.image,
        };

        // Якщо кошик порожній → кладемо товар
        if (get().cart.length === 0) {
          set({ cart: [item] });
        }

        // Якщо кошик вже є → нічого не додаємо
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
