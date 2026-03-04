import { Layers, Users, BookOpen, Zap, Target, Award, Star, Lightbulb, Rocket, Shield, LucideIcon } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const iconMap: Record<string, LucideIcon> = {
  BookOpen, Zap, Users, Layers, Target, Award, Star, Lightbulb, Rocket, Shield,
};

const defaultFeatures = [
  { icon: "BookOpen", title: "Masterclasses Completas", description: "Cursos profundos com profissionais referência no mercado brasileiro." },
  { icon: "Zap", title: "Nano Aulas", description: "Conteúdos rápidos de 5-15 minutos para aprender no seu ritmo." },
  { icon: "Users", title: "Mentorias ao Vivo", description: "Sessões exclusivas mensais com os melhores designers." },
  { icon: "Layers", title: "Projetos Práticos", description: "Cases reais para você aplicar e adicionar ao seu portfólio." },
];

export function ValuePropositionMinimal() {
  const { data: settings } = useSiteSettings();

  const title = settings?.value_prop_title || "O que está incluso";
  const subtitle = settings?.value_prop_subtitle || "Tudo que você precisa para se tornar um designer estratégico.";
  const features = settings?.value_prop_features?.length ? settings.value_prop_features : defaultFeatures;

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon] || BookOpen;
            return (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
