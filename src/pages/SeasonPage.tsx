import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";
import { useSeason, useSeasonCourses } from "@/hooks/useSeasons";
import { ArrowRight, Sparkles } from "lucide-react";
import { Target, TrendingUp, Users, Lightbulb, Compass, BarChart3, Layers, Puzzle, Rocket } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  TrendingUp,
  Users,
  Lightbulb,
  Sparkles,
  Compass,
  BarChart3,
  Layers,
  Puzzle,
  Rocket,
};

function getIcon(iconName: string | null) {
  if (!iconName) return Sparkles;
  return iconMap[iconName] || Sparkles;
}

export default function SeasonPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: season, isLoading } = useSeason(slug || "");
  const { data: courses } = useSeasonCourses(season?.id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!season) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Temporada não encontrada</h1>
            <Button asChild>
              <Link to="/">Voltar para a home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-dark py-24 md:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-purple-glow/20 blur-3xl" />
            <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="container relative">
            <div className="mx-auto max-w-4xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                Temporada
              </div>

              <h1 className="mt-6 font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
                {season.title}
              </h1>

              {season.subtitle && (
                <p className="mt-4 text-xl text-primary-foreground/80">
                  {season.subtitle}
                </p>
              )}

              <Button
                size="lg"
                className="mt-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 h-12 px-8"
                asChild
              >
                <a href="#cursos">
                  Ver Cursos da Temporada
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Concept */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-4xl space-y-12">
              {(() => {
                const paragraphs = season.concept.split("\n\n").filter(p => p.trim());
                const lastIndex = paragraphs.length - 1;

                const renderBlocks: React.ReactNode[] = [];
                let i = 0;

                while (i < paragraphs.length) {
                  const p = paragraphs[i];
                  const isFirst = i === 0;
                  const isLast = i === lastIndex;
                  const isShort = p.length < 200;

                  if (isFirst) {
                    // Lead editorial
                    renderBlocks.push(
                      <p key={i} className="text-xl md:text-2xl font-display font-medium text-foreground leading-relaxed">
                        {p}
                      </p>
                    );
                    renderBlocks.push(<div key={`sep-${i}`} className="w-16 h-1 bg-primary/20 mx-auto" />);
                  } else if (isLast) {
                    // Fechamento com destaque
                    renderBlocks.push(<div key={`sep-${i}`} className="w-16 h-1 bg-primary/20 mx-auto" />);
                    renderBlocks.push(
                      <div key={i} className="bg-primary/5 rounded-2xl p-8 md:p-10">
                        <p className="text-lg md:text-xl font-display font-medium text-foreground leading-relaxed">
                          {p}
                        </p>
                      </div>
                    );
                  } else if (isShort) {
                    // Blockquote / pull quote
                    renderBlocks.push(
                      <blockquote key={i} className="border-l-4 border-primary pl-6 md:pl-8 py-2">
                        <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed">
                          {p}
                        </p>
                      </blockquote>
                    );
                  } else if (i + 1 < lastIndex && !paragraphs[i + 1].length || (i + 1 < lastIndex && paragraphs[i + 1].length >= 200)) {
                    // Grid de 2 colunas com o próximo parágrafo
                    renderBlocks.push(
                      <div key={i} className="grid md:grid-cols-2 gap-8">
                        <p className="text-muted-foreground leading-relaxed">{p}</p>
                        <p className="text-muted-foreground leading-relaxed">{paragraphs[i + 1]}</p>
                      </div>
                    );
                    i++; // pula o próximo pois já foi usado
                  } else {
                    // Parágrafo normal com largura total
                    renderBlocks.push(
                      <p key={i} className="text-muted-foreground leading-relaxed">
                        {p}
                      </p>
                    );
                  }

                  i++;
                }

                return renderBlocks;
              })()}
            </div>
          </div>
        </section>

        {/* Pillars */}
        {season.pillars && season.pillars.length > 0 && (
          <section className="bg-muted/30 py-20 md:py-28">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Os Pilares
                </h2>
                <p className="mt-4 text-muted-foreground">
                  As perspectivas que guiam esta temporada.
                </p>
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {season.pillars.map((pillar) => {
                  const Icon = getIcon(pillar.icon);
                  return (
                    <div
                      key={pillar.id}
                      className="rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-card-hover"
                    >
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="mt-6 font-display text-xl font-semibold">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Courses */}
        <section id="cursos" className="py-20 md:py-28">
          <div className="container">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Cursos da Temporada
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Cursos selecionados para esta jornada de aprendizado.
                </p>
              </div>
              <Button variant="outline" className="gap-2" asChild>
                <Link to="/cursos">
                  Ver todos os cursos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {courses && courses.length > 0 ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="mt-12 rounded-2xl border border-dashed border-border p-12 text-center">
                <p className="text-muted-foreground">
                  Nenhum curso associado a esta temporada ainda.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
