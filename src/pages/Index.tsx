import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroMasterclass } from "@/components/home/HeroMasterclass";
import { ValuePropositionMinimal } from "@/components/home/ValuePropositionMinimal";
import { SeasonHighlight } from "@/components/home/SeasonHighlight";
import { FeaturedInstructors } from "@/components/home/FeaturedInstructors";
import { NewCourses } from "@/components/home/NewCourses";
import { SubscriptionSection } from "@/components/home/SubscriptionSection";
import { Testimonials } from "@/components/home/Testimonials";
import { useCourses, useTestimonials } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const { data: featuredCourses, isLoading: loadingFeatured } = useCourses({ featured: true });
  const { data: allCourses, isLoading: loadingAll } = useCourses();
  const { data: testimonials, isLoading: loadingTestimonials } = useTestimonials();

  // Get the 3 most recent courses
  const recentCourses = allCourses?.slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero - Masterclass style */}
        <HeroMasterclass />
        
        {/* Value Proposition */}
        <ValuePropositionMinimal />
        
        {/* Season Highlight - O Retorno da Estratégia */}
        <SeasonHighlight />
        
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
        
        {/* New Courses */}
        {loadingAll ? (
          <section className="py-20">
            <div className="container">
              <Skeleton className="h-10 w-48 mb-4" />
              <Skeleton className="h-6 w-96 mb-12" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[400px] rounded-2xl" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <NewCourses courses={recentCourses} />
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
