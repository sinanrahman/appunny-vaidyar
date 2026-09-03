"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavigationOverlay from "./NavigationOverlay";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
          isScrolled ? "bg-warm/90 backdrop-blur-md shadow-sm text-black" : "bg-transparent text-warm"
        )}
      >
        <div className="px-[clamp(20px,4vw,72px)] h-20 md:h-24 flex items-center justify-between max-w-[1600px] mx-auto w-full">
          <Link href="/" className="relative z-50 flex items-center">
            {/* When not scrolled (hero), use white/light text. When scrolled, use dark logo. */}
            <div className="relative w-[180px] h-[40px] md:w-[220px] md:h-[48px]">
              {/* For now, just using primary logo, but ideally would swap to a white version when bg is transparent */}
              <Image 
                src="/images/02_primary_logo.png" 
                alt="Appunni Vaidyar Parvathy" 
                fill
                sizes="120px"
                className={cn("object-contain transition-opacity", !isScrolled ? "brightness-0 invert" : "")}
                priority
              />
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-8 relative z-50">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="font-secondary font-medium uppercase tracking-widest text-sm hover:opacity-70 transition-opacity"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>

            <Link 
              href="/contact" 
              className={cn(
                "hidden md:inline-flex items-center justify-center rounded-full font-secondary font-medium px-6 py-3 transition-colors duration-300",
                isScrolled ? "bg-primary text-warm hover:bg-black" : "bg-warm text-primary hover:bg-white"
              )}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </header>

      <NavigationOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
