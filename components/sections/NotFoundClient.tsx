"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "@/app/not-found.module.css";

export default function NotFound() {
  const leftDigitRef = useRef<HTMLSpanElement>(null);
  const rightDigitRef = useRef<HTMLSpanElement>(null);
  const logoWrapperRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      // For reduced motion, ensure elements are immediately visible
      gsap.set([
        leftDigitRef.current, 
        rightDigitRef.current, 
        logoWrapperRef.current,
        titleRef.current,
        descRef.current,
        buttonRef.current
      ], { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set(leftDigitRef.current, { opacity: 0, x: -45 });
      gsap.set(rightDigitRef.current, { opacity: 0, x: 45 });
      gsap.set(logoWrapperRef.current, { opacity: 0, scale: 0.78, rotation: -8 });
      gsap.set(titleRef.current, { opacity: 0, y: 18 });
      gsap.set(descRef.current, { opacity: 0, y: 14 });
      gsap.set(buttonRef.current, { opacity: 0, y: 12 });

      // Entrance animation
      const ease = "power3.out";
      const duration = 0.9;

      tl.to([leftDigitRef.current, rightDigitRef.current], {
        opacity: 1,
        x: 0,
        duration,
        ease,
      }, 0)
      .to(logoWrapperRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration,
        ease,
      }, 0)
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease,
      }, 0.38)
      .to(descRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease,
      }, 0.48)
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease,
      }, 0.6);

      // Subtle floating logo
      gsap.to(logoWrapperRef.current, {
        y: "-=5",
        rotation: 1.5,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: duration,
      });

    }, pageRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || !pageRef.current || !logoWrapperRef.current) return;
    
    // Check if device supports hover (desktop)
    const isTouchDevice = (("ontouchstart" in window) || (navigator.maxTouchPoints > 0));
    if (isTouchDevice) return;

    let xTo = gsap.quickTo(logoWrapperRef.current, "x", { duration: 0.6, ease: "power3" });
    let yTo = gsap.quickTo(logoWrapperRef.current, "y", { duration: 0.6, ease: "power3" });
    let rotTo = gsap.quickTo(logoWrapperRef.current, "rotation", { duration: 0.6, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = pageRef.current!.getBoundingClientRect();
      // Calculate cursor position relative to the center of the page
      const xPos = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const yPos = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      // Max translateX: 5px, translateY: 4px, rotation: 1deg
      xTo(xPos * 5);
      yTo(yPos * 4);
      rotTo(xPos * 1);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      rotTo(0);
    };

    pageRef.current.addEventListener("mousemove", handleMouseMove);
    pageRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (pageRef.current) {
        pageRef.current.removeEventListener("mousemove", handleMouseMove);
        pageRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [reducedMotion]);

  return (
    <div ref={pageRef} className={styles.notFoundPage}>
      <Header />
      
      <main className={styles.notFoundMain}>
        <div className={styles.notFoundContent}>
          <div className={styles.errorCode} aria-label="Error 404">
            <span ref={leftDigitRef} className={styles.digit}>4</span>

            <span ref={logoWrapperRef} className={styles.logoMarkWrapper} aria-hidden="true">
              <Image
                src="/images/04_logo_mark.png"
                alt=""
                width={1536}
                height={1536}
                priority
                className={styles.logoMark}
              />
            </span>

            <span ref={rightDigitRef} className={styles.digit}>4</span>
          </div>

          <h1 ref={titleRef} className={styles.title}>Page not found</h1>
          
          <p ref={descRef} className={styles.description}>
            This path may be lost, but your journey towards balance can continue. Return home to explore authentic Ayurvedic care.
          </p>

          <Link ref={buttonRef} href="/" className={styles.homeButton}>
            <span aria-hidden="true">•</span>
            <span>Back to Home</span>
            <span aria-hidden="true">•</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
