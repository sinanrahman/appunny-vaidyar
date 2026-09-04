"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "../ui/Section";
import Heading from "../ui/Heading";
import ApproachStone from "../animations/ApproachStone";
import styles from "../animations/ApproachStone.module.css";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Personal Consultation",
    desc: "Care begins with listening and understanding the individual.",
    img: "/images/07_brand_poster_ayurveda.png",
  },
  {
    title: "Traditional Panchakarma",
    desc: "Therapies grounded in authentic Ayurvedic knowledge and practice.",
    img: "/images/05_brand_poster_wellness.png",
  },
  {
    title: "Natural Preparations",
    desc: "Herbs, oils and traditional methods selected with care.",
    img: "/images/06_brand_poster_herbs.png",
  },
  {
    title: "Compassionate Follow-up",
    desc: "Guidance that supports balance beyond the treatment room.",
    img: "/images/12_treatment_room_mockup.png",
  },
];

export default function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only pin on desktop
    const isDesktop = window.innerWidth >= 768;
    
    const ctx = gsap.context(() => {
      if (isDesktop && containerRef.current && leftColRef.current && rightColRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
        });

        cardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0.3, scale: 0.95 },
            {
              opacity: 1,
              scale: 1,
              scrollTrigger: {
                trigger: card,
                start: "top center",
                end: "bottom center",
                scrub: true,
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={containerRef} className={`relative !py-0 w-full max-w-[1600px] mx-auto ${styles.approachSection}`}>
      <ApproachStone approachRef={containerRef} />
      
      <div className={`flex flex-col md:flex-row w-full h-full relative ${styles.approachContent}`}>
        
        {/* Left Column - Sticky on Desktop */}
        <div 
          ref={leftColRef} 
          className="w-full md:w-5/12 h-auto md:h-[100svh] flex flex-col justify-center py-20 pr-0 md:pr-12 lg:pr-24"
        >
          <Heading level={2} className="mb-8">A Complete Approach to Healing.</Heading>
          <p className="font-secondary text-lg md:text-xl text-black/80 max-w-md">
            Every journey begins with attentive consultation. Care is then personalized through traditional therapies, natural preparations and practical guidance suited to the individual&apos;s condition and way of life.
          </p>
        </div>

        {/* Right Column - Scrolling Cards */}
        <div ref={rightColRef} className="w-full md:w-7/12 flex flex-col gap-12 md:gap-16 py-10 md:py-32">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={(el) => { cardsRef.current[index] = el; }}
              className="flex flex-col gap-6"
            >
              <div className="relative w-full aspect-[4/3] md:aspect-[3/2] overflow-hidden rounded-2xl group">
                <Image 
                  src={feature.img} 
                  alt={feature.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
              <div className={index === 3 ? styles.followUpContent : ""}>
                <Heading level={4} className="mb-2">{feature.title}</Heading>
                <p className="font-secondary text-black/70 text-lg">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </Section>
  );
}
