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
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Reveal text lines
    const textLines = textRef.current?.querySelectorAll(".reveal-line");
    if (textLines) {
      gsap.fromTo(
        textLines,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        }
      );
    }

    // Parallax images
    imageRefs.current.forEach((img, i) => {
      if (img) {
        gsap.to(img, {
          yPercent: i % 2 === 0 ? -20 : 20,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });
  }, []);

  return (
    <Section ref={containerRef} dark className="relative overflow-hidden min-h-[120svh] flex flex-col justify-center">
      
      {/* Background/Floating Images */}
      <div 
        ref={(el) => { imageRefs.current[0] = el; }} 
        className="absolute top-20 right-10 md:right-[10%] w-[40vw] max-w-[300px] aspect-[3/4] opacity-40 mix-blend-luminosity overflow-hidden rounded-2xl"
      >
        <Image src="/images/11_business_card_mockup.png" alt="Tension" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>

      <div 
        ref={(el) => { imageRefs.current[1] = el; }} 
        className="absolute bottom-20 left-10 md:left-[10%] w-[50vw] max-w-[400px] aspect-square opacity-30 mix-blend-luminosity overflow-hidden rounded-2xl"
      >
        <Image src="/images/08_reception_mockup.png" alt="Rest" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto" ref={textRef}>
        <Heading level={2} className="mb-12">
          <span className="reveal-line block text-warm/50">Modern life often treats symptoms.</span>
          <span className="reveal-line block">Ayurveda seeks the root.</span>
        </Heading>
        
        <p className="reveal-line font-secondary text-xl md:text-3xl max-w-3xl leading-relaxed text-warm/80">
          Stress, disrupted sleep, digestive discomfort and recurring body pain can be connected expressions of imbalance. Authentic Ayurvedic care begins by understanding the individual as a whole - body, mind and daily life.
        </p>
      </div>
    </Section>
  );
}
