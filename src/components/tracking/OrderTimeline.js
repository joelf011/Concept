"use client";

import React from "react";
import { CheckCircle2, Package, Truck } from "lucide-react";
import { getTimelineStep } from "@/lib/tracking";

const steps = [
  {
    step: 1,
    label: "Confirmed",
    icon: CheckCircle2,
  },
  {
    step: 2,
    label: "Processing",
    icon: Package,
  },
  {
    step: 3,
    label: "Shipped",
    icon: Truck,
  },
  {
    step: 4,
    label: "Delivered",
    icon: CheckCircle2,
  },
];

export default function OrderTimeline({ status }) {
  const currentStep = getTimelineStep(status);

  if (status === "cancelled") return null;

  return (
    <div className="flex items-start justify-between w-full relative mb-12 mt-4 px-2 sm:px-6">
      {steps.map((item, index) => {
        const Icon = item.icon;

        return (
          <React.Fragment key={item.step}>
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= item.step
                    ? "bg-foreground text-background"
                    : "border-2 border-secondary text-muted-foreground"
                }`}
              >
                <Icon size={20} />
              </div>

              <span
                className={`text-xs absolute top-12 hidden sm:block ${
                  currentStep >= item.step
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mt-5 rounded-full bg-secondary overflow-hidden">
                <div
                  className={`h-full bg-foreground transition-all duration-700 ${
                    currentStep > item.step ? "w-full" : "w-0"
                  }`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}