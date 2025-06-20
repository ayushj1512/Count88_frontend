// store/cartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  regular?: number;
  colors?: string[];
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  toggleCart: (open?: boolean) => void;
  clearCart: () => void;
  loadCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,

  addToCart: (product) => {
    set((state) => {
      const index = state.items.findIndex((item) => item.id === product.id);
      let updatedItems = [...state.items];

      if (index !== -1) {
        updatedItems[index].quantity += 1;
      } else {
        updatedItems.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems, isOpen: true };
    });
  },

  removeFromCart: (id) => {
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return { items: updatedItems };
    });
  },

  toggleCart: (open) => {
    set(() => ({ isOpen: open ?? false }));
  },

  clearCart: () => {
    localStorage.removeItem('cart');
    set(() => ({ items: [] }));
  },

  loadCart: () => {
    const stored = localStorage.getItem('cart');
    const parsed = stored ? JSON.parse(stored) : [];
    set(() => ({ items: parsed }));
  },
}));
