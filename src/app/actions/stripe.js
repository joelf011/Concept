'use server'

import Stripe from 'stripe'
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Criamos o cliente "Admin" (invisível para o público) que usa a Service Role Key para ignorar o RLS
const supabaseAdmin = createSupabaseAdmin(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function createPaymentIntent(items, shippingCost = 0) {
  try {
    if (!items || items.length === 0) {
      throw new Error("Cart is empty")
    }

    // Calcula o subtotal dos produtos no servidor
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0
      return sum + (price * item.quantity)
    }, 0)

    // Soma o custo de envio
    const totalAmount = subtotal + shippingCost

    // O Stripe trabalha sempre na unidade mínima da moeda
    const amountInCents = Math.round(totalAmount * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return { clientSecret: paymentIntent.client_secret }
  } catch (error) {
    console.error("Stripe Error:", error.message)
    return { error: error.message }
  }
}

// Função para guardar a encomenda como "pending" e travar compras sem stock
export async function createPendingOrder(orderData) {
  // BARREIRA DE STOCK
  // Antes de gravar a encomenda, verificar item a item se ainda há stock
  for (const item of orderData.cartItems) {
    // Só verificamos itens que tenham variant_id associado
    if (item.variant_id) {
      const { data: variant, error: variantError } = await supabaseAdmin
        .from('product_variants')
        .select('stock_quantity')
        .eq('id', item.variant_id)
        .single()

      if (variantError || !variant) {
        console.error("Erro a ler stock da variante:", variantError)
        return { success: false, error: "Database error while checking stock." }
      }

      // Se a quantidade que o cliente quer for MAIOR do que a que temos no armazém
      if (item.quantity > variant.stock_quantity) {
        return { 
          success: false, 
          // Esta mensagem vai aparecer no Checkout a avisar o cliente
          error: `We're sorry, but "${item.name}" (Size: ${item.selectedVariant?.size}) just sold out!` 
        }
      }
    }
  }

  // SE PASSOU, CRIAMOS A ENCOMENDA
  // Gerar um Order Number aleatório de 6 caracteres
  const orderNumber = Math.random().toString(36).substring(2, 8).toUpperCase()

  // Usamos o supabaseAdmin que tem a chave mestra
  const { data, error } = await supabaseAdmin
    .from('orders')
    .upsert({
      user_id: orderData.userId || null,
      stripe_payment_intent_id: orderData.paymentIntentId,
      order_number: orderNumber,
      amount_total: orderData.totalAmountCents,
      customer_email: orderData.email,
      shipping_address: orderData.shippingAddress,
      cart_items: orderData.cartItems,
      shipping_method: orderData.shippingMethod,
      shipping_cost: orderData.shippingCostCents,
      status: 'pending'
    }, { onConflict: 'stripe_payment_intent_id' })
    .select()
    .single()

  if (error) {
    console.error("Error creating/updating order:", error)
    return { success: false, error: error.message }
  }

  return { success: true, order: data }
}

// Carregar as variantes de um produto sob procura
export async function getProductVariants(productId) {
  try {
    const { data: variants, error } = await supabaseAdmin
      .from('product_variants')
      .select('id, size, color, custom_option, stock_quantity')
      .eq('product_id', productId);

    if (error) throw error;

    return { success: true, variants };
  } catch (error) {
    console.error("Error fetching variants via Server Action:", error.message);
    return { success: false, variants: [] };
  }
}