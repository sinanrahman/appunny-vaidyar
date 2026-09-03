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
      <div className="relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
        
        {/* Signboard Visual */}
        <div className="lg:col-span-5 relative w-full aspect-[4/5] overflow-hidden rounded-[2rem] opacity-90">
          <Image src="/images/09_signboard_mockup.png" alt="Heritage Concept" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Heading level={2} className="mb-10 text-warm">Wisdom Passed Down.<br/>Care Made Personal.</Heading>
          
          <div className="space-y-8 font-secondary text-lg text-warm/80 max-w-xl mb-16">
            <p>
              <strong>Our Vision:</strong> To become a trusted Ayurvedic wellness destination that preserves traditional healing wisdom while inspiring healthier, more balanced lives for generations to come.
            </p>
            <p>
              <strong>Our Mission:</strong> To provide authentic, personalized Ayurvedic care through traditional Panchakarma therapies, natural healing practices, and compassionate patient care - while staying true to the knowledge and values passed down through generations.
            </p>
          </div>
          
          <div className="pt-12 border-t border-warm/20 flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Reserved Practitioner Portrait Placeholder */}
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-warm/10 flex items-center justify-center flex-shrink-0">
              <span className="font-secondary text-warm/40 text-xs text-center px-4 uppercase tracking-widest leading-relaxed">
                Portrait Reserved
              </span>
            </div>
            <div>
              <h3 className="font-primary text-3xl text-warm mb-2">Prem Kumar P V</h3>
              <p className="font-secondary text-warm/70 uppercase tracking-widest text-sm mb-6">Parambara Vaidyar</p>
              <Button href="/practitioner" variant="outline" className="border-warm text-warm hover:bg-warm hover:text-black">
                Read Practitioner Profile
              </Button>
            </div>
          </div>
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
