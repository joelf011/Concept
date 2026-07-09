import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { useToastStore } from "@/store/toastStore";

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="pointer-events-auto flex items-center gap-3 bg-foreground text-background px-5 py-3 shadow-xl max-w-sm w-max"
          >
            <CheckCircle size={15} strokeWidth={1.5} className="shrink-0 text-primary" style={{ color: "hsl(var(--primary))" }} />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em]">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={12} strokeWidth={2} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}