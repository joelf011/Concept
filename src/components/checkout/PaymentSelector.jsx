'use client'

import React, { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { createPendingOrder } from '@/app/actions/stripe'
import { useUserStore } from '@/store/userStore'

export default function PaymentSelector({ formData, cartItems, shippingMethod, shippingCost, clientSecret }) {
  const stripe = useStripe()
  const elements = useElements()
  const { user } = useUserStore()

  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements || !clientSecret) return

    // Validação de segurança: garantir que o cliente preencheu a morada
    if (!formData.email || !formData.lastName || !formData.address || !formData.city || !formData.postalCode || !formData.phone) {
      setMessage("Please fill in all required delivery fields above.")
      return
    }

    setIsLoading(true)
    setMessage(null)

    // alidar se os dados do cartão inseridos no Stripe estão corretos
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setMessage(submitError.message)
      setIsLoading(false)
      return
    }

    // Extrair o ID da transação (O Stripe envia-o no formato "pi_12345_secret_67890")
    const paymentIntentId = clientSecret.split('_secret')[0]

    // Calcular o total em cêntimos para enviar para a base de dados
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const totalAmountCents = Math.round((subtotal + shippingCost) * 100)

    // Preparar o "pacote" da encomenda
    const orderData = {
      userId: user?.id || null,
      paymentIntentId: paymentIntentId,
      email: formData.email,
      shippingAddress: formData,
      cartItems: cartItems,
      shippingMethod: shippingMethod?.name || 'Standard Shipping',
      shippingCostCents: Math.round(shippingCost * 100),
      totalAmountCents: totalAmountCents
    }

    // Gravar silenciosamente a encomenda no Supabase como "Pendente"
    const { success, order, error: dbError } = await createPendingOrder(orderData)

    if (!success) {
      setMessage("Error saving order details. Please try again.")
      console.error(dbError)
      setIsLoading(false)
      return
    }

    // A encomenda está segura no Supabase! Agora cobramos efetivamente o cartão
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?order_num=${order.order_number}`,
      },
    })

    // Se o código chegar aqui, significa que o pagamento falhou no último segundo (ex: sem saldo)
    if (confirmError) {
      if (confirmError.type === "card_error" || confirmError.type === "validation_error") {
        setMessage(confirmError.message)
      } else {
        setMessage("An unexpected error occurred while processing your payment.")
      }
    }

    setIsLoading(false)
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="pt-2">
      <div className="mb-8">
        <h2 className="font-medium text-xl mb-1">Payment</h2>
        <p className="text-sm text-muted-foreground mb-6">
          All transactions are secure and encrypted.
        </p>
        
        {/* O formulário seguro do Stripe */}
        <PaymentElement id="payment-element" options={{ layout: 'accordion' }} />
      </div>

      {/* Caixa de mensagens de erro */}
      {message && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-md text-sm font-medium mb-4">
          {message}
        </div>
      )}

      <button 
        disabled={isLoading || !stripe || !elements}
        className="cursor-pointer w-full bg-foreground text-background py-4 rounded-md font-bold text-lg hover:opacity-90 transition-opacity tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Pay now"}
      </button>
    </form>
  )
}