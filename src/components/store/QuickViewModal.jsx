"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import VariantSelector from "@/components/store/VariantSelector";
import { getProductVariants } from "@/app/actions/stripe";

export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart, openCart } = useCartStore();
  const { addToast } = useToastStore();

  // Estados dinâmicos de stock e variantes
  const [variants, setVariants] = useState([]);
  const [isLoadingVariants, setIsLoadingVariants] = useState(true);

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const safeBasePrice = Number(product.base_price) || Number(product.price) || 0;
  const [finalPrice, setFinalPrice] = useState(safeBasePrice);

  const imageList = product.images?.length > 0 ? product.images : ["/Default.webp"];

  // Ir buscar as variantes apenas quando o modal abre
  useEffect(() => {
    if (isOpen && product?.id) {
      setIsLoadingVariants(true);
      
      getProductVariants(product.id).then((res) => {
        if (res.success && res.variants) {
          setVariants(res.variants);
          
          // Definir os valores padrão assim que os dados chegam
          setSelectedSize(product.sizes?.[0] || null);
          setSelectedColor(product.colors?.[0] || null);
          setSelectedOption(product.custom_options?.choices?.[0] || null);
        }
        setIsLoadingVariants(false);
      });
    }
  }, [isOpen, product]);

  // LÓGICA DE DERIVAÇÃO DE STOCK (Só corre quando tem as variantes)
  const colorName = typeof selectedColor === 'string' ? selectedColor : selectedColor?.name;
  const optionName = selectedOption?.label;
  
  const activeVariant = variants?.find((variant) => {
    const matchSize = variant.size === selectedSize;
    const matchColor = variant.color === colorName;
    const matchOption = optionName 
      ? variant.custom_option === optionName 
      : (variant.custom_option === null || variant.custom_option === '');

    return matchSize && matchColor && matchOption;
  });

  const currentStock = activeVariant ? activeVariant.stock_quantity : 0;
  const isOutOfStock = !isLoadingVariants && currentStock <= 0;

  useEffect(() => {
    const extraCost = Number(selectedOption?.price_modifier) || 0;
    setFinalPrice(safeBasePrice + extraCost);

    if (quantity > currentStock && currentStock > 0) {
      setQuantity(currentStock);
    } else if (currentStock === 0) {
      setQuantity(1);
    }
  }, [selectedOption, safeBasePrice, currentStock, quantity]);

  const handleAddToCart = () => {
    if (isOutOfStock || isLoadingVariants) return;

    const itemToAdd = {
      ...product,
      variant_id: activeVariant?.id,
      maxStock: currentStock,
      price: finalPrice,
      selectedVariant: {
        size: selectedSize,
        color: colorName,
        option: selectedOption?.label
      },
      quantity
    };
    
    addToCart(itemToAdd);
    onClose(); 
    openCart();
    addToast(`${product.name} added to cart`);
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

            {/* IMAGENS */}
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

            {/* DETALHES DO PRODUTO */}
            <div className="w-full md:w-1/2 h-[55%] md:h-full p-6 md:p-10 overflow-y-auto flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight leading-tight pr-8">
                {product.name}
              </h2>
              <p className="font-mono text-xl mt-3 mb-1">
                €{finalPrice.toFixed(2)} EUR
              </p>
              <p className="text-xs text-muted-foreground mb-8">Taxes included. Shipping calculated at checkout.</p>

              {/* Mostra skeleton ou os seletores */}
              {isLoadingVariants ? (
                <div className="space-y-6 flex-1 animate-pulse">
                  <div className="h-12 bg-secondary rounded-md w-3/4" />
                  <div className="h-12 bg-secondary rounded-md w-full" />
                  <div className="h-12 bg-secondary rounded-md w-2/4" />
                </div>
              ) : (
                <div className="-mt-4 flex-1">
                  <VariantSelector 
                    product={product}
                    variants={variants} 
                    selectedOption={selectedOption} setSelectedOption={setSelectedOption}
                    selectedSize={selectedSize} setSelectedSize={setSelectedSize}
                    selectedColor={selectedColor} setSelectedColor={setSelectedColor}
                  />
                  
                  {currentStock > 0 && currentStock <= 5 && (
                    <p className="text-sm text-red-500 font-medium mt-4">
                      Only {currentStock} in stock!
                    </p>
                  )}
                </div>
              )}

              {/* BOTÕES DE QUANTIDADE E COMPRA */}
              <div className="mt-auto pt-10 flex gap-4 shrink-0">
                <div className="flex items-center border border-border rounded-md px-4 py-3 shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                    className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={isOutOfStock || isLoadingVariants}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-mono">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(currentStock, quantity + 1))} 
                    className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={isOutOfStock || quantity >= currentStock || isLoadingVariants}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={handleAddToCart} 
                  disabled={isOutOfStock || isLoadingVariants}
                  className={`flex-1 text-center rounded-md text-sm uppercase tracking-wider font-medium transition-all ${
                    isLoadingVariants
                      ? "bg-secondary text-muted-foreground cursor-wait"
                      : isOutOfStock 
                        ? "bg-secondary/50 text-muted-foreground cursor-not-allowed" 
                        : "btn-primary bg-foreground text-background"
                  }`}
                >
                  {isLoadingVariants ? "Loading..." : isOutOfStock ? "Out of Stock" : "Add to cart"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}