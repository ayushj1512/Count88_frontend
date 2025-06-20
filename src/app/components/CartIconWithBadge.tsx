"use client";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";

type Props = {
  onClick: () => void;
};

export default function CartIconWithBadge({ onClick }: Props) {
  const items = useCartStore((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <FaShoppingCart className="text-2xl" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}
