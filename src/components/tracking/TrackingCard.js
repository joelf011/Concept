"use client";

import { ExternalLink, Truck } from "lucide-react";
import { getTrackingDetails } from "@/lib/tracking";

export default function TrackingCard({ order }) {
  if (
    !order?.tracking_number ||
    !["shipped", "delivered"].includes(order.status)
  ) {
    return null;
  }

  const tracking = getTrackingDetails(order);

  return (
    <div className="bg-secondary/10 border border-border rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
      <div>
        <h3 className="font-medium flex items-center gap-2">
          <Truck size={18} />
          Tracking Information
        </h3>

        <p className="text-sm text-muted-foreground mt-1">
          Carrier: {tracking.carrier}
        </p>

        <div className="mt-4 inline-block bg-background border border-border px-4 py-2 rounded-md font-mono text-sm">
          {order.tracking_number}
        </div>
      </div>

      <a
        href={tracking.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-foreground text-background px-6 py-3 rounded-md flex items-center gap-2"
      >
        Track Package
        <ExternalLink size={16} />
      </a>
    </div>
  );
}