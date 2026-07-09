import React from 'react';
import Link from 'next/link';
import { COUNTRIES_LIST } from '@/lib/checkoutUtils';
import { useUserStore } from '@/store/userStore';

export default function CheckoutForm({ formData, setFormData }) {
  const { user } = useUserStore();

  // Função para atualizar os campos automaticamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section>
      {/* Contact */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-xl">Contact</h2>
          {!user && (
            <Link href="/login" className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors">
              Log in
            </Link>
          )}
        </div>
        
        <input 
          type="email" 
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          readOnly={!!user}
          placeholder="Email address" 
          className={`w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors ${user ? 'opacity-70 bg-secondary/20 cursor-not-allowed' : ''}`} 
        />
        {user && (
          <p className="text-xs text-muted-foreground mt-2">
            The receipt for this order will be sent to your account's email address.
          </p>
        )}
      </div>

      {/* Delivery */}
      <div>
        <h2 className="font-medium text-xl mb-4">Delivery</h2>
        <div className="space-y-3">
          
          <select 
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
          >
            {COUNTRIES_LIST.map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          
          <div className="grid grid-cols-2 gap-3">
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First name (optional)" className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last name*" className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
          </div>

          <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Address*" className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
          <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} placeholder="Apartment, suite, etc. (optional)" className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
          
          <div className="grid grid-cols-12 gap-3">
            <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required placeholder="Postal code*" className="col-span-4 bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
            <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City*" className="col-span-4 bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
            <input type="text" name="region" value={formData.region} onChange={handleChange} placeholder="Region / State" className="col-span-4 bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
          </div>

          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone*" className="w-full bg-transparent border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-foreground" />
        </div>
      </div>
    </section>
  );
}