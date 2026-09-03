"use client";

import Image from "next/image";
import Section from "../ui/Section";
import Heading from "../ui/Heading";
import AppointmentForm from "../forms/AppointmentForm";

export default function ConsultationCTA() {
  return (
    <Section className="relative min-h-[100svh] flex items-center justify-center !py-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/12_treatment_room_mockup.png" 
          alt="Peaceful authentic Kerala Ayurveda interior" 
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        <div className="flex flex-col justify-center text-warm">
          <Heading level={2} className="mb-8">Begin Your Healing Journey.</Heading>
          <p className="font-secondary text-xl max-w-lg mb-12 text-warm/90">
            Speak with our care team to understand the right next step for you.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a 
              href="tel:+919448039840" 
              className="inline-flex items-center justify-center rounded-full font-secondary font-medium px-8 py-4 bg-primary text-warm hover:bg-white hover:text-primary transition-colors"
            >
              Book a Consultation
            </a>
            <a 
              href="https://wa.me/919448039840?text=Hello%20Appunni%20Vaidyar%20Parvathy%2C%20I%20would%20like%20to%20book%20an%20Ayurvedic%20consultation." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full font-secondary font-medium px-8 py-4 border border-warm text-warm hover:bg-warm hover:text-black transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="space-y-8 pt-12 border-t border-warm/20">
            <div>
              <h4 className="font-secondary uppercase tracking-widest text-sm mb-4 text-warm/70">Telephone Directory</h4>
              <div className="flex flex-col gap-2 font-secondary text-lg">
                <a href="tel:+919448039840" className="hover:opacity-70 transition-opacity">+91 94480 39840 (Primary & WhatsApp)</a>
                <a href="tel:+919341310462" className="hover:opacity-70 transition-opacity">+91 93413 10462</a>
                <a href="tel:+917094417500" className="hover:opacity-70 transition-opacity">+91 70944 17500</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-secondary uppercase tracking-widest text-sm mb-4 text-warm/70">Clinic Address</h4>
              <p className="font-secondary text-lg max-w-sm">
                No. 251, Sri Sai Nivas, Ground Floor, 1st Main Road, Vidyanagara, T. Dasarahalli, Bangalore, Karnataka 560057, India
              </p>
            </div>
          </div>
        </div>

        <div className="bg-warm rounded-3xl p-8 md:p-12 shadow-2xl">
          <Heading level={4} className="mb-2">Request an Appointment</Heading>
          <p className="font-secondary text-black/60 mb-8">
            Please provide your details below and our team will contact you to confirm a suitable time.
          </p>
          <AppointmentForm />
        </div>

      </div>
    </Section>
  );
}
