"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingAyurvedaStone() {
  const stoneLayerRef = useRef<HTMLDivElement>(null);
  const stoneRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !stoneLayerRef.current || !stoneRef.current) return;

    let masterTl: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      // Rebuild on refresh to get accurate measurements
      ScrollTrigger.addEventListener("refreshInit", () => {
        if (masterTl) masterTl.kill();
      });

      ScrollTrigger.addEventListener("refresh", () => {
        if (masterTl) masterTl.kill();
        
        const isMobile = window.innerWidth < 768;
        const maxScroll = ScrollTrigger.maxScroll(window);
        const anchors = Array.from(document.querySelectorAll("[data-stone-anchor]"));
        
        if (anchors.length === 0 || maxScroll === 0) return;

        interface Waypoint {
          id: string | null;
          S: number;
          vpX: number;
          vpY: number;
          scale: number;
          rotation: number;
          opacity: number;
          clipBottom: number;
        }

        const waypoints: Waypoint[] = [];

        anchors.forEach((anchor) => {
          const id = anchor.getAttribute("data-stone-anchor");
          const rect = anchor.getBoundingClientRect();
          const unpinnedPageY = rect.top + window.scrollY;
          const unpinnedPageX = rect.left + window.scrollX;
          
          let S = 0, vpX = rect.left, vpY = rect.top;
          let scale = 1, rotation = 0, opacity = 1, clipBottom = 0;

          if (id === "hero") {
            S = 0;
            vpX = unpinnedPageX;
            vpY = unpinnedPageY;
            scale = isMobile ? 0.6 : 0.82; 
            rotation = -7;
          } 
          else if (id === "problem") {
            S = unpinnedPageY - window.innerHeight * 0.5;
            vpX = unpinnedPageX;
            vpY = window.innerHeight * 0.5;
            scale = isMobile ? 0.55 : 0.74; 
            rotation = -2;
          } 
          else if (id?.startsWith("green")) {
            const section = anchor.closest("section");
            const sectionTop = section ? section.getBoundingClientRect().top + window.scrollY : unpinnedPageY;
            
            if (id === "green-intro") {
              S = sectionTop + window.innerHeight * 0.2;
            } else if (id === "green-middle") {
              S = sectionTop + window.innerHeight * 0.6;
            } else {
              S = sectionTop + window.innerHeight * 0.8;
            }
            vpX = unpinnedPageX;
            vpY = unpinnedPageY - sectionTop + (window.innerHeight * 0.2); // approx fixed pos
            scale = isMobile ? 0.5 : 0.66; 
            rotation = 2;
          } 
          else if (id?.startsWith("approach")) {
            if (id === "approach-start") {
              S = unpinnedPageY - window.innerHeight * 0.2;
              vpY = window.innerHeight * 0.2;
            } else if (id === "approach-middle") {
              S = unpinnedPageY - window.innerHeight * 0.5;
              vpY = window.innerHeight * 0.5;
            } else {
              S = unpinnedPageY - window.innerHeight * 0.7;
              vpY = window.innerHeight * 0.7;
            }
            vpX = unpinnedPageX;
            scale = isMobile ? 0.45 : 0.62; 
            rotation = 0;
          } 
          else if (id === "oil-contact") {
            S = unpinnedPageY - window.innerHeight * 0.7;
            vpX = unpinnedPageX;
            vpY = window.innerHeight * 0.7;
            scale = isMobile ? 0.4 : 0.52; 
            rotation = 8;
          } 
          else if (id === "oil-submerged") {
            S = unpinnedPageY - window.innerHeight * 0.5;
            vpX = unpinnedPageX;
            vpY = window.innerHeight * 0.5 + 20; // drop a bit below contact
            scale = isMobile ? 0.35 : 0.46; 
            rotation = 11;
            clipBottom = 100; // full hide from bottom
            opacity = 0; // fade out once fully submerged
          }

          // ensure S is within bounds
          S = Math.max(0, Math.min(S, maxScroll));

          waypoints.push({ id, S, vpX, vpY, scale, rotation, opacity, clipBottom });
        });

        waypoints.sort((a, b) => a.S - b.S);

        masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          }
        });

        // Track custom clip prop
        const stoneObj = { clipBottom: 0 };

        let prevS = 0;
        waypoints.forEach((wp, index) => {
          if (index === 0) {
            gsap.set(stoneRef.current, { 
              x: wp.vpX, 
              y: wp.vpY, 
              scale: wp.scale, 
              rotation: wp.rotation,
              opacity: wp.opacity,
              xPercent: -50,
              yPercent: -50
            });
            stoneObj.clipBottom = wp.clipBottom;
          } else {
            const duration = (wp.S - prevS) / maxScroll;
            if (duration > 0) {
              masterTl!.to(stoneRef.current, {
                x: wp.vpX,
                y: wp.vpY,
                scale: wp.scale,
                rotation: wp.rotation,
                opacity: wp.opacity,
                ease: "power1.inOut",
                duration: duration
              }, prevS / maxScroll);

              masterTl!.to(stoneObj, {
                clipBottom: wp.clipBottom,
                ease: "power1.inOut",
                duration: duration,
                onUpdate: () => {
                  if (stoneRef.current) {
                    stoneRef.current.style.clipPath = `inset(0 0 ${stoneObj.clipBottom}% 0)`;
                  }
                }
              }, prevS / maxScroll);
            }
            prevS = wp.S;
          }
        });
      });

      // trigger initial measure
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div className="absolute top-[40%] right-[32%] -translate-x-1/2 -translate-y-1/2 w-32 md:w-48 aspect-square pointer-events-none z-30" aria-hidden="true">
        <Image
          src="/images/appunni-ayurvedic-scroll-stone.png"
          alt=""
          fill
          priority
          sizes="200px"
          className="object-contain drop-shadow-lg"
        />
      </div>
    );
  }

  return (
    <div 
      ref={stoneLayerRef} 
      className="fixed inset-0 z-30 pointer-events-none overflow-visible"
    >
      <div 
        ref={stoneRef} 
        className="absolute left-0 top-0 w-[clamp(105px,15vw,285px)] aspect-square pointer-events-none will-change-transform origin-center"
        aria-hidden="true"
      >
        <Image
          src="/images/appunni-ayurvedic-scroll-stone.png"
          alt=""
          width={1536}
          height={1024}
          priority
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
