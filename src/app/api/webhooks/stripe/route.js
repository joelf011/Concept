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

    // Vai à bd e muda o estado da encomenda com este ID para "processing"
    const { error } = await supabaseAdmin
      .from('orders')
      .update({ status: 'processing' })
      .eq('stripe_payment_intent_id', paymentIntent.id);

    if (error) {
      console.error('Erro ao atualizar a encomenda no Supabase:', error);
      return NextResponse.json({ error: 'Erro na Base de Dados' }, { status: 500 });
    }

    console.log(`Encomenda com ID ${paymentIntent.id} foi paga e atualizada para Processing!`);
  }

  return NextResponse.json({ received: true });
}