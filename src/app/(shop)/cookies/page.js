import React from 'react';
import { POLICIES } from '@/lib/policies';

export const metadata = {
  title: 'Cookies Policy | Concept',
};

export default function CookiesPage() {
  const policy = POLICIES.cookies;

  return (
    <div className="min-h-screen pt-32 pb-20 px-[5vw] flex justify-center bg-background">
      <div className="w-full max-w-3xl">
        <h1 className="font-heading text-3xl font-bold mb-8">{policy.title}</h1>
        <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {policy.content}
        </div>
      </div>
    </div>
  );
}