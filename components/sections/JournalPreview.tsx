"use client";

import Image from "next/image";
import Link from "next/link";
import Section from "../ui/Section";
import Heading from "../ui/Heading";

const journalPosts = [
  {
    title: "Understanding Your Ayurvedic Constitution (Prakriti)",
    category: "Ayurveda Education",
    img: "/images/07_brand_poster_ayurveda.png",
    slug: "understanding-prakriti",
  },
  {
    title: "Daily Habits for Better Digestion and Sleep",
    category: "Daily Wellbeing",
    img: "/images/06_brand_poster_herbs.png",
    slug: "daily-habits",
  },
  {
    title: "How to Prepare for Your First Panchakarma",
    category: "Panchakarma Preparation",
    img: "/images/05_brand_poster_wellness.png",
    slug: "panchakarma-preparation",
  },
];

export default function JournalPreview() {
  return (
    <Section className="bg-warm">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-12 md:mb-16 gap-4 md:gap-6">
          <Heading level={2}>From Our Healing Tradition.</Heading>
          <Link href="/journal" className="font-secondary font-medium hover:opacity-70 transition-opacity">
            View All Articles
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journalPosts.map((post, index) => (
            <Link 
              key={index} 
              href={`/journal/${post.slug}`}
              className="group flex flex-col gap-6"
            >
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-black/5">
                <Image 
                  src={post.img} 
                  alt={post.title} 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div>
                <span className="type-label text-primary mb-3 block">
                  {post.category}
                </span>
                <Heading level={4} className="group-hover:text-primary transition-colors min-h-[3em] md:min-h-[3.6em]">
                  {post.title}
                </Heading>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
