"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavigationOverlay from "./NavigationOverlay";
import styles from "./Header.module.css";

function AyurvedicMenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 10C9.8 7.7 9.9 4.7 12 2.2C14.1 4.7 14.2 7.7 12 10Z"
        fill="currentColor"
      />
      <path
        d="M14 12C16.3 9.8 19.3 9.9 21.8 12C19.3 14.1 16.3 14.2 14 12Z"
        fill="currentColor"
      />
      <path
        d="M12 14C14.2 16.3 14.1 19.3 12 21.8C9.9 19.3 9.8 16.3 12 14Z"
        fill="currentColor"
      />
      <path
        d="M10 12C7.7 14.2 4.7 14.1 2.2 12C4.7 9.9 7.7 9.8 10 12Z"
        fill="currentColor"
      />
      <circle cx="12" cy="12" r="1.35" fill="currentColor" />
    </svg>
  );
}

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
          styles.navbar,
          isScrolled && styles.navbarScrolled
        )}
      >
        <button
          type="button"
          className={styles.menuTrigger}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation-drawer"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <AyurvedicMenuIcon className={cn(styles.menuIcon, menuOpen && styles.menuIconOpen)} />
          <span>{menuOpen ? "CLOSE" : "MENU"}</span>
        </button>

        <Link href="/" className={styles.navBrand}>
          <Image
            src="/images/03_secondary_logo.png"
            alt="Appunni Vaidyar Parvathy"
            width={260}
            height={102}
            priority
            className={styles.navLogo}
            style={{ filter: !isScrolled ? "brightness(0) invert(1)" : "none" }}
          />
        </Link>

        <Link href="/contact" className={styles.consultationLink}>
          BOOK CONSULTATION
        </Link>
      </header>

      <NavigationOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
