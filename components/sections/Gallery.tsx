"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../ui/Section";
import Heading from "../ui/Heading";

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: "/images/08_reception_mockup.png", caption: "Reception" },
  { src: "/images/12_treatment_room_mockup.png", caption: "Treatment Room" },
  { src: "/images/10_product_packaging_mockup.png", caption: "Herbal Pharmacy" },
  { src: "/images/14_tote_bag_mockup.png", caption: "Relaxation Space" },
  { src: "/images/15_stationery_mockup.png", caption: "Preparation" },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;
    
    const ctx = gsap.context(() => {
      if (isDesktop && containerRef.current && sliderRef.current) {
        const scrollWidth = sliderRef.current.scrollWidth - window.innerWidth;
        
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: `+=${scrollWidth}`,
          pin: true,
          animation: gsap.to(sliderRef.current, {
            x: -scrollWidth,
            ease: "none",
          }),
          scrub: 1,
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef} className="overflow-hidden md:!py-0 h-auto md:h-[100svh] flex flex-col md:justify-center">
      <Heading level={2} className="mb-10 md:mb-16 md:absolute md:top-24 md:left-[clamp(20px,4vw,72px)] z-10">
        A Space Made for Restoration.
      </Heading>
      
      <div 
        ref={sliderRef}
        className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-8 md:pb-0 gap-6 md:gap-10 md:pl-[clamp(20px,4vw,72px)] no-scrollbar"
      >
        {images.map((img, i) => (
          <div 
            key={i} 
            className="snap-center shrink-0 w-[85vw] md:w-[60vw] max-w-[900px] flex flex-col gap-4"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl bg-black/5">
              <Image 
                src={img.src} 
                alt={img.caption} 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover" 
              />
            </div>
            <p className="font-secondary uppercase tracking-widest text-sm text-black/60">
              {img.caption}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
