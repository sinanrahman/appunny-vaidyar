"use client";

import Image from "next/image";
import Section from "../ui/Section";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

// Hidden stats until actual data is provided by the client
const stats = [
  { label: "YEARS OF TRADITION", value: "" },
  { label: "PATIENTS CARED FOR", value: "" },
  { label: "THERAPIES OFFERED", value: "" },
  { label: "COMMUNITIES / REGIONS SERVED", value: "" },
];

export default function Heritage() {
  const hasStats = stats.some(stat => stat.value.trim() !== "");

  return (
    <Section dark className="relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <Image src="/images/09_signboard_mockup.png" alt="Heritage Texture" fill sizes="100vw" className="object-cover" />
      </div>
      
      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <Heading level={2} className="mb-10 text-warm">Wisdom Passed Down.<br/>Care Made Personal.</Heading>
          
          <div className="space-y-8 font-secondary text-lg text-warm/80 max-w-xl">
            <p>
              <strong>Our Vision:</strong> To become a trusted Ayurvedic wellness destination that preserves traditional healing wisdom while inspiring healthier, more balanced lives for generations to come.
            </p>
            <p>
              <strong>Our Mission:</strong> To provide authentic, personalized Ayurvedic care through traditional Panchakarma therapies, natural healing practices, and compassionate patient care - while staying true to the knowledge and values passed down through generations.
            </p>
          </div>
          
          <div className="mt-12 pt-12 border-t border-warm/20">
            <h3 className="font-primary text-3xl text-warm mb-2">Prem Kumar P V</h3>
            <p className="font-secondary text-warm/70 uppercase tracking-widest text-sm mb-6">Parambara Vaidyar</p>
            <Button href="/practitioner" variant="outline" className="border-warm text-warm hover:bg-warm hover:text-black">
              Read Practitioner Profile
            </Button>
          </div>
        </div>
        
        <div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[3/4] rounded-2xl overflow-hidden">
          {/* Temporary visual direction. To be replaced with real practitioner portrait. */}
          <Image 
            src="/images/13_uniform_mockup.png" 
            alt="Prem Kumar P V, Parambara Vaidyar" 
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {hasStats && (
        <div className="relative z-10 max-w-[1600px] mx-auto mt-24 pt-16 border-t border-warm/20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            stat.value && (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-primary text-5xl md:text-6xl text-warm">{stat.value}</span>
                <span className="font-secondary text-sm md:text-base uppercase tracking-widest text-warm/60">
                  {stat.label}
                </span>
              </div>
            )
          ))}
        </div>
      )}
    </Section>
  );
}
