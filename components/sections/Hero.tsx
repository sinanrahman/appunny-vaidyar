"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      const headings = textRef.current!.querySelectorAll("h1 > span.line");
      
      gsap.to(imageRef.current, {
        scale: 1.04,
        duration: 10,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        headings,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.5 }
      );
      
      const pAndBtns = textRef.current!.querySelectorAll(".reveal-up");
      gsap.fromTo(
        pAndBtns,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out", delay: 1 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] min-h-[700px] flex items-center pb-20 pt-32 overflow-hidden bg-black text-warm"
    >
      <div className="absolute inset-0 z-0">
        <div data-stone-anchor="hero" className="absolute w-4 h-4" style={{ left: "65.5%", top: "40.5%" }} />
        <Image
          ref={imageRef}
          src="/images/01_hero_reference.png"
          alt="Ayurveda, Rooted in Tradition"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[clamp(20px,4vw,72px)] flex flex-col justify-center h-full mt-24">
        <div ref={textRef} className="w-full md:w-7/12 xl:w-1/2">
          <h1 className="font-primary font-medium tracking-tight text-[clamp(3.5rem,7vw,7.5rem)] leading-[0.9] mb-8">
            <span className="line block">Ayurveda, Rooted</span>
            <span className="line block">in Tradition.</span>
            <span className="line block text-warm/70 mt-2">Healing, Made Personal.</span>
          </h1>
          
          <p className="reveal-up font-secondary text-lg md:text-xl max-w-lg mb-10 text-warm/90 leading-relaxed">
            Authentic Panchakarma therapies, natural healing practices and compassionate care, guided by wisdom passed down through generations.
          </p>
          
          <div className="reveal-up flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Begin Your Healing Journey
            </Button>
            <Button href="/approach" variant="outline" className="border-warm text-warm hover:bg-warm hover:text-black">
              Explore Our Approach
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
