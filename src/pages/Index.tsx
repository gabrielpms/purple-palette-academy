import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroEditorial } from "@/components/home/HeroEditorial";
import { ManifestoBlue } from "@/components/home/ManifestoBlue";
import { InstructorsCarousel } from "@/components/home/InstructorsCarousel";
import { MasterclassesEditorial } from "@/components/home/MasterclassesEditorial";
import { SeasonHighlight } from "@/components/home/SeasonHighlight";
import { SubscriptionSection } from "@/components/home/SubscriptionSection";
import { Testimonials } from "@/components/home/Testimonials";
import { LeadCapture } from "@/components/home/LeadCapture";
import { Marquee } from "@/components/landing/Marquee";
import { SweepDivider } from "@/components/landing/SweepDivider";
import { useCourses } from "@/hooks/useCourses";
import { useFeaturedTestimonials } from "@/hooks/useTestimonials";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Skeleton } from "@/components/ui/skeleton";

const fallbackMarquee = [
  "Estratégia",
  "Design Ops",
  "Brand",
  "Pesquisa",
  "Comunidade",
  "Coautoria",
  "Sistemas",
  "Liderança",
];

export default function Index() {
  const { data: allCourses, isLoading: loadingAll } = useCourses();
  const { data: testimonials, isLoading: loadingTestimonials } = useFeaturedTestimonials();
  const { data: settings, isLoading: loadingSettings } = useSiteSettings();

  // Redirect to landing.html if active_version is 'landing'
  if (settings?.active_version === "landing") {
    window.location.replace("/landing.html");
    return <div className="min-h-screen bg-background" />;
  }

  if (loadingSettings) {
    return <div className="min-h-screen bg-background" />;
  }

  const recentCourses = allCourses?.slice(0, 6) || [];
  const marqueeItems = recentCourses.length
    ? recentCourses.map((c) => c.title.toUpperCase())
    : fallbackMarquee;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <HeroEditorial />

        <Marquee items={marqueeItems} />

        <ManifestoBlue />

        <SweepDivider />

        <InstructorsCarousel />

        {loadingAll ? (
          <section className="border-t border-white/5 py-24">
            <div className="mx-auto max-w-[1480px] px-6 md:px-12">
              <Skeleton className="h-12 w-72 mb-12" />
              <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[420px]" />
                ))}
              </div>
            </div>
          </section>
        ) : (
          <MasterclassesEditorial courses={recentCourses} />
        )}

        <SweepDivider />

        <SeasonHighlight />

        {settings?.show_subscription !== false && <SubscriptionSection />}

        <div id="newsletter">
          <LeadCapture />
        </div>

        {settings?.show_testimonials !== false && (
          loadingTestimonials ? (
            <section className="py-24 border-t border-white/5">
              <div className="mx-auto max-w-[1480px] px-6 md:px-12">
                <Skeleton className="h-12 w-64 mx-auto mb-16" />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-[250px]" />
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <Testimonials testimonials={testimonials || []} />
          )
        )}
      </main>

      <Footer />
    </div>
  );
}
