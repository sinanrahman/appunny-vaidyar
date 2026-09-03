import Image from "next/image";
import Link from "next/link";
import Section from "../ui/Section";

export default function Footer() {
  return (
    <footer className="bg-primary text-warm/80">
      <Section className="!py-16 md:!py-24" dark>
        <div className="max-w-[1600px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-1 flex flex-col gap-8">
              <Link href="/">
                <div className="relative w-[180px] h-[60px]">
                  <Image 
                    src="/images/03_secondary_logo.png" 
                    alt="Appunni Vaidyar Parvathy" 
                    fill
                    sizes="180px"
                    className="object-contain object-left brightness-0 invert" 
                  />
                </div>
              </Link>
              <p className="font-secondary max-w-xs">
                Traditional wisdom. Personal care. Lasting wellness.
              </p>
            </div>

            <div>
              <h4 className="font-primary text-xl text-warm mb-6">Explore</h4>
              <ul className="flex flex-col gap-3 font-secondary">
                <li><Link href="/approach" className="hover:text-warm transition-colors">Our Approach</Link></li>
                <li><Link href="/treatments" className="hover:text-warm transition-colors">Treatments</Link></li>
                <li><Link href="/practitioner" className="hover:text-warm transition-colors">Practitioner</Link></li>
                <li><Link href="/journal" className="hover:text-warm transition-colors">Journal</Link></li>
                <li><Link href="/faq" className="hover:text-warm transition-colors">FAQ</Link></li>
                <li><Link href="/about" className="hover:text-warm transition-colors">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-primary text-xl text-warm mb-6">Contact</h4>
              <ul className="flex flex-col gap-3 font-secondary">
                <li><Link href="/contact" className="hover:text-warm transition-colors text-warm">Book Consultation</Link></li>
                <li><a href="tel:+919448039840" className="hover:text-warm transition-colors">+91 94480 39840 (Primary)</a></li>
                <li><a href="tel:+919341310462" className="hover:text-warm transition-colors">+91 93413 10462</a></li>
                <li><a href="tel:+917094417500" className="hover:text-warm transition-colors">+91 70944 17500</a></li>
                <li>
                  <a 
                    href="https://wa.me/919448039840?text=Hello%20Appunni%20Vaidyar%20Parvathy%2C%20I%20would%20like%20to%20book%20an%20Ayurvedic%20consultation." 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-warm transition-colors text-warm mt-2 inline-block"
                  >
                    WhatsApp Chat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-primary text-xl text-warm mb-6">Visit</h4>
              <address className="not-italic font-secondary mb-6 max-w-xs">
                No. 251, Sri Sai Nivas, Ground Floor, 1st Main Road, Vidyanagara, T. Dasarahalli, Bangalore, Karnataka 560057, India
              </address>
              <div className="font-secondary space-y-2 mt-4 text-warm/70">
                <p>Consultations by appointment &mdash;</p>
                <p>please call to confirm availability.</p>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-warm/20 flex flex-col md:flex-row items-center justify-between gap-6 font-secondary text-sm">
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-warm transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-warm transition-colors">Terms of Service</Link>
            </div>
            
            <p className="text-center md:text-right max-w-2xl text-warm/50 text-xs">
              <strong>Medical Disclaimer:</strong> This website provides educational information about traditional Ayurveda and does not substitute professional medical advice, diagnosis, or treatment. Urgent symptoms require appropriate emergency medical care. Suitability for specific therapies is determined only after individual consultation.
            </p>
          </div>
          
          <div className="mt-8 text-center text-warm/40 text-sm font-secondary">
            &copy; {new Date().getFullYear()} Appunni Vaidyar Parvathy. All rights reserved.
          </div>

        </div>
      </Section>
    </footer>
  );
}
