"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingAyurvedaStone() {
  const stoneRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !stoneRef.current || !containerRef.current) return;

    // Use MatchMedia for responsive animations
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop Scroll Path
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Initial State (Hero start)
      gsap.set(stoneRef.current, {
        x: "55vw",
        y: "38vh",
        scale: 0.78,
        rotationZ: -8,
        xPercent: -50,
        yPercent: -50,
      });

      tl.to(stoneRef.current, {
        x: "68vw",
        y: "52vh",
        scale: 1.08,
        rotationZ: 8,
        ease: "none",
        duration: 1, // relative to overall scrub distance
      })
      .to(stoneRef.current, {
        x: "42vw",
        y: "46vh",
        scale: 0.58,
        rotationZ: -18,
        ease: "none",
        duration: 1.5,
      })
      .to(stoneRef.current, {
        x: "50vw",
        y: "50vh",
        scale: 1.35,
        rotationZ: 0,
        ease: "none",
        duration: 2,
      })
      .to(stoneRef.current, {
        x: "18vw",
        y: "72vh",
        scale: 0.42,
        rotationZ: 22,
        opacity: 0,
        ease: "none",
        duration: 1.5,
      });

      return () => tl.kill();
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile Scroll Path
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.set(stoneRef.current, {
        x: "50vw",
        y: "30vh",
        scale: 0.8,
        rotationZ: -5,
        xPercent: -50,
        yPercent: -50,
      });

      tl.to(stoneRef.current, {
        x: "50vw",
        y: "50vh",
        scale: 1.2,
        rotationZ: 5,
        ease: "none",
        duration: 1,
      })
      .to(stoneRef.current, {
        x: "50vw",
        y: "40vh",
        scale: 0.6,
        rotationZ: -10,
        opacity: 0,
        ease: "none",
        duration: 1,
      });

      return () => tl.kill();
    });

    return () => mm.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="absolute top-[38%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[400px] aspect-square pointer-events-none z-20" aria-hidden="true">
        <Image
          src="/images/appunni-ayurvedic-scroll-stone.png"
          alt="Ayurvedic Talisman Stone"
          fill
          priority
          sizes="(max-width: 768px) 50vw, 400px"
          className="object-contain drop-shadow-2xl"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-20">
      <div 
        ref={stoneRef} 
        className="fixed top-0 left-0 w-[50vw] max-w-[500px] min-w-[200px] aspect-square pointer-events-none drop-shadow-2xl will-change-transform"
        aria-hidden="true"
      >
        <Image
          src="/images/appunni-ayurvedic-scroll-stone.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 50vw, 500px"
          className="object-contain"
        />
      </div>
    </div>
  );
}
