"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Heading from "../ui/Heading";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function TransformationSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);
  
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    
    if (mediaQuery.matches || !containerRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // We mock the frame count based on desktop/mobile
    const isMobile = window.innerWidth < 768;
    const frameCount = isMobile ? 60 : 120;
    const images: HTMLImageElement[] = [];
    const imageSequence = { frame: 0 };
    
    // Instead of loading actual non-existent frames which would cause 404s, 
    // we'll draw a placeholder effect or use the fallback image if frames fail to load.
    // In a real scenario with frames: 
    // const currentFrame = (index: number) => `/sequence/${isMobile ? 'mobile' : 'desktop'}/frame_${String(index + 1).padStart(4, '0')}.webp`;
    
    // Mock rendering for development: just draw the fallback image for now to avoid 404s.
    const render = () => {
      // Clear and draw fallback if no sequence available
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Real render logic would draw images[imageSequence.frame]
    };

    gsap.to(imageSequence, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
      onUpdate: render,
    });

    // Animate text overlays
    const texts = [textRef1.current, textRef2.current, textRef3.current];
    texts.forEach((text, i) => {
      if (!text) return;
      gsap.fromTo(
        text,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${25 * (i + 1)}% center`,
            end: `${25 * (i + 1) + 15}% center`,
            scrub: true,
          },
        }
      );
    });

  }, []);

  if (reducedMotion) {
    return (
      <section className="relative w-full h-[100svh] bg-black text-warm flex items-center justify-center">
        <Image src="/images/01_hero_reference.png" alt="Return to Balance" fill sizes="100vw" className="object-cover opacity-50" />
        <div className="relative z-10 text-center">
          <Heading level={2}>Return to Balance.</Heading>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* Fallback image shown behind canvas or when canvas is empty */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/01_hero_reference.png" 
            alt="Transformation" 
            fill
            sizes="100vw"
            className="object-cover opacity-40" 
          />
        </div>
        
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full object-cover z-10"
        />

        {/* Text Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="absolute inset-0 flex items-center justify-center" ref={textRef1}>
            <Heading level={2} className="text-warm text-center max-w-4xl drop-shadow-lg">
              Understand the individual.
            </Heading>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0" ref={textRef2}>
            <Heading level={2} className="text-warm text-center max-w-4xl drop-shadow-lg">
              Restore the natural rhythm.
            </Heading>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0" ref={textRef3}>
            <Heading level={2} className="text-warm text-center max-w-4xl drop-shadow-lg">
              Support lasting wellness.
            </Heading>
          </div>
        </div>
      </div>
    </section>
  );
}
