"use client";

import { useCartStore } from '@/store/cartStore';

export default function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem(product);
    alert(`${product.name} foi adicionado ao carrinho!`); // Apenas para teste
  };

  return (
    <button 
      onClick={handleAdd}
      className="bg-gray-950 text-white font-medium px-6 py-2.5 rounded-xl hover:bg-gray-800 transition text-sm active:scale-95"
    >
      Adicionar
    </button>
  );
}