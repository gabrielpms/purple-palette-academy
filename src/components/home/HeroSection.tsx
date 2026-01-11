import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  seasonCourse?: {
    title: string;
    slug: string;
    short_description?: string;
    thumbnail_url?: string;
    instructor_name: string;
  };
}

export function HeroSection({ seasonCourse }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-purple-glow/10 blur-3xl" />
      </div>

      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Plataforma brasileira de design
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Aprenda{" "}
              <span className="text-gradient">design estratégico</span>{" "}
              com quem faz o mercado
            </h1>

            <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
              Cursos de design de produto, UX, UI e estratégia criados por 
              profissionais referência no Brasil. Conteúdo prático e aplicável 
              desde a primeira aula.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2 h-12 px-8 text-base" asChild>
                <Link to="/cursos">
                  Explorar Cursos
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8 text-base border-2" asChild>
                <Link to="/sobre">
                  <Play className="h-4 w-4" />
                  Conhecer a Escola
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8 md:gap-12">
              <div>
                <p className="font-display text-3xl font-bold text-foreground md:text-4xl">15+</p>
                <p className="mt-1 text-sm text-muted-foreground">Cursos disponíveis</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-foreground md:text-4xl">5.000+</p>
                <p className="mt-1 text-sm text-muted-foreground">Alunos formados</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-foreground md:text-4xl">4.9</p>
                <p className="mt-1 text-sm text-muted-foreground">Avaliação média</p>
              </div>
            </div>
          </div>

          {/* Season Course Card */}
          {seasonCourse && (
            <div className="animate-fade-in lg:pl-8">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-20 blur-2xl" />
                
                <Link
                  to={`/curso/${seasonCourse.slug}`}
                  className="relative block overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg transition-transform hover:scale-[1.02]"
                >
                  <div className="absolute left-4 top-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      <Sparkles className="h-3 w-3" />
                      Destaque da Temporada
                    </span>
                  </div>
                  
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={seasonCourse.thumbnail_url || "/placeholder.svg"}
                      alt={seasonCourse.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">
                      {seasonCourse.title}
                    </h3>
                    {seasonCourse.short_description && (
                      <p className="mt-2 line-clamp-2 text-muted-foreground">
                        {seasonCourse.short_description}
                      </p>
                    )}
                    <p className="mt-4 text-sm font-medium text-primary">
                      Por {seasonCourse.instructor_name}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
