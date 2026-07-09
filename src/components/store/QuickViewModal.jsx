"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import VariantSelector from "@/components/store/VariantSelector";

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart, openCart } = useCartStore();
  const { addToast } = useToastStore();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedOption, setSelectedOption] = useState(product.custom_options?.choices?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const safeBasePrice = Number(product.base_price) || Number(product.price) || 0;
  const [finalPrice, setFinalPrice] = useState(safeBasePrice);

  const imageList = product.images?.length > 0 ? product.images : ["/Default.webp"];

  useEffect(() => {
    const extraCost = Number(selectedOption?.price_modifier) || 0;
    setFinalPrice(safeBasePrice + extraCost);
  }, [selectedOption, safeBasePrice]);

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      price: finalPrice,
      selectedVariant: {
        size: selectedSize,
        color: selectedColor?.name,
        option: selectedOption?.label
      },
      quantity
    };
    
    addToCart(itemToAdd);
    onClose(); 
    openCart();
    addToast(`${product.name} adicionado ao carrinho`);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-5xl h-[85vh] md:h-[750px] bg-background rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()} 
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-background/80 backdrop-blur-md rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 h-[45%] md:h-full overflow-y-auto p-4 flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {imageList.map((img, idx) => (
                <Image 
                  key={idx} 
                  src={img} 
                  alt={`${product.name} - ${idx + 1}`} 
                  width={800} 
                  height={1000} 
                  className="w-full h-auto object-cover rounded-md bg-secondary" 
                />
              ))}
            </div>

            <div className="w-full md:w-1/2 h-[55%] md:h-full p-6 md:p-10 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight leading-tight pr-8">
                {product.name}
              </h2>
              <p className="font-mono text-xl mt-3 mb-1">
                €{finalPrice.toFixed(2)} EUR
              </p>
              <p className="text-xs text-muted-foreground mb-8">Taxes included. Shipping calculated at checkout.</p>

              <div className="-mt-4">
                <VariantSelector 
                  product={product}
                  selectedOption={selectedOption} setSelectedOption={setSelectedOption}
                  selectedSize={selectedSize} setSelectedSize={setSelectedSize}
                  selectedColor={selectedColor} setSelectedColor={setSelectedColor}
                />
              </div>

              <div className="mt-auto pt-10 flex gap-4 shrink-0">
                <div className="flex items-center border border-border rounded-md px-4 py-3 shrink-0">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-muted-foreground hover:text-foreground">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-mono">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="text-muted-foreground hover:text-foreground">
                    <Plus size={16} />
                  </button>
                </div>
                
                <button onClick={handleAddToCart} className="btn-primary flex-1 text-center bg-foreground text-background rounded-md text-sm uppercase tracking-wider font-medium">
                  Add to cart
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}