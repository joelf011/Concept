import { createClient } from "@/lib/supabase/server";
import ShopClient from "./ShopClient";

export const metadata = {
  title: 'Catalog',
  description: 'Discover our complete clothing collection.',
};

export default async function ShopPage() {
  // Chamada direta à base de dados
  const supabase = await createClient();
  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const products = productsData || [];
  
  // O código recolhe tudo o que existir na coluna 'category' e remove os duplicados.
  const rawCategories = products.map(p => p.category).filter(Boolean);
  const uniqueCategories = ["All", ...new Set(rawCategories)];

  // Passa para o Client Component
  return <ShopClient products={products} categories={uniqueCategories} />;
}