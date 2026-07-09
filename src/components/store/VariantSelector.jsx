"use client";

import React from "react";

export default function VariantSelector({ 
  product, 
  selectedOption, setSelectedOption, 
  selectedSize, setSelectedSize, 
  selectedColor, setSelectedColor 
}) {
  return (
    <>
      {/* Opções Dinâmicas */}
      {product.custom_options?.choices?.length > 0 && (
        <div className="mt-8">
          <p className="text-sm mb-3">{product.custom_options.name || "Opções"}</p>
          <div className="flex flex-wrap gap-3">
            {product.custom_options.choices.map((choice) => (
              <button
                key={choice.label}
                onClick={() => setSelectedOption(choice)}
                className={`px-5 py-2 rounded-full border text-sm transition-colors ${
                  selectedOption?.label === choice.label 
                    ? 'border-foreground bg-foreground text-background' 
                    : 'border-border hover:border-foreground/50'
                }`}
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tamanhos */}
      {product.sizes?.length > 0 && (
        <div className="mt-8">
          <p className="text-sm mb-3">Size</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center rounded-full border text-sm transition-colors ${
                  selectedSize === size 
                    ? 'border-foreground bg-foreground text-background' 
                    : 'border-border hover:border-foreground/50'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cores */}
      {product.colors?.length > 0 && (
        <div className="mt-8">
          <p className="text-sm mb-3">Cor <span className="text-muted-foreground ml-2">{selectedColor?.name}</span></p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-sm border-2 p-1 transition-colors ${
                  selectedColor?.name === color.name ? 'border-foreground' : 'border-transparent hover:border-border'
                }`}
              >
                <span 
                  className="w-full h-full block border border-border/50 rounded-sm"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}