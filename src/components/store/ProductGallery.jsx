"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductGallery({ images, defaultImage, productName }) {
  const imageList = images?.length > 0 ? images : [defaultImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % imageList.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-3 lg:sticky lg:top-28"
    >
      <div className="relative w-full flex justify-center group">
        {imageList.length > 0 && (
          <Image
            src={imageList[currentImageIndex]}
            alt={productName}
            width={1000}
            height={1200}
            priority
            className="w-[85%] lg:w-[75%] h-auto max-h-[75vh] object-contain object-top" 
          />
        )}

        {imageList.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}