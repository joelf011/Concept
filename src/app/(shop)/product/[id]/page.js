import { getProductById } from "@/services/supabase";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }) {
  // 1. Aguardamos a Promise dos params (obrigatório no Next.js 15+)
  const resolvedParams = await params;
  
  // 2. Agora sim, podemos usar o ID em segurança
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    return notFound(); 
  }

  return <ProductDetailClient product={product} />;
}