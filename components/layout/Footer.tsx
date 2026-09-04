"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./Footer.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !footerRef.current) return;

    const ctx = gsap.context(() => {
      const staggerElements = gsap.utils.toArray(".footer-stagger");
      const bottomLogo = document.querySelector(`.${styles.footerLogo}`);
      
      gsap.set(staggerElements, { opacity: 0, y: 15 });
      if (bottomLogo) gsap.set(bottomLogo, { opacity: 0, y: 30, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          once: true,
        },
      });

      tl.to(staggerElements, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.04,
      }, 0)
      .to(bottomLogo, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      }, 0.2);

    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.footerTop}>
        
        {/* Column 1: Explore */}
        <nav aria-label="Explore links" className={styles.exploreCol}>
          <h2 className={`footer-stagger ${styles.colHeading}`}>Explore</h2>
          <div className={styles.linksList}>
            <Link href="/approach" className={`footer-stagger ${styles.footerLink}`}>Our Approach</Link>
            <Link href="/treatments" className={`footer-stagger ${styles.footerLink}`}>Treatments</Link>
            <Link href="/practitioner" className={`footer-stagger ${styles.footerLink}`}>Practitioner</Link>
            <Link href="/about" className={`footer-stagger ${styles.footerLink}`}>About Us</Link>
            <Link href="/contact" className={`footer-stagger ${styles.footerLink}`}>Contact</Link>
          </div>
        </nav>

        {/* Column 2: Visit */}
        <div className={styles.visitCol}>
          <div className={styles.visitColInner}>
            <h2 className={`footer-stagger ${styles.colHeading}`}>Visit</h2>
            <address className={styles.addressList}>
              <span className={`footer-stagger ${styles.footerText}`}>T. Dasarahalli</span>
              <span className={`footer-stagger ${styles.footerText}`}>Bangalore 560057</span>
              <a 
                href="https://maps.app.goo.gl/nhqMWwuahcfDHihF9?g_st=iw" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`footer-stagger ${styles.footerLinkAction} mt-2`}
              >
                View Directions
              </a>
            </address>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div className={styles.contactCol}>
          <h2 className={`footer-stagger ${styles.colHeading}`}>Contact</h2>
          <div className={styles.contactList}>
            <span className={`footer-stagger ${styles.footerTextLight}`}>Book a Consultation</span>
            <a href="tel:+919448039840" className={`footer-stagger ${styles.contactPhone}`}>
              +91 94480 39840
            </a>
            <a 
              href="https://wa.me/919448039840?text=Hello%20Appunni%20Vaidyar%20Parvathy%2C%20I%20would%20like%20to%20book%20an%20Ayurvedic%20consultation." 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`footer-stagger ${styles.footerLinkAction} mt-2`}
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerDivider}>
        <p className={`footer-stagger ${styles.disclaimer}`}>
          Website information is educational and does not replace professional medical advice. Treatment suitability is determined after individual consultation.
        </p>
      </div>

      <div className={styles.footerBottom}>
        <p className={`footer-stagger ${styles.footerCopyright}`}>
          © 2026 Appunni Vaidyar Parvathy
        </p>

        <Link href="/" className={styles.footerLogo} aria-label="Appunni Vaidyar Parvathy — Home">
          <Image
            src="/images/04_logo_mark.png"
            alt="Appunni Vaidyar Parvathy Logo Mark"
            width={1536}
            height={1536}
            className={styles.bottomLogoImage}
          />
        </Link>

        <div className={`footer-stagger ${styles.footerLegal}`}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
