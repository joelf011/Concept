"use client";
import React from 'react';

export default function ShippingMethodSelector({ options, selectedMethodId, setSelectedMethod }) {
  if (!options || options.length === 0) {
    return <p className="text-muted-foreground text-sm pt-4">Nenhum método de envio disponível.</p>;
  }

  return (
    <section className="pt-2">
      <h2 className="font-medium text-xl mb-4">Shipping method</h2>
      
      <div className="border border-border rounded-md overflow-hidden bg-background">
        {options.map((option, index) => (
          <label 
            key={option.id} 
            className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${index !== options.length - 1 ? 'border-b border-border' : ''} ${selectedMethodId === option.id ? 'bg-secondary/30' : 'hover:bg-secondary/10'}`}
          >
            <div className="flex items-start gap-3">
              <input 
                type="radio" 
                name="shippingMethod" 
                className="mt-1 w-4 h-4 text-foreground focus:ring-foreground" 
                checked={selectedMethodId === option.id}
                onChange={() => setSelectedMethod(option)}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{option.title}</span>
                {option.description && (
                  <span className="text-xs text-muted-foreground mt-0.5">{option.description}</span>
                )}
              </div>
            </div>
            <div className="font-mono text-sm font-medium shrink-0">
              €{option.price.toFixed(2)}
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}