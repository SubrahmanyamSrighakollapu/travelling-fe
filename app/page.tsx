import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { TrendingDestinations } from "@/components/home/trending-destinations";
import { FeaturedPackages } from "@/components/home/featured-packages";
import { FlashDeals } from "@/components/home/flash-deals";
import { StatsSection } from "@/components/home/stats-section";
import { ReviewsSection } from "@/components/home/reviews-section";
import { BlogSection } from "@/components/home/blog-section";
import { AiPlannerCTA } from "@/components/home/ai-planner-cta";
import { HotelsSection } from "@/components/home/hotels-section";
import { PartnersSection } from "@/components/home/partners-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrendingDestinations />
        <FeaturedPackages />
        <FlashDeals />
        <HotelsSection />
        <StatsSection />
        <AiPlannerCTA />
        <ReviewsSection />
        <BlogSection />
        <PartnersSection />
      </main>
      <Footer />
    </>
  );
}
