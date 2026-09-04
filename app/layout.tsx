import type { Metadata } from "next";
import { Manrope, Inter_Tight } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

// TODO: Load TT Firs Neue local fonts when supplied by the client. Using Manrope as fallback.

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Appunni Vaidyar Parvathy | Authentic Kerala Ayurveda & Panchakarma",
  description: "Personalized Ayurvedic care, traditional Panchakarma therapies and natural healing practices rooted in Kerala's wellness tradition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${manrope.variable} ${interTight.variable} font-primary antialiased bg-warm text-black selection:bg-primary selection:text-warm`}
      >
        <SmoothScroll>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
