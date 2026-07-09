"use client";

import React from "react";
import Image from "next/image";
import { Shirt, User, Ruler } from "lucide-react";
import Accordion from "@/components/ui/accordion";

export default function ProductAccordions({
  product,
  selectedColor,
}) {
  const items = [
    {
      value: "details",
      title: "Product Details",
      icon: <Shirt size={18} strokeWidth={1.5} />,
      content: (
        <div className="text-sm text-muted-foreground leading-relaxed">
          <p className="font-medium text-foreground mb-4 italic">
            {product.name} - {selectedColor?.name || "Original"}
          </p>

          <div className="whitespace-pre-wrap">
            {product.description || "Detalhes indisponíveis para este artigo."}
          </div>
        </div>
      ),
    },

    {
      value: "size",
      title: "Size & Fit",
      icon: <User size={18} strokeWidth={1.5} />,
      content: (
        <div className="text-sm text-muted-foreground">
          Simple cut with adjustment to size.
        </div>
      ),
    },

    {
      value: "measurements",
      title: "Measurement Guide",
      icon: <Ruler size={18} strokeWidth={1.5} />,
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold mb-2">
              REGULAR
            </span>

            <Image
              src="/regular.webp"
              alt="Regular Size guide"
              width={400}
              height={400}
              className="w-full h-auto rounded-md object-contain border border-border/50"
            />
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs font-bold mb-2">
              OVERSIZED
            </span>

            <Image
              src="/oversized.webp"
              alt="Oversized Size guide"
              width={400}
              height={400}
              className="w-full h-auto rounded-md object-contain border border-border/50"
            />
          </div>
        </div>
      ),
    },
  ];

  return <Accordion items={items} />;
}