"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function AuthInput({ label, id, type = 'text', required = true, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  
  // Verifica se este input é suposto ser uma password
  const isPassword = type === 'password';
  
  // Se for password e "showPassword" for true, muda para texto normal
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2 relative">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={inputType}
          required={required}
          className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors pr-10"
          {...props}
        />
        
        {/* Botão de alternar visibilidade, só aparece se for tipo password */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}