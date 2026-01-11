import { Target, Users, BookOpen, TrendingUp, Award, Zap } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Foco em Estratégia",
    description: "Vá além do visual. Aprenda a pensar estrategicamente e criar produtos que resolvem problemas reais.",
  },
  {
    icon: Users,
    title: "Instrutores de Elite",
    description: "Aprenda com designers que lideram times em Nubank, iFood, Itaú e outras empresas de destaque.",
  },
  {
    icon: BookOpen,
    title: "Conteúdo Prático",
    description: "Cases reais, exercícios hands-on e projetos que você pode adicionar ao seu portfólio.",
  },
  {
    icon: TrendingUp,
    title: "Acelere sua Carreira",
    description: "Desenvolva habilidades que o mercado está buscando e se posicione como um profissional estratégico.",
  },
  {
    icon: Award,
    title: "Certificado Reconhecido",
    description: "Receba um certificado ao concluir cada curso, validando sua expertise no mercado.",
  },
  {
    icon: Zap,
    title: "Acesso Vitalício",
    description: "Compre uma vez e tenha acesso para sempre, incluindo todas as atualizações do curso.",
  },
];

export function ValueProposition() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Por que escolher a{" "}
            <span className="text-gradient">DesignSchool</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Criamos a plataforma que gostaríamos de ter quando começamos no mercado de design.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
