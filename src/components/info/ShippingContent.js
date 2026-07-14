import React from 'react';

export default function ShippingContent() {
  return (
    <div className="space-y-6 text-muted-foreground">
      <h2 className="text-xl font-medium text-foreground mt-8 mb-4">Shipping Policy — Concept</h2>
      <p>All orders are processed the next business day after payment confirmation.</p>
      
      <h3 className="font-medium text-foreground mt-6 mb-2">Continental Portugal</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Standard Shipping CTT — €3.50 (made to order, no tracking)</li>
        <li>Registered Shipping CTT — €5.50 (tracking number provided)</li>
      </ul>

      {/* Resto do teu texto de envios aqui... */}
    </div>
  );
}