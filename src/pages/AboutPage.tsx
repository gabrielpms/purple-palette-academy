import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Target, Heart, Lightbulb, Users, Layers, BookOpen, Zap, Award, Star, Globe, Shield, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Target, Heart, Lightbulb, Users, Layers, BookOpen, Zap, Award, Star, Globe, Shield, Rocket,
};

const defaultValues = [
  { icon: "Target", title: "Foco em Resultado", description: "Nossos cursos são desenhados para gerar impacto real na sua carreira, não apenas certificados." },
  { icon: "Heart", title: "Comunidade Forte", description: "Fazemos parte de uma comunidade vibrante de designers que se apoiam e crescem juntos." },
  { icon: "Lightbulb", title: "Inovação Constante", description: "Estamos sempre atualizando nosso conteúdo com as práticas mais recentes do mercado." },
  { icon: "Users", title: "Acessibilidade", description: "Acreditamos que educação de qualidade deve ser acessível a todos os profissionais." },
];

const defaultNumbers = [
  { value: "15+", label: "Cursos disponíveis" },
  { value: "5.000+", label: "Alunos formados" },
  { value: "4.9", label: "Avaliação média" },
  { value: "20+", label: "Instrutores experts" },
];

export default function AboutPage() {
  const { data: settings } = useSiteSettings();

  const heroTitle = settings?.about_hero_title || "Sobre a DesignSchool";
  const heroDescription = settings?.about_hero_description || "Somos a plataforma brasileira de educação em design e produto estratégico. Nossa missão é formar a próxima geração de designers que pensam como estrategistas e executam com excelência.";
  const storyTitle = settings?.about_story_title || "Nossa História";
  const storyParagraphs = settings?.about_story_paragraphs || [
    "A DesignSchool nasceu da frustração de profissionais que não encontravam conteúdo de qualidade sobre design estratégico em português.",
    "Reunimos os melhores profissionais do mercado brasileiro para criar cursos que realmente fazem diferença.",
    "Hoje, já formamos mais de 5.000 profissionais e somos referência em educação de design no Brasil.",
  ];
  const storyImageUrl = settings?.about_story_image_url || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800";
  const valuesTitle = settings?.about_values_title || "Nossos Valores";
  const valuesSubtitle = settings?.about_values_subtitle || "Os princípios que guiam tudo o que fazemos.";
  const values = settings?.about_values || defaultValues;
  const numbers = settings?.about_numbers || defaultNumbers;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
                {heroTitle}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
                {heroDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  {storyTitle}
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  {storyParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-subtle">
                  <img
                    src={storyImageUrl}
                    alt="Equipe colaborando"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {valuesTitle}
              </h2>
              <p className="mt-4 text-muted-foreground">
                {valuesSubtitle}
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, idx) => {
                const Icon = iconMap[value.icon] || Target;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
                {numbers.map((num, idx) => (
                  <div key={idx}>
                    <p className="font-display text-5xl font-bold text-primary">{num.value}</p>
                    <p className="mt-2 text-muted-foreground">{num.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FoundersSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
