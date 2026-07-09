// src/lib/checkoutUtils.js

// Lista de países predefinida para o dropdown de checkout
export const COUNTRIES_LIST = [
  { code: 'PT', name: 'Portugal' },
  { code: 'ES', name: 'España' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Deutschland' },
  { code: 'IT', name: 'Italia' },
  { code: 'UK', name: 'United Kingdom' },
];

// Países da União Europeia (UE) para a política de envio
const EU_COUNTRIES = ['ES', 'FR', 'DE', 'IT']; // Adiciona os códigos dos restantes países da UE aqui

// Função para obter as opções de envio baseadas no código do país
export const getShippingRatesForCountry = (countryCode) => {
  if (countryCode === 'PT') {
    return [
      { id: 'PT_NORMAL', price: 3.50, title: 'Envio Normal CTT', description: 'feito por encomenda, sem rastreio' },
      { id: 'PT_REGIST', price: 5.50, title: 'Envio Registado CTT', description: 'número de rastreio fornecido' },
    ];
  } else if (EU_COUNTRIES.includes(countryCode)) {
    return [
      { id: 'EU_NORMAL', price: 8.50, title: 'Envio Normal Rastreado Internacional' },
      { id: 'EU_RASTR', price: 18.00, title: 'Envio Rastreado Internacional' },
    ];
  } else {
    // Resto do Mundo (Reino Unido e outros)
    return [
      { id: 'WORLD_NORMAL', price: 18.00, title: 'Envio Normal Internacional' },
      { id: 'WORLD_RASTR', price: 25.00, title: 'Envio Rastreado Internacional' },
    ];
  }
};