"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import QuickViewModal from "@/components/store/QuickViewModal";

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const hasValidImageArray = Array.isArray(product.images) && product.images.length > 0;
  const [currentImage, setCurrentImage] = useState(
    hasValidImageArray ? product.images[0] : "/Default.webp"
  );
  
  const displayPrice = Number(product.base_price) || Number(product.price) || 0;

  // Lógica para verificar se o produto está totalmente esgotado
  // Verifica se o array de variantes existe e se TODAS têm stock a zeros
  const isCompletelyOutOfStock = product.product_variants?.length > 0 && 
    product.product_variants.every(variant => variant.stock_quantity <= 0);

  const handleMouseEnter = () => {
    if (hasValidImageArray && product.images.length > 1) {
      setCurrentImage(product.images[1]);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImage(hasValidImageArray ? product.images[0] : "/Default.webp");
  };

  return (
    <div className="group block relative">
      <div 
        className="relative aspect-[4/5] overflow-hidden bg-secondary rounded-md mb-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={`/product/${product.id}`} className="absolute inset-0 z-0">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            // Se estiver esgotado, aplica um efeito visual para o utilizador perceber logo
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
              isCompletelyOutOfStock ? 'opacity-80 grayscale-[50%]' : ''
            }`}
          />
        </Link>

        {/* Badge de "Esgotado" visível apenas quando stock total é nulo */}
        {isCompletelyOutOfStock && (
          <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm text-foreground text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
            Sold Out
          </div>
        )}

        {/* Esconde o botão de Quick View se estiver totalmente esgotado */}
        {!isCompletelyOutOfStock && (
          <motion.button
            className="absolute bottom-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-foreground text-background shadow-lg opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} strokeWidth={2} />
          </motion.button>
        )}
      </div>

      <Link href={`/product/${product.id}`} className="block cursor-pointer">
        <p className="text-xs text-muted-foreground mb-1 font-mono uppercase">
          {product.category || "Clothing"}
        </p>
        <h3 className="font-medium text-foreground leading-tight group-hover:underline underline-offset-4">
          {product.name}
        </h3>
        <p className="mt-2 font-mono text-sm">
          FROM €{displayPrice.toFixed(2)} EUR
        </p>
      </Link>

      {/* Renderiza o modal apenas se o produto estiver disponível */}
      {!isCompletelyOutOfStock && (
        <QuickViewModal 
          product={product} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}