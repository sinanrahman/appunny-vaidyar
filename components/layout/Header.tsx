"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavigationOverlay from "./NavigationOverlay";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition out of hero (approx end of hero is 90% of vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={cn(styles.navbar, isScrolled && styles.navbarScrolled)}>
        <div style={{ justifySelf: 'start' }}>
          <Link href="/" className={cn(styles.logoPlate, isScrolled && styles.logoPlateScrolled)}>
            <Image
              src="/images/03_secondary_logo.png"
              alt="Appunni Vaidyar Parvathy"
              width={260}
              height={102}
              priority
              className={cn(styles.navLogoImage, !isScrolled && styles.logoLight)}
            />
          </Link>
        </div>

        <div className={styles.menuTrigger} style={{ justifySelf: 'center' }}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "font-secondary font-medium uppercase tracking-widest text-sm hover:opacity-70 transition-colors duration-300 px-6 py-2 rounded-full md:bg-transparent md:px-0 md:py-0 md:rounded-none relative z-50 outline-none border-none focus:outline-none focus:ring-0",
              isScrolled ? "text-primary bg-warm md:text-primary" : "text-warm bg-primary md:text-warm"
            )}
            aria-expanded={menuOpen}
            aria-controls="navigation-drawer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            Menu
          </button>
        </div>

        <div className={styles.consultationButton} style={{ justifySelf: 'end' }}>
          <Link 
            href="/contact" 
            className={cn(
              "inline-flex items-center justify-center rounded-full font-secondary font-medium px-6 py-3 transition-colors duration-300 relative z-50",
              isScrolled ? "bg-primary text-warm hover:bg-black" : "bg-warm text-primary hover:bg-white"
            )}
          >
            Book Consultation
          </Link>
        </div>
      </header>

      <NavigationOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
