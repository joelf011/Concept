"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus } from "lucide-react"; 
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";

// Componentes extraídos
import ProductGallery from "@/components/store/ProductGallery";
import VariantSelector from "@/components/store/VariantSelector";
import ProductAccordions from "@/components/store/ProductAccordions";
import TrustBadges from "@/components/store/TrustBadges";

export default function ProductDetailClient({ product }) {
  const { addToCart, openCart } = useCartStore();
  const { addToast } = useToastStore();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [selectedOption, setSelectedOption] = useState(product.custom_options?.choices?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const safeBasePrice = Number(product.base_price) || Number(product.price) || 0;
  const [finalPrice, setFinalPrice] = useState(safeBasePrice);

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
    openCart();
    addToast(`${product.name} adicionado ao carrinho`);
  };

  return (
    <div className="pt-24 md:pt-32 pb-24 md:pb-36">
      <div className="px-[8vw]">
        
        {/* BREADCRUMBS */}
        <div className="flex items-center gap-2 mb-10 text-xs text-muted-foreground font-mono uppercase tracking-[0.1em]">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          
          {/* COLUNA DA IMAGEM */}
          <ProductGallery 
            images={product.images} 
            defaultImage={product.images[0]} 
            productName={product.name} 
          />

          {/* COLUNA DOS DETALHES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-[-0.04em] leading-[0.9]">
              {product.name}
            </h1>
            <p className="font-mono text-xl mt-4">
              €{finalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Taxes included. Shipping calculated at checkout.</p>

            <VariantSelector 
              product={product}
              selectedOption={selectedOption} setSelectedOption={setSelectedOption}
              selectedSize={selectedSize} setSelectedSize={setSelectedSize}
              selectedColor={selectedColor} setSelectedColor={setSelectedColor}
            />

            {/* Quantidade e Adicionar ao Carrinho */}
            <div className="flex gap-4 mt-12 mb-16">
              <div className="flex items-center border border-border rounded-md px-4 py-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-muted-foreground hover:text-foreground">
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-mono">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-muted-foreground hover:text-foreground">
                  <Plus size={16} />
                </button>
              </div>
              
              <button onClick={handleAddToCart} className="btn-primary flex-1 text-center bg-foreground text-background rounded-md">
                Add to cart
              </button>
            </div>

            <ProductAccordions product={product} selectedColor={selectedColor} />
            
          </motion.div>
        </div>

        <TrustBadges />

      </div>
    </div>
  );
}