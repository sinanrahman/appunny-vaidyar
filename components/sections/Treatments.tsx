"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "../ui/Section";
import Heading from "../ui/Heading";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Panchakarma Treatments",
    desc: "Authentic detoxification and purification therapies to restore balance.",
    img: "/images/05_brand_poster_wellness.png",
    slug: "panchakarma",
  },
  {
    title: "Herbal Medicines",
    desc: "Natural preparations tailored to support your unique constitution.",
    img: "/images/06_brand_poster_herbs.png",
    slug: "herbal-medicines",
  },
  {
    title: "Ayurvedic Consultations",
    desc: "In-depth health assessment by our experienced Parambara Vaidyar.",
    img: "/images/07_brand_poster_ayurveda.png",
    slug: "consultations",
  },
  {
    title: "Wellness & Rejuvenation",
    desc: "Therapies to renew vitality, relieve stress and promote longevity.",
    img: "/images/12_treatment_room_mockup.png",
    slug: "rejuvenation",
  },
];

export default function Treatments() {
  return (
    <Section className="bg-white">
      <div className="max-w-[1600px] mx-auto">
        <Heading level={2} className="mb-16">Care Designed Around You.</Heading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {services.map((service, index) => (
            <Link 
              href={`/treatments/${service.slug}`} 
              key={index}
              className="group block relative w-full aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl bg-warm/50"
            >
              <Image 
                src={service.img} 
                alt={service.title} 
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                  <Heading level={3} className="text-warm mb-3">{service.title}</Heading>
                  <p className="text-warm/80 font-secondary text-lg mb-6">{service.desc}</p>
                  
                  <div className="inline-flex items-center text-warm font-secondary font-medium tracking-wide">
                    <span>View Treatment</span>
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
