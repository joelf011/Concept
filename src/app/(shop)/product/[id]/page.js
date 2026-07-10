import { createClient } from "@/lib/supabase/server";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // Chamada direta e segura à base de dados
  const supabase = await createClient();
  
  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('id', productId)
    .single();

  if (error || !product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}