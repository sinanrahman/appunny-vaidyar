export default async function TreatmentDetailPage({ params }: { params: Promise<{ slug: string }> }) { 
  const { slug } = await params; 
  return (
    <div className="pt-32 px-[clamp(20px,4vw,72px)] text-center pb-32">
      <h1>Treatment: {slug} - Coming Soon</h1>
    </div>
  ); 
}
