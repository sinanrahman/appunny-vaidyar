"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../ui/Section";
import Heading from "../ui/Heading";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const textLines = textRef.current?.querySelectorAll(".reveal-line");
      if (textLines) {
        gsap.fromTo(
          textLines,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "center center",
              scrub: true,
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef} className="relative overflow-hidden min-h-[100svh] flex flex-col justify-center py-32 z-10">
      <div className="max-w-[1600px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center relative">
        <div data-stone-anchor="problem" className="absolute w-4 h-4 hidden md:block" style={{ left: "50%", top: "45%" }} />
        
        {/* Supporting Masked Image */}
        <div className="md:col-span-5 md:col-start-1 relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl md:rounded-[40px] opacity-90">
          <Image 
            src="/images/11_business_card_mockup.png" 
            alt="Nature element representing imbalance" 
            fill 
            sizes="(max-width: 768px) 100vw, 50vw" 
            className="object-cover scale-105" 
          />
        </div>

        {/* Editorial Text */}
        <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center" ref={textRef}>
          <Heading level={2} className="mb-10 lg:mb-16">
            <span className="reveal-line block text-black/50 text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-2">Modern life often treats symptoms.</span>
            <span className="reveal-line block text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1]">Ayurveda seeks the root.</span>
          </Heading>
          
          <p className="reveal-line font-secondary text-lg md:text-2xl lg:text-3xl max-w-2xl leading-snug text-black/80">
            Stress, disrupted sleep, digestive discomfort and recurring body pain can be connected expressions of imbalance. Authentic Ayurvedic care begins by understanding the individual as a whole&mdash;body, mind and daily life.
          </p>
        </div>

      </div>
    </Section>
  );
}
