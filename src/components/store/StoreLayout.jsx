"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/store/Navbar";
import Footer from "@/components/store/Footer";
import { AnimatePresence, motion } from "framer-motion";

export default function StoreLayout({ children }) {
  const pathname = usePathname(); 

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-1"
        >
          {children} 
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}