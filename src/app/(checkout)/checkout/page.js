"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore";
import MinimalHeader from "@/components/checkout/MinimalHeader";
import MinimalFooter from "@/components/checkout/MinimalFooter";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import ShippingMethodSelector from "@/components/checkout/ShippingMethodSelector";
import PaymentSelector from "@/components/checkout/PaymentSelector";
import OrderSummary from "@/components/checkout/OrderSummary";
import { getShippingRatesForCountry } from "@/lib/checkoutUtils";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '@/app/actions/stripe';

// Inicializa o Stripe fora do componente para não recriar a cada render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const { items } = useCartStore();
  const { user } = useUserStore(); // Obtém os dados do utilizador
  const [isMounted, setIsMounted] = useState(false);

  // Estado unificado que guarda todos os dados do formulário
  const [formData, setFormData] = useState({
    email: user?.email || '',
    country: 'PT',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    postalCode: '',
    city: '',
    region: '',
    phone: ''
  });

  // Sincroniza o e-mail do utilizador quando ele terminar de carregar do Zustand
  useEffect(() => {
    if (user?.email && formData.email === '') {
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, [user]);

  // Estados Dinâmicos do Checkout
  const [shippingOptions, setShippingOptions] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(null);
  
  // Estado do Stripe
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => setIsMounted(true), []);

  // Atualiza as opções de envio quando o país do formData muda
  useEffect(() => {
    const rates = getShippingRatesForCountry(formData.country);
    setShippingOptions(rates);
    
    // Seleciona a primeira opção da lista automaticamente
    if (rates.length > 0) {
      setSelectedShippingMethod(rates[0]);
    } else {
      setSelectedShippingMethod(null);
    }
  }, [formData.country]);

  // Cálculos Dinâmicos
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = selectedShippingMethod?.price || 0;
  const total = subtotal + shippingCost;

  // Filtro para salvar a encomenda
  const cleanCartItems = items.map(item => ({
    product_id: item.id,
    variant_id: item.variant_id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    size: item.selectedVariant?.size,
    color: item.selectedVariant?.color,
    option: item.selectedVariant?.option,
    image: item.images?.[0] || "/Default.webp" 
  }));

  // Usa os items LIMPOS para não sobrecarregar a base de dados
  useEffect(() => {
    if (cleanCartItems.length > 0) {
      createPaymentIntent(cleanCartItems, shippingCost).then((res) => {
        if (res?.clientSecret) {
          setClientSecret(res.clientSecret);
        }
      });
    }
    // O eslint pode pedir para colocar o cleanCartItems nas dependências, 
    // mas como ele deriva do items, usamos o items para evitar loops infinitos.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, shippingCost]);

  // Tema visual do Stripe
  const stripeOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#000000',
        colorBackground: 'transparent',
        colorText: 'inherit',
        colorDanger: '#dc2626',
        fontFamily: 'Inter, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  if (!isMounted) return <div className="min-h-screen bg-background" />;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-[8vw] flex flex-col items-center justify-center text-center bg-background">
        <h1 className="font-heading text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some items before proceeding to checkout.</p>
        <Link href="/shop" className="btn-primary px-8 py-3 bg-foreground text-background rounded-md">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MinimalHeader />
      
      <main className="flex-1 px-[5vw] lg:px-[8vw] max-w-7xl mx-auto w-full py-8 lg:py-12">
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Coluna Esquerda: Dados, Envio e Pagamento */}
          <div className="lg:col-span-7 space-y-10 lg:pr-8">
            
            {/* Formulário */}
            <CheckoutForm 
              formData={formData} 
              setFormData={setFormData} 
            />
            
            <ShippingMethodSelector 
              options={shippingOptions} 
              selectedMethodId={selectedShippingMethod?.id} 
              setSelectedMethod={setSelectedShippingMethod}
            />
            
            {/* O Stripe recebe todos os dados para poder gravar a encomenda */}
            {clientSecret ? (
              <Elements key={clientSecret} stripe={stripePromise} options={stripeOptions}>
                <PaymentSelector 
                  formData={formData}
                  cartItems={cleanCartItems}
                  shippingMethod={selectedShippingMethod}
                  shippingCost={shippingCost}
                  clientSecret={clientSecret}
                />
              </Elements>
            ) : (
              <div className="pt-2 animate-pulse">
                <div className="h-6 w-32 bg-secondary rounded mb-6"></div>
                <div className="h-64 w-full bg-secondary/30 rounded border border-border"></div>
              </div>
            )}
          </div>

          {/* Coluna Direita: Resumo e Cupões */}
          <div className="lg:col-span-5 bg-[#fafafa] p-6 md:p-8 rounded-xl lg:sticky lg:top-8 border border-border/50">
            <OrderSummary 
              items={items} 
              subtotal={subtotal}
              shippingCost={shippingCost}
              total={total}
            />
          </div>
          
        </div>
      </main>

      <MinimalFooter />
    </div>
  );
}