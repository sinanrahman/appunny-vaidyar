"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Section from "../ui/Section";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GoogleReview {
  name: string;
  originalText: { text: string; languageCode: string };
  rating: number;
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  relativePublishTimeDescription: string;
}

interface GooglePlaceDetails {
  displayName: { text: string };
  rating: number;
  userRatingCount: number;
  googleMapsUri: string;
  reviews: GoogleReview[];
}

export default function GoogleReviews() {
  const [data, setData] = useState<GooglePlaceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 3 : 1);
    };
    handleResize(); // Set initial
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/google-reviews");
        const json = await res.json();
        
        if (!res.ok || json.error) {
          setError(true);
        } else {
          setData(json);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const nextSlide = () => {
    if (data?.reviews && currentIndex < data.reviews.length - itemsPerPage) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Default clinic maps link if API fails
  const fallbackMapsLink = "https://www.google.com/maps/search/?api=1&query=Appunni+Vaidyar+Parvathy+Ayurjeeva+Panchakarma+Chikitsalaya+Bangalore";

  if (loading) {
    return (
      <Section className="bg-[#FAF9F6] min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 opacity-50">
          <div className="w-8 h-8 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          <p className="font-secondary text-sm tracking-widest uppercase">Loading Reviews...</p>
        </div>
      </Section>
    );
  }

  if (error || !data || !data.reviews || data.reviews.length === 0) {
    return (
      <Section className="bg-[#FAF9F6] flex flex-col items-center text-center py-32">
        <Heading level={3} as="h2" className="mb-4 md:mb-5 max-w-[600px]">Patient Experiences</Heading>
        <p className="type-body text-black/70 mb-6 md:mb-8 max-w-[580px]">
          Read authentic experiences and reviews from our patients directly on Google Maps.
        </p>
        <Button href={data?.googleMapsUri || fallbackMapsLink} external variant="outline" className="border-black/20">
          View on Google Maps
        </Button>
      </Section>
    );
  }

  return (
    <Section className="bg-[#FAF9F6] relative">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <Heading level={3} as="h2">What Our Patients Share</Heading>
          
          <div className="flex gap-4 items-center">
            <button 
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center disabled:opacity-30 hover:bg-black/5 transition-colors"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentIndex >= Math.max(0, data.reviews.length - itemsPerPage)}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center disabled:opacity-30 hover:bg-black/5 transition-colors"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden mb-12">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * (itemsPerPage === 3 ? 2 : 1)}rem))` 
            }}
          >
            {data.reviews.map((review, i) => (
              <div 
                key={i} 
                className="w-full md:w-[calc(33.333%-1.33rem)] shrink-0 bg-white p-8 rounded-2xl shadow-sm border border-black/5 flex flex-col justify-between"
                style={{ marginRight: '2rem' }}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-warm">
                      {review.authorAttribution.photoUri ? (
                        <Image src={review.authorAttribution.photoUri} alt={review.authorAttribution.displayName} fill sizes="48px" className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-primary text-xl bg-primary text-warm">
                          {review.authorAttribution.displayName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <a href={review.authorAttribution.uri} target="_blank" rel="noopener noreferrer" className="font-primary font-medium hover:underline block">
                        {review.authorAttribution.displayName}
                      </a>
                      <span className="font-secondary text-sm text-black/50">
                        {review.relativePublishTimeDescription}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200")} />
                    ))}
                  </div>

                  <p className="type-body text-black/80 mb-6 whitespace-pre-wrap">
                    {review.originalText?.text}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width={16} height={16} />
                    <span className="font-secondary text-xs text-black/50 font-medium">Google Reviews</span>
                  </div>
                  <a href={data.googleMapsUri} target="_blank" rel="noopener noreferrer" className="font-secondary text-xs text-primary hover:underline flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    View on map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-black/10 pt-8">
          <p className="font-secondary text-xs md:text-sm text-black/50 max-w-3xl">
            Reviews are provided by Google Maps and are ordered by relevance. Google checks for and removes fake content when identified, but reviews are not individually verified.
          </p>
          <Button href={data.googleMapsUri} external variant="primary" className="shrink-0">
            Read all reviews on Google Maps
          </Button>
        </div>
      </div>
    </Section>
  );
}
