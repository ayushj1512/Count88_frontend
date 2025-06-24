"use client";

import React from "react";
import { useCartStore } from "../store/cartStore";
import toast from "react-hot-toast";

interface Product {
    id: string;
    title: string;
    image: string;
    price: number;
    regular?: number;
    colors?: string[];
}

interface ProductCardProps {
    product: Product;
    onClick?: () => void; // Optional: for showing detail on card click
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const toggleCart = useCartStore((state) => state.toggleCart);

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.title} added to cart`);
        toggleCart(true);
    };

    return (
        <div
            className="min-w-[250px] flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer border"
            onClick={onClick}
        >
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-cover rounded-t-xl"
            />
            <div className="p-4 space-y-3">
                <h3 className="text-md font-semibold text-gray-800 text-center">
                    {product.title}
                </h3>

                <div className="flex justify-center items-center space-x-2">
                    <span className="text-red-600 text-sm font-bold">₹{product.price}</span>
                    {product.regular && (
                        <span className="text-gray-400 line-through">₹{product.regular}</span>
                    )}
                </div>

                {(product.colors?.length ?? 0) > 0 && (
                    <div className="flex justify-center gap-1 pt-1">
                        {(product.colors ?? []).map((color, idx) => (
                            <span
                                key={idx}
                                className="w-5 h-5 rounded-full border shadow-sm"
                                style={{
                                    backgroundColor: color === "transparent" ? "#ccc" : color,
                                }}
                                title={color}
                            />
                        ))}
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation(); // prevent onClick propagation
                        handleAddToCart();
                    }}
                    className="w-full mt-2 py-2 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
