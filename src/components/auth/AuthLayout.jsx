import React from 'react';
import Link from 'next/link';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md space-y-8">
        
        <div className="flex flex-col items-center text-center space-y-2">
          <Link href="/shop" className="font-heading text-4xl font-bold tracking-tighter mb-4">
            CONCEPT
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="bg-secondary/10 border border-border/50 rounded-xl p-6 sm:p-8">
          {children}
        </div>

      </div>
    </div>
  );
}