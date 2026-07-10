import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Cliente com a Chave para poder atualizar a encomenda
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    // Verifica se a mensagem veio mesmo do Stripe
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Se o evento for "Pagamento Bem Sucedido"
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    // Ir buscar a encomenda para saber exatamente o que o cliente comprou
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('cart_items')
      .eq('stripe_payment_intent_id', paymentIntent.id)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar encomenda:', fetchError);
      return NextResponse.json({ error: 'Order not found' }, { status: 500 });
    }

    // Descontar o stock de cada item na base de dados
    if (order && order.cart_items) {
      for (const item of order.cart_items) {
        // Se o item tem uma variante associada
        if (item.variant_id) {
          // Lemos o stock atual no armazém
          const { data: variant } = await supabaseAdmin
            .from('product_variants')
            .select('stock_quantity')
            .eq('id', item.variant_id)
            .single();

          if (variant) {
            // Calculamos o novo stock
            const newStock = Math.max(0, variant.stock_quantity - item.quantity);
            
            // Atualizamos a bd com a nova quantidade
            await supabaseAdmin
              .from('product_variants')
              .update({ stock_quantity: newStock })
              .eq('id', item.variant_id);
          }
        }
      }
    }

    // Mudar o estado da encomenda para "Processing" (Pago!)
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ status: 'processing' })
      .eq('stripe_payment_intent_id', paymentIntent.id);

    if (updateError) {
      console.error('Erro ao atualizar a encomenda:', updateError);
      return NextResponse.json({ error: 'Erro na Base de Dados' }, { status: 500 });
    }

    console.log(`Sucesso: Encomenda com ID ${paymentIntent.id} foi paga e o stock foi atualizado!`);
  }

  return NextResponse.json({ received: true });
}