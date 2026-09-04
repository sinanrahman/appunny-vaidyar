"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../ui/Section";
import styles from "./Gallery.module.css";
import { useReducedMotion } from "@/hooks/useReducedMotion";

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
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    const isDesktop = window.innerWidth >= 768;
    
    if (reducedMotion || !isDesktop) return;

    const ctx = gsap.context(() => {
      if (containerRef.current && sliderRef.current) {
        // Calculate scroll width based on the actual padding and gaps
        const calculateScrollWidth = () => {
          if (!sliderRef.current) return 0;
          return sliderRef.current.scrollWidth - window.innerWidth;
        };
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${calculateScrollWidth()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        tl.to(sliderRef.current, {
          x: () => -calculateScrollWidth(),
          ease: "none",
        });

        if (progressRef.current) {
          gsap.to(progressRef.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: () => `+=${calculateScrollWidth()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });
        }
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <Section className="!p-0 w-full bg-white">
      <div ref={containerRef} className="relative w-full overflow-x-clip flex flex-col justify-start pt-[100px] min-h-[80svh]">
      <div className={styles.galleryHeading}>
        <h2>A Space Made for Restoration.</h2>
      </div>
      
      <div className="relative w-full">
        <div 
          ref={sliderRef}
          className="flex overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-6 md:gap-10 px-5 md:px-0 md:pl-[clamp(24px,4vw,72px)] md:pr-[clamp(24px,4vw,72px)] no-scrollbar w-full md:w-max pb-16 md:pb-24"
        >
          {images.map((img, i) => (
            <div 
              key={i} 
              className="snap-center shrink-0 w-[85vw] md:w-[min(45vw,700px)] flex flex-col gap-4 md:gap-5"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-2xl bg-warm/50">
                <Image 
                  src={img.src} 
                  alt={img.caption} 
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover" 
                />
              </div>
              <p className="type-label text-black/60 pl-2 uppercase tracking-widest text-xs md:text-sm">
                {img.caption}
              </p>
            </div>
          ))}
          
          {/* Spacer for mobile to ensure the last item can be scrolled to the center and caption doesn't get clipped by edge */}
          <div className="md:hidden shrink-0 w-[4vw]" aria-hidden="true" />
        </div>

        {/* Mobile scroll indicator */}
        <div className="md:hidden flex justify-center pb-10">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-black/10 text-[10px] uppercase tracking-widest text-black/60 bg-white shadow-sm">
            <span>Swipe to View All</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
            </svg>
          </div>
        </div>

        {/* Progress Bar for Desktop */}
        <div className="hidden md:block absolute bottom-8 left-[clamp(24px,4vw,72px)] right-[clamp(24px,4vw,72px)] h-[1px] bg-black/10">
          <div ref={progressRef} className="h-full bg-black origin-left scale-x-0" />
        </div>
        </div>
      </div>
    </Section>
  );
}
