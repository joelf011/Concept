"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Accordion({
  items,
  defaultOpen = null,
  className = "",
}) {
  const [openItem, setOpenItem] = useState(defaultOpen);

  const toggleItem = (value) => {
    setOpenItem((prev) => (prev === value ? null : value));
  };

  return (
    <div className={`border-t border-border ${className}`}>
      {items.map((item) => (
        <div key={item.value} className="border-b border-border">
          <button
            onClick={() => toggleItem(item.value)}
            className="flex items-center justify-between w-full py-4 text-left focus:outline-none"
          >
            <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-wide">
              {item.icon}
              {item.title}
            </div>

            {openItem === item.value ? (
              <Minus size={18} strokeWidth={1.5} />
            ) : (
              <Plus size={18} strokeWidth={1.5} />
            )}
          </button>

          <AnimatePresence>
            {openItem === item.value && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-6 pt-2">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}