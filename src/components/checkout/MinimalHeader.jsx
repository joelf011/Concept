import React from 'react';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function MinimalHeader() {
  return (
    <header className="w-full border-b border-border bg-background py-6 px-[8vw]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/shop" className="font-heading text-2xl font-bold tracking-tighter">
          CONCEPT
        </Link>
        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
          <Lock size={16} />
          <span>Secure Checkout</span>
        </div>
      </div>
    </header>
  );
}