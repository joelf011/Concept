"use client";

import React from "react";

export default function VariantSelector({ 
  product, 
  variants,
  selectedOption, setSelectedOption, 
  selectedSize, setSelectedSize, 
  selectedColor, setSelectedColor 
}) {
  
  const currentColorName = typeof selectedColor === 'string' ? selectedColor : selectedColor?.name;
  const currentOptionName = selectedOption?.label;

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

      {/* Cores */}
      {product.colors?.length > 0 && (
        <div className="mt-8">
          <p className="text-sm mb-3">Color <span className="text-muted-foreground ml-2">{currentColorName}</span></p>
          <div className="flex flex-wrap gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-sm border-2 p-1 transition-colors ${
                  currentColorName === color.name ? 'border-foreground' : 'border-transparent hover:border-border'
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

      {/* Tamanhos */}
      {product.sizes?.length > 0 && (
        <div className="mt-8">
          <p className="text-sm mb-3">Size</p>
          <div className="flex flex-wrap gap-3">
            {product.sizes.map((size) => {
              // Cruza Tamanho + Cor + Opção
              const variant = variants?.find(v => {
                const matchSize = v.size === size;
                const matchColor = v.color === currentColorName;
                const matchOption = currentOptionName 
                  ? v.custom_option === currentOptionName 
                  : (v.custom_option === null || v.custom_option === '');
                
                return matchSize && matchColor && matchOption;
              });

              const isOutOfStock = !variant || variant.stock_quantity <= 0;

              return (
                <button
                  key={size}
                  onClick={() => !isOutOfStock && setSelectedSize(size)}
                  disabled={isOutOfStock}
                  className={`relative w-12 h-12 flex items-center justify-center rounded-full border text-sm transition-all overflow-hidden ${
                    isOutOfStock 
                      ? 'border-border/50 text-muted-foreground/50 cursor-not-allowed bg-secondary/20' 
                      : selectedSize === size 
                        ? 'border-foreground bg-foreground text-background' 
                        : 'border-border hover:border-foreground/50'
                  }`}
                >
                  {size}
                  {isOutOfStock && (
                    <span className="absolute inset-0 w-full h-[1px] bg-muted-foreground/30 rotate-45 top-1/2 -translate-y-1/2 origin-center" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}