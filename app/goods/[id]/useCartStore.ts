'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Good } from '@/types/goods';

export interface CartItem {
  _id: string;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
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
          image: good.image,
          price: good.price.value,
          size,
          quantity,
        };

        set(state => ({
          cart: [...state.cart, item],
        }));
      },

      buyNow: (good, size, quantity) => {
        const item: CartItem = {
          _id: good._id,
          name: good.name,
          image: good.image,
          price: good.price.value,
          size,
          quantity,
        };

        // Якщо корзина пуста — просто додаємо
        if (get().cart.length === 0) {
          set({ cart: [item] });
        }

        // Якщо НЕ пуста — нічого не додаємо (тільки перехід)
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'cart-storage', // ключ в localStorage
    }
  )
);
