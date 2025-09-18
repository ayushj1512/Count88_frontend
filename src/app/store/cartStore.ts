import { create } from "zustand";
import { fetchCoupons } from "../utils/fetchCoupons";

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  regular?: number;
  colors?: string[];
  size?: string;
  quantity: number;
}

interface Coupon {
  code: string;
  discountType: "PERCENTAGE" | "FLAT";
  discountValue: number;
  isActive: boolean;
  minOrderAmount: number;
  maxDiscount?: number;
  startDate: string;
  expiryDate: string;
  usedCount: number;
  usageLimit?: number | null;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  coupon: string;
  appliedCoupon?: Coupon;

  applyCoupon: (code: string) => Promise<void>;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, size?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string) => void;
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
  appliedCoupon: undefined,

  // ✅ Apply coupon with debug logs
  applyCoupon: async (code) => {
    console.log("[CartStore] Applying coupon:", code);

    try {
      const coupons: Coupon[] = await fetchCoupons();
      console.log("[CartStore] Coupons fetched from API:", coupons);

      const coupon = coupons.find(
        (c) =>
          c?.code &&
          c.code.toLowerCase() === code.toLowerCase() &&
          c.isActive &&
          new Date(c.startDate) <= new Date() &&
          new Date(c.expiryDate) >= new Date() &&
          (!c.usageLimit || c.usedCount < c.usageLimit)
      );

      console.log("[CartStore] Matched coupon:", coupon);

      if (!coupon) {
        console.warn("[CartStore] Coupon invalid or expired");
        alert("Coupon is invalid or expired");
        set({ coupon: "", appliedCoupon: undefined });
        return;
      }

      const subtotal = get().subtotal();
      console.log("[CartStore] Cart subtotal:", subtotal);
      if (subtotal < coupon.minOrderAmount) {
        console.warn(
          `[CartStore] Minimum order amount not met. Required: ₹${coupon.minOrderAmount}`
        );
        alert(`Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`);
        set({ coupon: "", appliedCoupon: undefined });
        return;
      }

      set({ coupon: coupon.code, appliedCoupon: coupon });
      console.log("[CartStore] Coupon applied successfully:", coupon.code);
    } catch (err) {
      console.error("[CartStore] Error applying coupon:", err);
      alert("Failed to apply coupon. Check console for details.");
      set({ coupon: "", appliedCoupon: undefined });
    }
  },

  addToCart: (product) => {
    set((state) => {
      const index = state.items.findIndex(
        (item) => item.id === product.id && item.size === product.size
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
        (item) => !(item.id === id && item.size === size)
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
    if (typeof window !== "undefined") localStorage.removeItem("cart");
    set(() => ({ items: [], coupon: "", appliedCoupon: undefined }));
  },

  loadCart: () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("cart");
        const parsed = stored ? JSON.parse(stored) : [];
        if (Array.isArray(parsed)) set(() => ({ items: parsed }));
        else throw new Error("Cart data is not an array");
      } catch (error) {
        console.error("Failed to load cart:", error);
        set(() => ({ items: [] }));
      }
    }
  },

  subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

  discount: () => {
    const coupon = get().appliedCoupon;
    const subtotal = get().subtotal();
    if (!coupon) return 0;

    let discount = 0;
    if (coupon.discountType === "PERCENTAGE") {
      discount = (subtotal * coupon.discountValue) / 100;
      if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
    } else if (coupon.discountType === "FLAT") {
      discount = coupon.discountValue;
    }

    return Math.min(discount, subtotal);
  },

  shipping: () => {
    const subtotalAfterDiscount = get().subtotal() - get().discount();
    return subtotalAfterDiscount >= 500 ? 0 : 60;
  },

  total: () => {
    const subtotal = get().subtotal();
    const discount = get().discount();
    const shipping = get().shipping();
    return subtotal - discount + shipping;
  },
}));

export type { CartItem, Coupon };
