import React from 'react';
import Image from 'next/image';

export default function OrderSummary({ items, subtotal, shippingCost, total }) {
  return (
    <>
      <h2 className="font-medium mb-6 text-xl text-foreground">Resumo da Encomenda</h2>
      
      {/* Lista de Produtos */}
      <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {items.map((item) => {
          const hasValidImageArray = Array.isArray(item.images) && item.images.length > 0;
          const displayImage = hasValidImageArray ? item.images[0] : "/Default.webp";

          const variantArray = [];
          if (item.selectedVariant?.option) variantArray.push(item.selectedVariant.option);
          if (item.selectedVariant?.size) variantArray.push(item.selectedVariant.size);
          if (item.selectedVariant?.color) variantArray.push(item.selectedVariant.color);
          const variantString = variantArray.join(" / ");

          return (
            <div key={item.cartItemId || item.id} className="flex gap-4 items-center">
              <div className="relative w-16 h-16 shrink-0 bg-white rounded-md overflow-hidden border border-border/50">
                <Image src={displayImage} alt={item.name} fill sizes="64px" className="object-cover" />
                <span className="absolute -top-2 -right-2 bg-foreground text-background text-[11px] w-5 h-5 flex items-center justify-center rounded-full z-10 border border-background">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate text-foreground">{item.name}</p>
                {variantString && (
                  <p className="text-xs text-muted-foreground mt-0.5">{variantString}</p>
                )}
              </div>
              <div className="text-sm font-medium shrink-0 text-foreground">
                €{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Código de Desconto */}
      <div className="flex gap-3 mb-6 py-6 border-y border-border">
        <input 
          type="text" 
          placeholder="Discount code" 
          className="flex-1 bg-white border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" 
        />
        <button className="bg-secondary text-muted-foreground font-medium px-6 rounded-md hover:text-foreground transition-colors">
          Apply
        </button>
      </div>

      {/* Totais */}
      <div className="space-y-3 text-sm mb-6">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-foreground">€{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span className="font-medium text-foreground">€{shippingCost.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-border">
        <span className="font-medium text-lg text-foreground">Total</span>
        <div className="text-right flex items-end">
          <span className="text-xs text-muted-foreground mr-2 mb-1">EUR</span>
          <span className="font-heading text-2xl font-bold text-foreground">€{total.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
}