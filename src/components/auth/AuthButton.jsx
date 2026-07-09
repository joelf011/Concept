"use client";

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

export default function AuthButton({ children, text = "Submeter" }) {
  // Este hook deteta automaticamente se o formulário pai está a processar
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-foreground text-background py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" size={18} />
          <span>A processar...</span>
        </>
      ) : (
        children || text
      )}
    </button>
  );
}