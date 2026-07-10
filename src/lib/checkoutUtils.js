// Lista de países predefinida para o dropdown de checkout
export const COUNTRIES_LIST = [
  { code: 'PT', name: 'Portugal' },
  { code: 'ES', name: 'Spain' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'UK', name: 'United Kingdom' },
];

// Países da União Europeia (UE) para a política de envio
const EU_COUNTRIES = ['ES', 'FR', 'DE', 'IT']; 

// Função para obter as opções de envio baseadas no código do país
export const getShippingRatesForCountry = (countryCode) => {
  if (countryCode === 'PT') {
    return [
      { id: 'PT_NORMAL', price: 3.50, title: 'Standard Shipping CTT', description: 'Made to order, no tracking' },
      { id: 'PT_REGIST', price: 5.50, title: 'Registered Shipping CTT', description: 'Tracking number provided' },
    ];
  } else if (EU_COUNTRIES.includes(countryCode)) {
    return [
      { id: 'EU_NORMAL', price: 8.50, title: 'Standard Tracked International', description: 'Estimated delivery times vary' },
      { id: 'EU_RASTR', price: 18.00, title: 'Premium Tracked International', description: 'Faster tracking delivery' },
    ];
  } else {
    // Resto do Mundo (Reino Unido e outros)
    return [
      { id: 'WORLD_NORMAL', price: 18.00, title: 'Standard International', description: 'No tracking' },
      { id: 'WORLD_RASTR', price: 25.00, title: 'Tracked International', description: 'Tracking number provided' },
    ];
  }
};