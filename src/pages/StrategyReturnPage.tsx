import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/ui/course-card";
import { ArrowRight, Sparkles, Target, TrendingUp, Users, Lightbulb } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Visão Estratégica",
    description: "Aprenda a conectar design aos objetivos de negócio e criar produtos que geram resultados.",
  },
  {
    icon: TrendingUp,
    title: "Impacto Mensurável",
    description: "Desenvolva habilidades para medir o impacto do design e comunicar valor para stakeholders.",
  },
  {
    icon: Users,
    title: "Liderança Influente",
    description: "Posicione-se como parceiro estratégico e influencie decisões além do pixel.",
  },
  {
    icon: Lightbulb,
    title: "Pensamento Sistêmico",
    description: "Entenda ecossistemas complexos e desenhe soluções que consideram o todo.",
  },
];

export default function StrategyReturnPage() {
  const { data: strategyCourses } = useCourses();
  
  const filteredCourses = strategyCourses?.filter(
    (course) => 
      course.tags?.some((tag) => 
        ["estratégia", "negócios", "liderança", "métricas"].includes(tag.toLowerCase())
      )
  ).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-dark py-20 md:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-purple-glow/20 blur-3xl" />
            <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="container relative">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
                <Sparkles className="h-4 w-4" />
                Movimento
              </div>

              <h1 className="mt-6 font-display text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
                O Retorno da Estratégia
              </h1>

              <p className="mt-6 text-lg text-primary-foreground/80 md:text-xl leading-relaxed">
                Um movimento para resgatar o papel estratégico do design. 
                Porque design vai muito além de pixels — é sobre transformar 
                negócios e criar impacto real.
              </p>

              <Button
                size="lg"
                className="mt-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 h-12 px-8"
                asChild
              >
                <Link to="/cursos/estrategia-negocios">
                  Explorar Cursos de Estratégia
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Manifesto */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold text-center md:text-4xl">
                O Manifesto
              </h2>
              
              <div className="mt-10 space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Durante muito tempo, design foi visto apenas como a "camada bonita" dos 
                  produtos digitais. Designers eram chamados para "deixar bonito" no final 
                  do processo, sem participar das decisões que realmente importavam.
                </p>
                <p>
                  <strong className="text-foreground">Isso precisa mudar.</strong>
                </p>
                <p>
                  Design estratégico é sobre entender profundamente o negócio, os usuários 
                  e o mercado. É sobre fazer as perguntas certas antes de desenhar qualquer 
                  tela. É sobre medir impacto e defender suas decisões com dados.
                </p>
                <p>
                  O movimento <strong className="text-foreground">"O Retorno da Estratégia"</strong> é 
                  nosso compromisso em formar designers que pensam como estrategistas, 
                  que entendem métricas de negócio e que conseguem influenciar decisões 
                  em qualquer nível da organização.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="bg-muted/30 py-20 md:py-28">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Os 4 Pilares
              </h2>
              <p className="mt-4 text-muted-foreground">
                Competências essenciais para o designer estratégico do futuro.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Courses */}
        {filteredCourses && filteredCourses.length > 0 && (
          <section className="py-20 md:py-28">
            <div className="container">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                <div>
                  <h2 className="font-display text-3xl font-bold md:text-4xl">
                    Cursos do Movimento
                  </h2>
                  <p className="mt-2 text-muted-foreground">
                    Cursos focados em desenvolver competências estratégicas.
                  </p>
                </div>
                <Button variant="outline" className="gap-2" asChild>
                  <Link to="/cursos/estrategia-negocios">
                    Ver todos
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
