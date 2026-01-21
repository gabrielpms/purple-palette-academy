import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroMasterclass } from "@/components/home/HeroMasterclass";
import { ValuePropositionMinimal } from "@/components/home/ValuePropositionMinimal";
import { SeasonHighlight } from "@/components/home/SeasonHighlight";
import { FeaturedInstructors } from "@/components/home/FeaturedInstructors";
import { PartnersSection } from "@/components/home/PartnersSection";
import { SubscriptionSection } from "@/components/home/SubscriptionSection";
import { Testimonials } from "@/components/home/Testimonials";
import { useCourses, useTestimonials, usePartners } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const { data: featuredCourses, isLoading: loadingFeatured } = useCourses({ featured: true });
  const { data: seasonCourses } = useCourses({ seasonHighlight: true });
  const { data: testimonials, isLoading: loadingTestimonials } = useTestimonials();
  const { data: partners, isLoading: loadingPartners } = usePartners();

  const seasonCourse = seasonCourses?.[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero - Masterclass style */}
        <HeroMasterclass />
        
        {/* Value Proposition */}
        <ValuePropositionMinimal />
        
        {/* Season Highlight */}
        <SeasonHighlight course={seasonCourse} />
        
        {/* Featured Instructors */}
        {loadingFeatured ? (
          <section className="py-24">
            <div className="container">
              <Skeleton className="h-12 w-64 mx-auto mb-16" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <FeaturedInstructors courses={featuredCourses || []} />
        )}
        
        {/* Partners */}
        {!loadingPartners && partners && partners.length > 0 && (
          <PartnersSection partners={partners} />
        )}
        
        {/* Subscription CTA */}
        <SubscriptionSection />
        
        {/* Testimonials */}
        {loadingTestimonials ? (
          <section className="py-24">
            <div className="container">
              <Skeleton className="h-12 w-64 mx-auto mb-16" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-[250px] rounded-2xl" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <Testimonials testimonials={testimonials || []} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}
