"use client";

import Image from "next/image";
import { Package } from "lucide-react";

export default function OrderItems({ items = [] }) {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="bg-secondary/30 px-6 py-4 border-b border-border">
        <h3 className="font-medium text-sm">
          Items in this shipment
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={64}
                className="w-12 h-16 object-cover rounded-md"
              />
            ) : (
              <div className="w-12 h-16 bg-secondary rounded-md flex items-center justify-center">
                <Package size={16} />
              </div>
            )}

            <div>
              <p className="text-sm font-medium">
                {item.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {item.size && `Size: ${item.size}`}
                {item.color && ` • ${item.color}`}
              </p>

              <p className="text-sm mt-1">
                Qty: {item.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}