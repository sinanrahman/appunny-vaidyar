"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./HeroStone.module.css";

gsap.registerPlugin(ScrollTrigger);

interface HeroStoneProps {
  heroRef: React.RefObject<HTMLElement | null>;
}

export default function HeroStone({ heroRef }: HeroStoneProps) {
  const stoneRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !heroRef.current || !stoneRef.current) return;

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
      .to(stoneRef.current, {
        y: "20vh", // Following user's provided code block
        scale: 0.78,
        rotation: 2,
        ease: "none",
        duration: 1
      }, 0)
      .to(stoneRef.current, {
        opacity: 0,
        ease: "none",
        duration: 0.2 // fade from 0.65 to 0.85
      }, 0.65);
    });

    return () => ctx.revert();
  }, [reducedMotion, heroRef]);

  if (reducedMotion) return null;

  return (
    <div className={styles.heroStoneLayer} aria-hidden="true">
      <Image
        ref={stoneRef}
        src="/images/appunni-ayurvedic-scroll-stone.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        width={1536}
        height={1024}
        priority
        className={styles.heroStone}
      />
    </div>
  );
}
