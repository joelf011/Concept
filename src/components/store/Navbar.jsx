import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { ShoppingBag, Menu, X, User } from "lucide-react"; // Importamos o User
import { useCartStore } from "@/store/cartStore";
import { useUserStore } from "@/store/userStore"; // Importamos o estado
import CartDrawer from "@/components/store/CartDrawer";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { openCart, items } = useCartStore();
  const { user } = useUserStore(); // Lemos o utilizador atual
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      setVisible(currentY < lastScrollY || currentY < 10);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { label: "Shop", path: "/shop" },
    { label: "Custom Orders", path: "/custom-order" },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? "hsla(50, 20%, 97%, 0.85)" : "transparent",
          borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
        }}
      >
        <nav className="flex items-center justify-between px-[8vw] h-16 md:h-20">
          <Link href="/" className="font-heading text-lg font-semibold tracking-[-0.04em]">
            Concept
          </Link>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="label-mono hover:text-foreground transition-all duration-300 hover:translate-y-[-1px]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            
            {/* Ícone de Conta Dinâmico */}
            <Link
              href={user ? "/account" : "/login"}
              className="relative label-mono hover:text-foreground transition-all duration-300"
              aria-label="Account"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>

            <button
              onClick={openCart}
              className="relative label-mono hover:text-foreground transition-all duration-300"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 font-mono text-[10px]">
                  ({totalItems})
                </span>
              )}
            </button>

            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        {/* Menu Mobile */}
        {mobileOpen && (
          <div className="md:hidden px-[8vw] pb-8 pt-4 flex flex-col gap-6 bg-background/95 backdrop-blur-xl border-b border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="label-mono text-sm"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Link de conta no mobile */}
            <Link
              href={user ? "/account" : "/login"}
              className="label-mono text-sm text-muted-foreground hover:text-foreground mt-4 pt-4 border-t border-border/50"
              onClick={() => setMobileOpen(false)}
            >
              {user ? "My Account" : "Log In"}
            </Link>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}