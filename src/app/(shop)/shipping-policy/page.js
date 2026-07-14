import React from 'react';
import { POLICIES } from '@/lib/policies';

export const metadata = {
  title: 'Shipping Policy | Concept',
};

export default function ShippingPolicyPage() {
  const policy = POLICIES.shipping;

  return (
    <div className="min-h-screen pt-32 pb-20 px-[5vw] flex justify-center bg-background">
      <div className="w-full max-w-3xl">
        <h1 className="font-heading text-3xl font-bold mb-8">{policy.title}</h1>
        
        {/* A classe whitespace-pre-wrap faz com que os parágrafos \n ganhem espaços naturais */}
        <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {policy.content}
        </div>
      </div>
    </div>
  );
}