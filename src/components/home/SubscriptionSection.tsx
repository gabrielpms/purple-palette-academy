import { Link } from "react-router-dom";
import { Check, Play, Users, BookOpen, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BookOpen,
    title: "Acesso a todas as Masterclasses",
    description: "Cursos completos com os melhores profissionais",
  },
  {
    icon: Zap,
    title: "Nano Aulas",
    description: "Conteúdos rápidos de 5-15 min para aprender no seu ritmo",
  },
  {
    icon: Users,
    title: "Sessões de Mentoria",
    description: "Encontros ao vivo mensais com instrutores",
  },
  {
    icon: Play,
    title: "Novos conteúdos toda semana",
    description: "Atualizações constantes com tendências do mercado",
  },
];

const benefits = [
  "Acesso ilimitado a todo conteúdo",
  "Certificados de conclusão",
  "Comunidade exclusiva de designers",
  "Downloads para assistir offline",
  "Cancele quando quiser",
];

export function SubscriptionSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
            Plano de Assinatura
          </span>
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl">
            Tudo que você precisa.
            <br />
            <span className="text-muted-foreground">Um único plano.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Acesse todas as masterclasses, nano aulas e sessões de mentoria por uma assinatura mensal acessível.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing Card */}
        <div className="mt-16 max-w-lg mx-auto">
          <div className="relative rounded-3xl bg-card border border-border p-8 md:p-10">
            {/* Glow effect */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-primary/20 via-transparent to-primary/20 blur-xl opacity-50" />
            
            <div className="relative">
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold">Assinatura Premium</h3>
                <div className="mt-6">
                  <span className="text-sm text-muted-foreground line-through">R$ 149/mês</span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="font-display text-5xl font-bold">R$ 79</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="mt-2 text-sm text-primary">Economize 47% - Oferta de lançamento</p>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="w-full mt-8 h-14 text-base font-semibold bg-primary hover:bg-primary/90"
                asChild
              >
                <Link to="/cursos">
                  Começar 7 dias grátis
                </Link>
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Sem compromisso. Cancele a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
