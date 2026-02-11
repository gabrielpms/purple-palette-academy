import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Play,
  Users,
  Zap,
  ArrowRight,
  MessageCircle,
  Calendar,
  Award,
  Star,
  Clock,
} from "lucide-react";

const includedFeatures = [
  {
    icon: Zap,
    title: "Nano Aulas Exclusivas",
    description:
      "Conteúdos rápidos de 5-15 minutos, pensados para encaixar na sua rotina. Aprenda técnicas práticas e aplicáveis imediatamente.",
  },
  {
    icon: Users,
    title: "Sessões de Mentoria ao Vivo",
    description:
      "Encontros mensais com profissionais de mercado. Tire dúvidas, receba feedback e acelere sua evolução.",
  },
  {
    icon: Play,
    title: "Novos Conteúdos Toda Semana",
    description:
      "Atualizações constantes com tendências, ferramentas e metodologias do mercado de design.",
  },
  {
    icon: MessageCircle,
    title: "Comunidade Exclusiva",
    description:
      "Conecte-se com outros designers, troque experiências e construa networking com profissionais de todo o Brasil.",
  },
  {
    icon: Calendar,
    title: "Eventos e Workshops",
    description:
      "Acesso prioritário a eventos especiais, workshops práticos e sessões temáticas com convidados.",
  },
  {
    icon: Award,
    title: "Certificados de Participação",
    description:
      "Receba certificados ao concluir trilhas de aprendizado e participe de mentorias certificadas.",
  },
];

const benefits = [
  "Acesso ilimitado a todas as nano aulas",
  "Sessões de mentoria ao vivo mensais",
  "Comunidade exclusiva de designers",
  "Certificados de participação",
  "Novos conteúdos toda semana",
  "Acesso prioritário a eventos",
  "Cancele quando quiser",
];

const faqs = [
  {
    question: "A assinatura inclui as masterclasses?",
    answer:
      "Não. As masterclasses são vendidas separadamente. A assinatura dá acesso exclusivo às nano aulas, sessões de mentoria ao vivo e à comunidade.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim! Não há fidelidade. Você pode cancelar sua assinatura quando quiser, sem taxas ou multas.",
  },
  {
    question: "Como funcionam as sessões de mentoria?",
    answer:
      "As mentorias acontecem ao vivo, online, com profissionais de mercado. Você pode participar, tirar dúvidas e receber feedback em tempo real.",
  },
  {
    question: "As nano aulas ficam disponíveis para sempre?",
    answer:
      "Enquanto sua assinatura estiver ativa, você tem acesso ilimitado a todo o catálogo de nano aulas, incluindo conteúdos novos publicados semanalmente.",
  },
  {
    question: "Existe um período de teste?",
    answer:
      "Sim! Oferecemos 7 dias grátis para você experimentar a plataforma antes de ser cobrado.",
  },
];

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative overflow-hidden py-24 md:py-36">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
          </div>

          <div className="container relative z-10 text-center">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
              Assinatura Plots
            </span>
            <h1 className="font-display text-4xl font-bold md:text-6xl lg:text-7xl leading-tight max-w-4xl mx-auto">
              Evolua como designer.
              <br />
              <span className="text-muted-foreground">Todos os dias.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nano aulas, mentorias ao vivo e uma comunidade de designers para
              te ajudar a crescer profissionalmente — tudo por uma assinatura
              acessível.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 text-base font-semibold gap-2"
                asChild
              >
                <a href="#planos">
                  Começar 7 dias grátis
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <p className="text-sm text-muted-foreground">
                Sem compromisso. Cancele quando quiser.
              </p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-24 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                O que está incluído
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Tudo que você precisa para se manter atualizado e evoluir
                constantemente como designer.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {includedFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl bg-card border border-border p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-card-hover"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Note */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto rounded-2xl bg-secondary/50 border border-border p-8 md:p-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mx-auto mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold">
                Assinatura ≠ Masterclasses
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed max-w-xl mx-auto">
                As masterclasses são experiências aprofundadas vendidas
                separadamente. A assinatura foca em nano aulas rápidas, mentorias
                ao vivo e comunidade — conteúdos complementares para o seu dia a
                dia.
              </p>
              <Button variant="link" className="mt-4 text-primary gap-1" asChild>
                <Link to="/cursos">
                  Ver masterclasses disponíveis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="planos" className="py-24 md:py-32 scroll-mt-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Escolha seu plano
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comece com 7 dias grátis e cancele quando quiser.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              {/* Monthly */}
              <div className="rounded-3xl bg-card border border-border p-8 md:p-10 flex flex-col">
                <h3 className="font-display text-xl font-bold">Mensal</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Flexibilidade total, sem fidelidade.
                </p>
                <div className="mt-6">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold">
                      R$ 79
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full mt-8 h-14 text-base font-semibold gap-2"
                  asChild
                >
                  <Link to="/cursos">
                    Começar 7 dias grátis
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {/* Annual */}
              <div className="relative rounded-3xl bg-card border-2 border-primary p-8 md:p-10 flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  Mais popular
                </div>
                <h3 className="font-display text-xl font-bold">Anual</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Economize 40% com o plano anual.
                </p>
                <div className="mt-6">
                  <span className="text-sm text-muted-foreground line-through">
                    R$ 948/ano
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold">
                      R$ 569
                    </span>
                    <span className="text-muted-foreground">/ano</span>
                  </div>
                  <p className="mt-1 text-sm text-primary font-medium">
                    Equivale a R$ 47/mês
                  </p>
                </div>

                <ul className="mt-8 space-y-3 flex-1">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  size="lg"
                  className="w-full mt-8 h-14 text-base font-semibold gap-2"
                  asChild
                >
                  <Link to="/cursos">
                    Começar 7 dias grátis
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-24 md:py-32 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Como funciona
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              {[
                {
                  step: "01",
                  icon: Play,
                  title: "Assista as nano aulas",
                  description:
                    "Conteúdos de 5-15 min para aprender no seu ritmo, quando e onde quiser.",
                },
                {
                  step: "02",
                  icon: Users,
                  title: "Participe das mentorias",
                  description:
                    "Encontros ao vivo mensais para tirar dúvidas e receber feedback.",
                },
                {
                  step: "03",
                  icon: MessageCircle,
                  title: "Conecte-se à comunidade",
                  description:
                    "Troque experiências, compartilhe projetos e cresça junto.",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <span className="mt-4 block text-xs font-bold text-primary tracking-widest uppercase">
                    Passo {item.step}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 md:py-32">
          <div className="container max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Perguntas frequentes
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-card border border-border p-6 md:p-8"
                >
                  <h3 className="font-display font-semibold text-lg">
                    {faq.question}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl max-w-2xl mx-auto">
              Pronto para evoluir como designer?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              Comece agora com 7 dias grátis. Sem compromisso, cancele quando
              quiser.
            </p>
            <Button
              size="lg"
              className="mt-10 h-14 px-10 text-base font-semibold gap-2"
              asChild
            >
              <a href="#planos">
                Começar 7 dias grátis
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
