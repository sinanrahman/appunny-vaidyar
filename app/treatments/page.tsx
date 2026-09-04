import Treatments from "@/components/sections/Treatments";

export const metadata = {
  title: "Treatments | Appunni Vaidyar Parvathy",
  description: "Care designed around you. Authentic detoxification and purification therapies to restore balance.",
};

export default function TreatmentsPage() { 
  return (
    <main className="min-h-screen pt-[100px] bg-warm">
      <Treatments />
    </main>
  ); 
}
