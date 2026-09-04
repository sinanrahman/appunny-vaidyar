"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import styles from "./ApproachStone.module.css";

gsap.registerPlugin(ScrollTrigger);

interface ApproachStoneProps {
  approachRef: React.RefObject<HTMLElement | null>;
}

export default function ApproachStone({ approachRef }: ApproachStoneProps) {
  const stoneRef = useRef<HTMLImageElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let isReady = false;
    document.fonts.ready.then(() => {
      isReady = true;
      ScrollTrigger.refresh();
    });

    if (reducedMotion || !approachRef.current || !stoneRef.current) return;

    const ctx = gsap.context(() => {
      const calculateApproachTravel = () => {
        const section = approachRef.current;
        const stone = stoneRef.current;
        if (!section || !stone) return 0;
        
        const topPadding = window.innerHeight * 0.16;
        const bottomPadding = window.innerHeight * 0.14;
        
        return Math.max(
          0,
          section.offsetHeight - stone.offsetHeight - topPadding - bottomPadding
        );
      };

      const approachTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: approachRef.current,
          start: "top 82%",
          end: "bottom 72%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      approachTimeline
        .fromTo(
          stoneRef.current,
          {
            opacity: 0,
            scale: 0.72,
            y: 24,
          },
          {
            opacity: 0.3,
            scale: 1,
            y: 0,
            duration: 0.12,
            ease: "power2.out",
          }
        )
        .to(stoneRef.current, {
          y: () => calculateApproachTravel(),
          opacity: 0.3,
          scale: 1,
          rotation: 2,
          duration: 0.88,
          ease: "none",
        });

      // Exit fade out when leaving section
      ScrollTrigger.create({
        trigger: approachRef.current,
        start: "bottom 72%",
        end: "+=150",
        scrub: true,
        animation: gsap.to(stoneRef.current, { opacity: 0, duration: 0.15, ease: "none" })
      });

      if (isReady) ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [reducedMotion, approachRef]);

  if (reducedMotion) return null;

  return (
    <div className={styles.approachStoneLayer} aria-hidden="true">
      <Image
        ref={stoneRef}
        src="/images/appunni-ayurvedic-scroll-stone.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        width={1536}
        height={1024}
        className={styles.approachStone}
      />
    </div>
  );
}
