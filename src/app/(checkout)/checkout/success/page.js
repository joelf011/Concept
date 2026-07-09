"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import MinimalHeader from '@/components/checkout/MinimalHeader';
import MinimalFooter from '@/components/checkout/MinimalFooter';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Limpa o carrinho de compras
    clearCart();

    const orderNum = searchParams.get('order_num');
    if (orderNum) {
      setOrderNumber(orderNum);
    }
  }, [clearCart, searchParams]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MinimalHeader />
      
      <main className="flex-1 flex flex-col items-center justify-center px-[5vw] py-16 text-center">
        <div className="bg-green-50 text-green-600 p-4 rounded-full mb-6">
          <CheckCircle2 size={48} strokeWidth={1.5} />
        </div>
        
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Thank you for your order!
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 max-w-md">
          Your payment was successful and your order is now being processed. We'll send you an email confirmation shortly.
        </p>

        {orderNumber && (
          <div className="bg-secondary/20 border border-border rounded-xl p-6 mb-10 w-full max-w-sm">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Order Number</p>
            <p className="font-bold text-2xl font-mono">#{orderNumber}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/account" 
            className="btn-outline px-8 py-4 border border-border text-foreground hover:bg-secondary/50 rounded-md font-medium transition-colors"
          >
            Track Order
          </Link>
          <Link 
            href="/shop" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}