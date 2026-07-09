import React from "react";
import { ArrowRightLeft, CheckCircle, ShieldCheck, MessageCircle } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="mt-24 md:mt-32 pt-16 border-t border-border">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        <div className="flex flex-col items-center text-center group">
          <div className="mb-4 text-foreground transition-transform duration-300 group-hover:-translate-y-1">
            <ArrowRightLeft size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-bold text-sm md:text-base mb-2">Fast Shipping</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Orders arrive in 3 business days.</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="mb-4 text-foreground transition-transform duration-300 group-hover:-translate-y-1">
            <CheckCircle size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-bold text-sm md:text-base mb-2">Quality Premium</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Very good quality materials</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="mb-4 text-foreground transition-transform duration-300 group-hover:-translate-y-1">
            <ShieldCheck size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-bold text-sm md:text-base mb-2">Guarantee</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Complete product protection</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <div className="mb-4 text-foreground transition-transform duration-300 group-hover:-translate-y-1">
            <MessageCircle size={32} strokeWidth={1.5} />
          </div>
          <h3 className="font-bold text-sm md:text-base mb-2">Support 24/7</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Always available to help.</p>
        </div>
      </div>
    </div>
  );
}