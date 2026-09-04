"use client";

import Image from "next/image";
import Section from "../ui/Section";
import Heading from "../ui/Heading";

export default function OilSection() {
  return (
    <Section className="relative min-h-[100svh] flex flex-col justify-end items-center !py-0 overflow-hidden text-warm z-10">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/appunni-herbal-oil-landing-background.png" 
          alt="Ayurvedic Herbal Oil" 
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Anchors for the stone */}
        <div 
          data-stone-anchor="oil-contact" 
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2" 
          style={{ left: "50%", top: "73%" }}
        />
        <div 
          data-stone-anchor="oil-submerged" 
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2" 
          style={{ left: "50%", top: "77%" }}
        />
      </div>
      
      {/* Front rim clipping mask for the stone submersion effect could be achieved with a foreground image, but since the user requested to hide the lower portion first using a clipping layer, we can create an absolute div here that acts as a mask, or just use clip-path in GSAP. The prompt said "hide the lower portion first using a foreground vessel-rim mask or clipping layer". */}

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[clamp(20px,4vw,72px)] pb-32">
        <div className="max-w-2xl">
          <Heading level={2} className="mb-6">Pure botanical oils.</Heading>
          <p className="font-secondary text-xl max-w-lg mb-8 text-warm/90">
            Our traditional preparations are crafted using authentic Ayurvedic recipes, simmered slowly to retain the life force of every herb.
          </p>
        </div>
      </div>
    </Section>
  );
}
