"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import styles from "./Header.module.css";
import { usePathname } from "next/navigation";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Approach", href: "/approach" },
    { label: "Treatments", href: "/treatments" },
    { label: "Practitioner", href: "/practitioner" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const closeBtn = drawerRef.current?.querySelector('button');
      if (closeBtn) {
        setTimeout(() => closeBtn.focus(), 50);
      }
    } else {
      const menuTrigger = document.querySelector(`.${styles.menuTrigger} button`) as HTMLButtonElement | null;
      if (menuTrigger) {
        menuTrigger.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (!linksRef.current) return;

    const links = linksRef.current.querySelectorAll("li a");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isOpen) {
      if (!prefersReducedMotion) {
        gsap.fromTo(
          links,
          { opacity: 0, x: -32 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.5, 
            stagger: 0.065, 
            ease: "power3.out",
            delay: 0.2
          }
        );
      } else {
        gsap.set(links, { opacity: 1, x: 0 });
      }
    }
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div 
          className={styles.menuBackdrop} 
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        id="navigation-drawer"
        className={styles.menuDrawer}
        data-open={isOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
      >
        <Image
          src="/images/appunni-navbar-drawer-background.png"
          alt=""
          fill
          priority={false}
          sizes="(max-width: 900px) 100vw, 50vw"
          className={styles.drawerBackground}
        />
        
        <div className={styles.drawerOverlay} />

        <div className={styles.drawerHeader}>
          <Image
            src="/images/03_secondary_logo.png"
            alt="Appunni Vaidyar Parvathy"
            width={160}
            height={63}
            className="w-32 md:w-40 h-auto relative z-10"
          />
          <button 
            onClick={onClose}
            className="w-[44px] h-[44px] flex items-center justify-center text-[#f3f0e4] hover:opacity-70 transition-opacity relative z-10"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav>
          <ul ref={linksRef} className={styles.drawerNavigation}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    onClick={onClose}
                    className={styles.drawerLink}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}
