import React from 'react';
import Link from 'next/link';

export default function MinimalFooter() {
  return (
    <footer className="w-full border-t border-border bg-background py-6 px-[5vw] lg:px-[8vw] mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Links abrem num novo separador (target="_blank") para não estragar o checkout */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-foreground mb-4">
          <Link href="/refund-policy" target="_blank" className="hover:underline hover:text-muted-foreground transition-colors">Refund policy</Link>
          <Link href="/shipping-policy" target="_blank" className="hover:underline hover:text-muted-foreground transition-colors">Shipping</Link>
          <Link href="/privacy-policy" target="_blank" className="hover:underline hover:text-muted-foreground transition-colors">Privacy policy</Link>
          <Link href="/terms-of-service" target="_blank" className="hover:underline hover:text-muted-foreground transition-colors">Terms of service</Link>
          <Link href="/legal-notice" target="_blank" className="hover:underline hover:text-muted-foreground transition-colors">Legal notice</Link>
          <Link href="/contact" target="_blank" className="hover:underline hover:text-muted-foreground transition-colors">Contact</Link>
          <Link href="/cookies" target="_blank" className="hover:underline hover:text-muted-foreground transition-colors">Cookies</Link>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          <p>© {new Date().getFullYear()} CONCEPT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}