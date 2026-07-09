import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Serviço para procurar todos os produtos
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erro ao carregar produtos:", error);
    return [];
  }
  return data;
}

// Serviço para procurar UM produto específico pelo ID
export async function getProductById(id) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single(); 

  if (error) {
    console.error(`Erro ao carregar o produto ${id}:`, error);
    return null;
  }
  
  return data;
}