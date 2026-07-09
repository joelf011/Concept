import React from "react";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="px-[8vw] py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <h4 className="font-heading text-lg font-semibold tracking-[-0.04em] mb-6">
              Concept
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Objects designed with intention. Each piece is a study in form, material, and the space between.
            </p>
          </div>

          <div>
            <p className="label-mono mb-6">Navigate</p>
            <div className="flex flex-col gap-3">
              <Link href="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Shop All</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">About Us</Link>
              <Link href="/custom-order" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Custom Orders</Link>
              <Link href="/shipping-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Shipping Policy</Link>
            </div>
          </div>

          <div>
            <p className="label-mono mb-6">Contact</p>
            <div className="flex flex-col gap-3">
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Contact Us</Link>
              <a href="mailto:conceptclothing.pt@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">conceptclothing.pt@gmail.com</a>
              <Link href="/custom-order" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Request a Quote</Link>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} Concept. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/shipping-policy" className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors duration-300">Shipping</Link>
            <Link href="/contact" className="font-mono text-[11px] text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}