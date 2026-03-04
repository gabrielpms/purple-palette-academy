import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const defaultInstructorImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
];

const defaultStats = [
  { value: "200+", label: "Aulas disponíveis" },
  { value: "15+", label: "Masterclasses" },
  { value: "5.000+", label: "Alunos formados" },
];

export function HeroMasterclass() {
  const { data: settings } = useSiteSettings();

  const title = settings?.hero_title || "APRENDA COM QUEM FAZ O MERCADO.";
  const description = settings?.hero_description || "Masterclasses individuais ou assinatura com nano aulas e sessões de mentoria. Aprenda design estratégico com os melhores profissionais do Brasil.";
  const ctaPrimaryText = settings?.hero_cta_primary_text || "Ver Masterclasses";
  const ctaPrimaryUrl = settings?.hero_cta_primary_url || "/cursos";
  const ctaSecondaryText = settings?.hero_cta_secondary_text || "Conhecer a Plataforma";
  const ctaSecondaryUrl = settings?.hero_cta_secondary_url || "/sobre";
  const stats = settings?.hero_stats?.length ? settings.hero_stats : defaultStats;
  const backgroundImages = settings?.hero_background_images?.length ? settings.hero_background_images : defaultInstructorImages;

  // Split title into lines for styling - last word gets gradient
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() || "";
  const titlePrefix = titleWords.join(" ");

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Grid of Images */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1 opacity-30">
        {[...backgroundImages, ...backgroundImages].slice(0, 8).map((url, index) => (
          <div key={index} className="relative overflow-hidden">
            <img
              src={url}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            {titlePrefix && <span className="block">{titlePrefix}</span>}
            <span className="block text-gradient">{lastWord}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            {description}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 transition-colors gap-2"
              asChild
            >
              <Link to={ctaPrimaryUrl}>
                {ctaPrimaryText}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base font-semibold border-border hover:bg-secondary gap-2"
              asChild
            >
              <Link to={ctaSecondaryUrl}>
                <Play className="h-5 w-5" />
                {ctaSecondaryText}
              </Link>
            </Button>
          </div>

          {/* Stats */}
          {stats.length > 0 && (
            <div className="mt-16 flex flex-wrap gap-12 border-t border-border pt-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <p className="font-display text-4xl font-bold md:text-5xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
