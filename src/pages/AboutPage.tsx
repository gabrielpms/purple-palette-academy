import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CTASection } from "@/components/home/CTASection";
import { FoundersSection } from "@/components/about/FoundersSection";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Foco em Resultado",
    description: "Nossos cursos são desenhados para gerar impacto real na sua carreira, não apenas certificados.",
  },
  {
    icon: Heart,
    title: "Comunidade Forte",
    description: "Fazemos parte de uma comunidade vibrante de designers que se apoiam e crescem juntos.",
  },
  {
    icon: Lightbulb,
    title: "Inovação Constante",
    description: "Estamos sempre atualizando nosso conteúdo com as práticas mais recentes do mercado.",
  },
  {
    icon: Users,
    title: "Acessibilidade",
    description: "Acreditamos que educação de qualidade deve ser acessível a todos os profissionais.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
                Sobre a{" "}
                <span className="text-gradient">DesignSchool</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl leading-relaxed">
                Somos a plataforma brasileira de educação em design e produto estratégico. 
                Nossa missão é formar a próxima geração de designers que pensam como 
                estrategistas e executam com excelência.
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
                  Nossa História
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    A DesignSchool nasceu da frustração de profissionais que não encontravam 
                    conteúdo de qualidade sobre design estratégico em português. Enquanto o 
                    mercado internacional avançava, o Brasil ficava para trás.
                  </p>
                  <p>
                    Reunimos os melhores profissionais do mercado brasileiro — designers 
                    que lideram times em empresas como Nubank, iFood, Itaú e Magazine Luiza — 
                    para criar cursos que realmente fazem diferença.
                  </p>
                  <p>
                    Hoje, já formamos mais de 5.000 profissionais e somos referência em 
                    educação de design no Brasil. Mas estamos apenas começando.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-primary opacity-10 blur-2xl" />
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-subtle">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
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
                Nossos Valores
              </h2>
              <p className="mt-4 text-muted-foreground">
                Os princípios que guiam tudo o que fazemos.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="font-display text-5xl font-bold text-primary">15+</p>
                  <p className="mt-2 text-muted-foreground">Cursos disponíveis</p>
                </div>
                <div>
                  <p className="font-display text-5xl font-bold text-primary">5.000+</p>
                  <p className="mt-2 text-muted-foreground">Alunos formados</p>
                </div>
                <div>
                  <p className="font-display text-5xl font-bold text-primary">4.9</p>
                  <p className="mt-2 text-muted-foreground">Avaliação média</p>
                </div>
                <div>
                  <p className="font-display text-5xl font-bold text-primary">20+</p>
                  <p className="mt-2 text-muted-foreground">Instrutores experts</p>
                </div>
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
