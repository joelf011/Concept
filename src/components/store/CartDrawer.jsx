import React from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import Link from 'next/link';

export default function CartDrawer() {
  const { isOpen, closeCart, items, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-background border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between px-8 h-20 border-b border-border shrink-0">
              <span className="label-mono">
                Cart {items.length > 0 && `(${items.reduce((s, i) => s + i.quantity, 0)})`}
              </span>
              <button onClick={closeCart} className="hover:opacity-60 transition-opacity">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                  <button onClick={closeCart} className="label-mono hover:text-foreground transition-colors">
                    Continue Shopping →
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => {
                    const hasValidImageArray = Array.isArray(item.images) && item.images.length > 0;
                    const displayImage = hasValidImageArray ? item.images[0] : "/Default.webp";

                    return (
                      <div key={item.cartItemId || item.id} className="flex gap-4">
                        <Image
                          src={displayImage}
                          alt={item.name}
                          width={80}
                          height={96}
                          className="w-20 h-24 object-cover rounded-md bg-secondary shrink-0"
                        />
                        <div className="flex-1 flex flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium truncate">{item.name}</p>
                              
                              {item.selectedVariant && (
                                <div className="text-xs text-muted-foreground mt-1 flex flex-wrap gap-x-2">
                                  {item.selectedVariant.size && <span>{item.selectedVariant.size}</span>}
                                  {item.selectedVariant.color && <span>• {item.selectedVariant.color}</span>}
                                  {item.selectedVariant.option && <span>• {item.selectedVariant.option}</span>}
                                </div>
                              )}
                              
                              <p className="label-mono mt-1">€{item.price.toFixed(2)}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.cartItemId || item.id)}
                              className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                            >
                              <Trash2 size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => decreaseQuantity(item.cartItemId || item.id)}
                              className="hover:opacity-60 transition-opacity"
                            >
                              <Minus size={14} strokeWidth={1.5} />
                            </button>
                            <span className="font-mono text-xs w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.cartItemId || item.id)}
                              className="hover:opacity-60 transition-opacity"
                            >
                              <Plus size={14} strokeWidth={1.5} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="px-8 py-6 border-t border-border shrink-0">
                <div className="flex justify-between items-center mb-6">
                  <span className="label-mono">Subtotal</span>
                  <span className="font-heading text-lg font-semibold">
                    €{subtotal.toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary flex items-center justify-center w-full bg-foreground text-background rounded-md text-sm uppercase tracking-wider font-medium py-3"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}