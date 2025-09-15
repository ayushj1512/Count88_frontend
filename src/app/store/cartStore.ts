import { create } from "zustand";

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  regular?: number;
  colors?: string[];
  size?: string; // ✅ added size support
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  coupon: string;

  applyCoupon: (code: string) => void;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, size?: string) => void; // ✅ handle size in removal
  updateQuantity: (id: string, quantity: number, size?: string) => void; // ✅ handle size in update
  toggleCart: (open?: boolean) => void;
  clearCart: () => void;
  loadCart: () => void;

  subtotal: () => number;
  discount: () => number;
  shipping: () => number;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  coupon: "",

  applyCoupon: (code) => {
    set({ coupon: code.toLowerCase() });
  },

  addToCart: (product) => {
    set((state) => {
      const index = state.items.findIndex(
        (item) => item.id === product.id && item.size === product.size // ✅ differentiate by size
      );

      const updatedItems = [...state.items];

      if (index !== -1) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity + 1,
        };
      } else {
        updatedItems.push({ ...product, quantity: 1 });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedItems));
      }

      return { items: updatedItems, isOpen: true };
    });
  },

  removeFromCart: (id, size) => {
    set((state) => {
      const updatedItems = state.items.filter(
        (item) => !(item.id === id && item.size === size) // ✅ remove correct size
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedItems));
      }
      return { items: updatedItems };
    });
  },

  updateQuantity: (id, quantity, size) => {
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedItems));
      }
      return { items: updatedItems };
    });
  },

  toggleCart: (open = false) => {
    set(() => ({ isOpen: open }));
  },

  clearCart: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    set(() => ({ items: [], coupon: "" }));
  },

  loadCart: () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cart");
        const parsed = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) {
          set(() => ({ items: parsed }));
        } else {
          throw new Error("Cart data is not an array");
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
        set(() => ({ items: [] }));
      }
    }
  },

  subtotal: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  discount: () => {
    const coupon = get().coupon;
    const subtotal = get().subtotal();
    return coupon === "craftra10" ? Math.floor(subtotal * 0.1) : 0;
  },

  shipping: () => {
    const subtotal = get().subtotal();
    const discount = get().discount();
    const afterDiscount = subtotal - discount;
    return afterDiscount >= 500 ? 0 : 60;
  },

  total: () => {
    const subtotal = get().subtotal();
    const discount = get().discount();
    const shipping = get().shipping();
    return subtotal - discount + shipping;
  },
}));

export type { CartItem };
