"use client";

import React, { useState } from "react";
import ProductCard from "@/components/store/ProductCard";
import { motion } from "framer-motion";

export default function ShopClient({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 md:pt-36 pb-24 md:pb-36">
      <div className="px-[8vw]">
        <div className="mb-16">
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-[-0.04em] leading-[0.9]">
            All Collection
          </h1>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-8 mb-16 border-b border-border overflow-x-auto whitespace-nowrap hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative pb-4 font-mono text-xs uppercase tracking-[0.1em] transition-all duration-300"
              style={{
                color: activeCategory === cat ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                fontWeight: activeCategory === cat ? 500 : 400,
              }}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  layoutId="filter-dot"
                  className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-muted-foreground text-center py-12">
              Nenhum artigo encontrado nesta categoria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}