import React from 'react';

export default function ShippingMethod({ country, shippingCost, setShippingCost }) {
  // Lógica de preços baseada no país selecionado
  const isPortugal = country === 'Portugal';
  const isEU = ['Espanha', 'França', 'Alemanha', 'Itália'].includes(country); // Adiciona mais se precisares
  
  const options = isPortugal 
    ? [
        { id: 3.50, title: "Envio Normal CTT", desc1: "Feito por encomenda", desc2: "Sem rastreio" },
        { id: 5.50, title: "Envio Registado CTT", desc1: "Número de rastreio fornecido", desc2: "" }
      ]
    : isEU 
    ? [
        { id: 8.50, title: "Envio Normal Rastreado", desc1: "União Europeia", desc2: "" },
        { id: 18.00, title: "Envio Rastreado Expresso", desc1: "União Europeia", desc2: "" }
      ]
    : [
        { id: 18.00, title: "Envio Normal Internacional", desc1: "Resto do Mundo", desc2: "" },
        { id: 25.00, title: "Envio Rastreado Internacional", desc1: "Resto do Mundo", desc2: "" }
      ];

  return (
    <section className="pt-2">
      <h2 className="font-medium text-xl mb-4">Shipping method</h2>
      
      <div className="border border-border rounded-md overflow-hidden bg-background">
        {options.map((option, index) => (
          <label 
            key={index} 
            className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${index !== options.length - 1 ? 'border-b border-border' : ''} ${shippingCost === option.id ? 'bg-secondary/30' : 'hover:bg-secondary/10'}`}
          >
            <div className="flex items-start gap-3">
              <input 
                type="radio" 
                name="shipping" 
                className="mt-1 w-4 h-4 text-foreground focus:ring-foreground"
                checked={shippingCost === option.id}
                onChange={() => setShippingCost(option.id)}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{option.title}</span>
                {option.desc1 && <span className="text-xs text-muted-foreground mt-0.5">{option.desc1}</span>}
                {option.desc2 && <span className="text-xs text-muted-foreground">{option.desc2}</span>}
              </div>
            </div>
            <span className="text-sm font-medium">€{option.id.toFixed(2)}</span>
          </label>
        ))}
      </div>
    </section>
  );
}