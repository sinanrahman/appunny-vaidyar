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
    if (reducedMotion || !footerRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const staggerElements = gsap.utils.toArray(".footer-stagger");
      const contactBlock = document.querySelector(`.${styles.contactFeature}`);
      const bottomLogo = document.querySelector(`.${styles.bottomLogo}`);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      // Set initial states
      gsap.set(staggerElements, { opacity: 0, y: 18 });
      if (contactBlock) gsap.set(contactBlock, { opacity: 0, x: 20 });
      if (bottomLogo) gsap.set(bottomLogo, { opacity: 0, y: 30, scale: 0.9 });

      const duration = 0.8;
      const ease = "power3.out";

      tl.to(staggerElements, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        stagger: 0.05,
      }, 0)
      .to(contactBlock, {
        opacity: 1,
        x: 0,
        duration,
        ease,
      }, 0.2)
      .to(bottomLogo, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease,
      }, 0.3);

    }, footerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <div className={styles.footerTop}>
        <nav aria-label="Footer navigation" className={styles.footerColumns}>
          {/* Explore */}
          <div>
            <h2 className={`footer-stagger ${styles.footerHeading}`}>Explore</h2>
            <Link href="/approach" className={`footer-stagger ${styles.footerLink}`}>Our Approach</Link>
            <Link href="/treatments" className={`footer-stagger ${styles.footerLink}`}>Treatments</Link>
            <Link href="/practitioner" className={`footer-stagger ${styles.footerLink}`}>Practitioner</Link>
            <Link href="/journal" className={`footer-stagger ${styles.footerLink}`}>Journal</Link>
            <Link href="/faq" className={`footer-stagger ${styles.footerLink}`}>FAQ</Link>
            <Link href="/about" className={`footer-stagger ${styles.footerLink}`}>About Us</Link>
          </div>

          {/* Treatments */}
          <div>
            <h2 className={`footer-stagger ${styles.footerHeading}`}>Treatments</h2>
            <Link href="/treatments/panchakarma" className={`footer-stagger ${styles.footerLink}`}>Panchakarma</Link>
            <Link href="/treatments/herbal-medicines" className={`footer-stagger ${styles.footerLink}`}>Herbal Medicines</Link>
            <Link href="/treatments/consultations" className={`footer-stagger ${styles.footerLink}`}>Ayurvedic Consultations</Link>
            <Link href="/treatments/rejuvenation" className={`footer-stagger ${styles.footerLink}`}>Wellness & Rejuvenation</Link>
          </div>

          {/* Contact */}
          <div>
            <h2 className={`footer-stagger ${styles.footerHeading}`}>Contact</h2>
            <Link href="/contact" className={`footer-stagger ${styles.footerLink}`}>Book Consultation</Link>
            <a href="https://wa.me/919448039840" target="_blank" rel="noopener noreferrer" className={`footer-stagger ${styles.footerLink}`}>WhatsApp Chat</a>
            <Link href="/privacy" className={`footer-stagger ${styles.footerLink}`}>Privacy Policy</Link>
            <Link href="/terms" className={`footer-stagger ${styles.footerLink}`}>Terms of Service</Link>
            
            <div className="mt-4">
              <a href="tel:+919341310462" className={`footer-stagger ${styles.footerTextLight}`}>+91 93413 10462</a>
              <a href="tel:+917094417500" className={`footer-stagger ${styles.footerTextLight}`}>+91 70944 17500</a>
            </div>
          </div>

          {/* Visit */}
          <div>
            <h2 className={`footer-stagger ${styles.footerHeading}`}>Visit</h2>
            <address className={`footer-stagger ${styles.footerText} not-italic`}>
              VIDYANAGARA<br />
              T. DASARAHALLI<br />
              BANGALORE 560057
            </address>
            <p className={`footer-stagger ${styles.footerTextLight} mt-4`}>
              Consultations by appointment
            </p>
          </div>
        </nav>

        <div className={styles.contactFeature}>
          <p className={styles.contactEyebrow}>
            HAVE QUESTIONS?<br />
            SPEAK WITH OUR CARE TEAM:
          </p>

          <a href="tel:+919448039840" className={styles.primaryContact}>
            +91 94480 39840
          </a>

          <a
            href="https://wa.me/919448039840"
            className={styles.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Primary &amp; WhatsApp
          </a>
        </div>
      </div>

      <div className={styles.disclaimer}>
        Medical Disclaimer: Website information is educational and does not replace professional medical advice, diagnosis or treatment. Suitability for therapies is determined only after individual consultation.
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} APPUNNI VAIDYAR PARVATHY
        </div>

        <Link href="/" className={styles.bottomLogo} aria-label="Appunni Vaidyar Parvathy — Home">
          <Image
            src="/images/04_logo_mark.png"
            alt=""
            width={1536}
            height={1536}
            className={styles.bottomLogoImage}
          />
        </Link>

        <div className={styles.legalLinks}>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
