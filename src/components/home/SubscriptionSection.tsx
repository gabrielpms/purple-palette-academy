import { Link } from "react-router-dom";
import { Check, Play, Users, Zap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const defaultFeatures = [
  {
    title: "Nano Aulas",
    description: "Conteúdos rápidos de 5-15 min para aprender no seu ritmo",
  },
  {
    title: "Sessões de Mentoria",
    description: "Encontros ao vivo mensais com instrutores",
  },
  {
    title: "Novos conteúdos toda semana",
    description: "Atualizações constantes com tendências do mercado",
  },
];

const featureIcons = [Zap, Users, Play, Sparkles];

const benefits = [
  "Acesso ilimitado a nano aulas",
  "Encontros ao vivo com parceiros",
  "Comunidade de designers em diálogo",
  "Certificados de jornada",
  "Cancele quando quiser",
];

export function SubscriptionSection() {
  const { data: settings } = useSiteSettings();

  const title = settings?.subscription_title || "Aprender é um processo. A Plots caminha com você.";
  const description = settings?.subscription_description || "Com a assinatura você acessa nano aulas e encontros ao vivo com parceiros da comunidade. Um espaço para evoluir no seu ritmo.";
  const price = settings?.subscription_price ?? 79;
  const originalPrice = settings?.subscription_original_price ?? 149;
  const discountText = settings?.subscription_discount_text || "Economize 47% - Oferta de lançamento";
  const ctaText = settings?.subscription_cta_text || "Começar 7 dias grátis";
  const ctaUrl = settings?.subscription_cta_url || "/assinatura";
  const note = settings?.subscription_note || "As masterclasses são vendidas separadamente e não estão incluídas na assinatura.";
  const features = settings?.subscription_features?.length ? settings.subscription_features : defaultFeatures;

  const isExternal = ctaUrl.startsWith("http");

  // Split title by "." to create two lines
  const titleParts = title.split(".");
  const titleLine1 = titleParts[0]?.trim();
  const titleLine2 = titleParts.slice(1).join(".").trim();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              Assinatura
            </span>
            <h2 className="font-display text-4xl font-bold md:text-5xl leading-tight">
              {titleLine1}{titleLine1 && "."}
              {titleLine2 && (
                <>
                  <br />
                  <span className="text-muted-foreground">{titleLine2}</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground border-l-2 border-primary/30 pl-4">
              <strong className="text-foreground">Nota:</strong> {note}
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              {features.map((feature, idx) => {
                const Icon = featureIcons[idx % featureIcons.length];
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing Card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-2xl" />
            
            <div className="relative rounded-3xl bg-card border border-border p-8 md:p-10">
              <div className="text-center">
                <h3 className="font-display text-2xl font-bold">Assinatura Premium</h3>
                <div className="mt-6">
                  <span className="text-sm text-muted-foreground line-through">R$ {originalPrice}/mês</span>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="font-display text-5xl font-bold">R$ {price}</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="mt-2 text-sm text-primary">{discountText}</p>
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
                className="w-full mt-8 h-14 text-base font-semibold bg-primary hover:bg-primary/90 gap-2"
                asChild
              >
                {isExternal ? (
                  <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
                    {ctaText}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                ) : (
                  <Link to={ctaUrl}>
                    {ctaText}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                )}
              </Button>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Sem compromisso. Cancele a qualquer momento.
              </p>
            </div>

            {/* Masterclass CTA */}
            <div className="mt-6 p-6 rounded-2xl bg-secondary/50 border border-border text-center">
              <p className="text-sm text-muted-foreground">
                Prefere uma masterclass específica?
              </p>
              <Button variant="link" className="mt-2 text-primary gap-1" asChild>
                <Link to="/cursos">
                  Ver todas as masterclasses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
