import Heritage from "@/components/sections/Heritage";

export const metadata = {
  title: "About Us | Appunni Vaidyar Parvathy",
  description: "Wisdom passed down. Care made personal. Learn about our heritage.",
};

export default function AboutPage() { 
  return (
    <main className="min-h-screen bg-primary pt-24 md:pt-32 pb-16">
      <Heritage />
    </main>
  ); 
}
