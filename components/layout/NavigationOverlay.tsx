"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./NavigationOverlay.module.css";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Treatments", href: "/treatments" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function AyurvedicMenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 10C9.8 7.7 9.9 4.7 12 2.2C14.1 4.7 14.2 7.7 12 10Z" fill="currentColor" />
      <path d="M14 12C16.3 9.8 19.3 9.9 21.8 12C19.3 14.1 16.3 14.2 14 12Z" fill="currentColor" />
      <path d="M12 14C14.2 16.3 14.1 19.3 12 21.8C9.9 19.3 9.8 16.3 12 14Z" fill="currentColor" />
      <path d="M10 12C7.7 14.2 4.7 14.1 2.2 12C4.7 9.9 7.7 9.8 10 12Z" fill="currentColor" />
      <circle cx="12" cy="12" r="1.35" fill="currentColor" />
    </svg>
  );
}

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (!reducedMotion) {
        document.body.style.transition = "transform 750ms cubic-bezier(0.76, 0, 0.24, 1)";
      }
      
      // Focus management
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = "";
      if (!reducedMotion) {
        setTimeout(() => {
          if (!isOpen) document.body.style.transition = "";
        }, 750);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.transition = "";
    };
  }, [isOpen, reducedMotion]);

  useEffect(() => {
    if (!linksRef.current || reducedMotion) return;
    
    const links = linksRef.current.querySelectorAll(`.${styles.drawerLink}`);
    
    if (isOpen) {
      gsap.fromTo(
        links,
        { opacity: 0, y: "105%" },
        {
          opacity: 1,
          y: "0%",
          duration: 0.55,
          stagger: 0.065,
          ease: "power3.out",
          delay: 0.2, // slight delay to wait for drawer opening
        }
      );
    } else {
      gsap.killTweensOf(links);
      gsap.set(links, { opacity: 0, y: "105%" });
    }
  }, [isOpen, reducedMotion]);

  return (
    <>
      <div 
        className={styles.drawerBackdrop} 
        data-open={isOpen} 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div
        id="main-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={styles.menuDrawer}
        data-open={isOpen}
        ref={overlayRef}
        inert={!isOpen ? true : undefined}
        aria-hidden={!isOpen}
      >
        <Image
          src="/images/appunni-navbar-drawer-background.png"
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 43vw"
          className={styles.drawerBackground}
        />
        <div className={styles.drawerTint} />

        <div className={styles.drawerContent}>
          <div className={styles.drawerHeader}>
            <button 
              ref={closeBtnRef}
              type="button"
              className={styles.drawerClose} 
              onClick={onClose}
              aria-label="Close navigation menu"
            >
              <AyurvedicMenuIcon className={styles.menuIcon} />
              <span>CLOSE</span>
            </button>
          </div>

          <nav aria-label="Main navigation" className={styles.drawerNav}>
            <ul ref={linksRef} className={styles.drawerNavList}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className={styles.drawerLinkWrapper}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={styles.drawerLink}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className={styles.linkMarker} aria-hidden="true">
                        <AyurvedicMenuIcon className="w-5 h-5 inline" />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.drawerFooter}>
            <p>Authentic Ayurveda</p>
            <p><a href="tel:+919448039840">+91 94480 39840</a></p>
            <p>Vidyanagara, T. Dasarahalli, Bangalore</p>
          </div>
        </div>
      </div>
    </>
  );
}
