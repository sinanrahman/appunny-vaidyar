"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Heading from "../ui/Heading";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function TransformationSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate text overlays sequentially
      textRefs.current.forEach((text, i) => {
        if (!text) return;
        const total = textRefs.current.length;
        const startPercent = (i / total) * 100;
        const endPercent = ((i + 1) / total) * 100;

        gsap.fromTo(
          text,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${startPercent}% center`,
              end: `${startPercent + 15}% center`,
              scrub: true,
            },
          }
        );
        
        // Fade out except the last one
        if (i < total - 1) {
          gsap.to(text, {
            opacity: 0,
            y: -30,
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${endPercent - 15}% center`,
              end: `${endPercent}% center`,
              scrub: true,
            },
          });
        }
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="relative w-full py-32 bg-primary text-warm flex flex-col items-center justify-center gap-12">
        <Image src="/images/10_product_packaging_mockup.png" alt="Ayurvedic Preparation" width={600} height={400} className="object-cover rounded-2xl opacity-60" />
        <div className="relative z-10 text-center max-w-4xl px-6">
          <Heading level={2} className="mb-6">Understand the individual.</Heading>
          <Heading level={2} className="mb-6 text-warm/70">Restore the natural rhythm.</Heading>
          <Heading level={2} className="text-warm/40">Support lasting wellness.</Heading>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-primary">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Ambient background visuals */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
          <Image 
            src="/images/10_product_packaging_mockup.png" 
            alt="Ayurvedic Preparation" 
            fill
            sizes="100vw"
            className="object-cover" 
          />
        </div>
        
        {/* Soft lighting overlay to focus the center stone */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,104,57,0.9)_70%)] z-10 pointer-events-none" />

        {/* Text Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="absolute inset-0 flex items-center justify-center" ref={(el) => { textRefs.current[0] = el; }}>
            <Heading level={2} className="text-warm text-center max-w-4xl drop-shadow-lg">
              Understand the individual.
            </Heading>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0" ref={(el) => { textRefs.current[1] = el; }}>
            <Heading level={2} className="text-warm text-center max-w-4xl drop-shadow-lg">
              Restore the natural rhythm.
            </Heading>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0" ref={(el) => { textRefs.current[2] = el; }}>
            <Heading level={2} className="text-warm text-center max-w-4xl drop-shadow-lg">
              Support lasting wellness.
            </Heading>
          </div>
        </div>
      </div>
    </section>
  );
}
