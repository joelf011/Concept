"use client";
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const generateCartItemId = (product) => {
  const size = product.selectedVariant?.size || 'no-size';
  const color = product.selectedVariant?.color || 'no-color';
  const option = product.selectedVariant?.option || 'no-option';
  
  return `${product.id}-${size}-${color}-${option}`;
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addToCart: (product) => {
        const { items } = get();
        const cartItemId = generateCartItemId(product);
        const quantityToAdd = product.quantity || 1; 

        const existing = items.find((item) => item.cartItemId === cartItemId);
        
        if (existing) {
          set({
            items: items.map((item) =>
              item.cartItemId === cartItemId 
                ? { ...item, quantity: item.quantity + quantityToAdd } 
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, cartItemId, quantity: quantityToAdd }] });
        }
      },

      removeFromCart: (cartItemId) =>
        set((state) => ({ 
          items: state.items.filter((item) => item.cartItemId !== cartItemId) 
        })),

      increaseQuantity: (cartItemId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (cartItemId) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.cartItemId === cartItemId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'concept-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);