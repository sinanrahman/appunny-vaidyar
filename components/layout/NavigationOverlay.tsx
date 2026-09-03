"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import Heading from "../ui/Heading";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NavigationOverlay({ isOpen, onClose }: NavigationOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current || !bgRef.current) return;

    const links = linksRef.current.querySelectorAll("li");

    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.8,
        ease: "power3.inOut",
      });

      gsap.fromTo(
        bgRef.current,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 0.2, duration: 1.2, ease: "power2.out", delay: 0.2 }
      );

      gsap.fromTo(
        links,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.4 }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.6,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Our Approach", href: "/approach" },
    { label: "Treatments", href: "/treatments" },
    { label: "Practitioner", href: "/practitioner" },
    { label: "Journal", href: "/journal" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div
      ref={overlayRef}
      className={cn(
        "fixed inset-0 z-40 bg-primary text-warm flex items-center pt-24",
        !isOpen && "pointer-events-none"
      )}
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
    >
      <div 
        ref={bgRef} 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      >
        <Image 
          src="/images/06_brand_poster_herbs.png" 
          alt="Herbs" 
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-[clamp(20px,4vw,72px)] grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <ul ref={linksRef} className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  onClick={onClose}
                  className="font-primary text-5xl md:text-7xl lg:text-[6rem] leading-none tracking-tight hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex flex-col justify-end pb-12 gap-8">
          <div>
            <h4 className="font-secondary font-medium uppercase tracking-widest text-sm mb-4 opacity-70">Contact</h4>
            <div className="flex flex-col gap-2 font-secondary text-lg">
              <a href="tel:+919448039840" className="hover:opacity-70 transition-opacity">+91 94480 39840</a>
              <a href="https://wa.me/919448039840" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">WhatsApp Chat</a>
            </div>
          </div>
          <div>
            <h4 className="font-secondary font-medium uppercase tracking-widest text-sm mb-4 opacity-70">Location</h4>
            <p className="font-secondary text-lg max-w-sm">
              No. 251, Sri Sai Nivas, Ground Floor, 1st Main Road, Vidyanagara, T. Dasarahalli, Bangalore, Karnataka 560057
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
