import React from "react";
import Link from "next/link";
import { getProducts } from "@/services/supabase";
import ProductCard from "@/components/store/ProductCard";
import { ArrowRight } from "lucide-react";

const heroImage = "/hero.webp";
const customBannerImage = "/personalized.webp";

export default async function Home() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center px-[8vw] pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 w-full items-center">
          <div className="relative z-10 lg:pr-8">
            <h1 className="font-heading font-bold text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-[-0.04em] animate-in fade-in duration-1000 slide-in-from-bottom-8">
              Concept
              <br />
              Clothing
            </h1>

            <p className="mt-8 text-muted-foreground text-base md:text-lg leading-relaxed max-w-md animate-in fade-in duration-1000 delay-300 slide-in-from-bottom-4 fill-mode-both">
              Not just a Brand, an Idea, a Concept.
            </p>

            <div className="mt-12 animate-in fade-in duration-1000 delay-500 slide-in-from-bottom-4 fill-mode-both">
              <Link href="/shop" className="group inline-flex items-center gap-3">
                <span className="label-mono text-foreground relative">
                  Shop Now
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-foreground origin-left transition-transform duration-500 group-hover:scale-x-110" />
                </span>
                <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="relative lg:-ml-12 animate-in fade-in zoom-in-95 duration-1000">
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={heroImage}
                alt="Concept"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-[8vw] py-24 md:py-36">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold tracking-[-0.04em] leading-[0.9]">
              Featured
            </h2>
          </div>
          <Link href="/shop" className="group hidden md:inline-flex items-center gap-2">
            <span className="label-mono">View All</span>
            <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link href="/shop" className="group md:hidden mt-12 inline-flex items-center gap-2">
          <span className="label-mono">View All</span>
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </section>

      {/* Custom Order Banner */}
      <section className="bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img src={customBannerImage} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative px-[8vw] py-24 md:py-36 flex flex-col items-center text-center">
         <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-[-0.04em] leading-[0.9] max-w-2xl">
            Your Style,
            <br />
            Your Way
          </h2>
          <p className="mt-6 text-background/60 text-base md:text-lg max-w-lg leading-relaxed">
            Create clothing that reflects who you are. From custom designs and unique details to personalized fits, we bring your vision to life with quality craftsmanship and attention to every detail.
          </p>
          <Link
            href="/custom-order"
            className="mt-12 btn-primary bg-background text-foreground hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-md"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
}