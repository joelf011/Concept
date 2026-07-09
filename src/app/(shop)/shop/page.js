import { getProducts } from "@/services/supabase";
import ShopClient from "./ShopClient";

export const metadata = {
  title: 'Catalog',
  description: 'Discover our complete clothing collection.',
};

export default async function ShopPage() {
  // Vai buscar ao Supabase
  const products = await getProducts();
  
  // O código recolhe tudo o que existir na coluna 'category' e remove os duplicados.
  const rawCategories = products.map(p => p.category).filter(Boolean);
  const uniqueCategories = ["All", ...new Set(rawCategories)];

  // 3. Passa para o Client Component
  return <ShopClient products={products} categories={uniqueCategories} />;
}