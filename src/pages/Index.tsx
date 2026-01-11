import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ValueProposition } from "@/components/home/ValueProposition";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { NewCourses } from "@/components/home/NewCourses";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { useCourses, useTestimonials } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";

export default function Index() {
  const { data: featuredCourses, isLoading: loadingFeatured } = useCourses({ featured: true });
  const { data: newCourses, isLoading: loadingNew } = useCourses({ isNew: true });
  const { data: seasonCourses } = useCourses({ seasonHighlight: true });
  const { data: testimonials, isLoading: loadingTestimonials } = useTestimonials();

  const seasonCourse = seasonCourses?.[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection seasonCourse={seasonCourse} />
        
        <ValueProposition />
        
        {loadingFeatured ? (
          <section className="py-20 bg-muted/30">
            <div className="container">
              <Skeleton className="h-8 w-64 mb-8" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[400px] rounded-2xl" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <FeaturedCourses courses={featuredCourses || []} />
        )}
        
        {loadingNew ? (
          <section className="py-20">
            <div className="container">
              <Skeleton className="h-8 w-48 mb-8" />
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[400px] rounded-2xl" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <NewCourses courses={newCourses || []} />
        )}
        
        {loadingTestimonials ? (
          <section className="py-20 bg-gradient-subtle">
            <div className="container">
              <Skeleton className="h-8 w-64 mx-auto mb-8" />
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
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
