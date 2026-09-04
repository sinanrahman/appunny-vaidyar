import Hero from "@/components/sections/Hero";
import StoryWrapper from "@/components/sections/StoryWrapper";
import ProblemStory from "@/components/sections/ProblemStory";
import TransformationSequence from "@/components/sections/TransformationSequence";
import Approach from "@/components/sections/Approach";


import Gallery from "@/components/sections/Gallery";
import GoogleTestimonials from "@/components/sections/GoogleTestimonials";

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


      <Gallery />
      <GoogleTestimonials />
      <JournalPreview />

    </>
  );
}
