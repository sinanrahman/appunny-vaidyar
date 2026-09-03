import Hero from "@/components/sections/Hero";
import StoryWrapper from "@/components/sections/StoryWrapper";
import ProblemStory from "@/components/sections/ProblemStory";
import TransformationSequence from "@/components/sections/TransformationSequence";
import Approach from "@/components/sections/Approach";
import Treatments from "@/components/sections/Treatments";
import Heritage from "@/components/sections/Heritage";
import Gallery from "@/components/sections/Gallery";
import GoogleTestimonials from "@/components/sections/GoogleTestimonials";
import ConsultationCTA from "@/components/sections/ConsultationCTA";
import JournalPreview from "@/components/sections/JournalPreview";

export default function Home() {
  return (
    <>
      <StoryWrapper>
        <Hero />
        <ProblemStory />
        <TransformationSequence />
        <Approach />
      </StoryWrapper>
      <Heritage />
      <Treatments />
      <Gallery />
      <GoogleTestimonials />
      <JournalPreview />
      <ConsultationCTA />
    </>
  );
}
