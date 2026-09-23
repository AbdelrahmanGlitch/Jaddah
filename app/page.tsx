import { Hero } from "@/components/home/Hero";
import { TripFinder } from "@/components/home/TripFinder";
import { Intro } from "@/components/home/Intro";
import { FeaturedTrips } from "@/components/home/FeaturedTrips";
import { Destinations } from "@/components/home/Destinations";
import { WhyUs } from "@/components/home/WhyUs";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SocialFeed } from "@/components/home/SocialFeed";
import { Gallery } from "@/components/home/Gallery";
import { BookingSection } from "@/components/home/BookingSection";
import { Faq } from "@/components/home/Faq";
import { Contact } from "@/components/home/Contact";
import { MobileCta } from "@/components/layout/MobileCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TripFinder />
      <Intro />
      <FeaturedTrips />
      <Destinations />
      <WhyUs />
      <HowItWorks />
      <SocialFeed />
      <Gallery />
      <BookingSection />
      <Faq />
      <Contact />
      <MobileCta />
    </>
  );
}
