import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SeasonHighlight() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Compass className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Temporada 1</span>
          </div>

          {/* Title */}
          <h2 className="font-display text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">
            O Retorno da
            <br />
            <span className="text-gradient">Estratégia</span>
          </h2>

          {/* Description */}
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Estratégia sempre esteve onde as escolhas importam. Esta temporada é dedicada a resgatar 
            seu verdadeiro papel dentro do design — não como uma abstração corporativa, mas como um 
            motor real de transformação para pessoas e negócios.
          </p>

          {/* Key points */}
          <div className="mt-12 grid gap-4 md:grid-cols-3 text-left max-w-3xl mx-auto">
            <div className="p-5 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <h3 className="font-display font-semibold text-sm">Liderança Estratégica</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Enxergar oportunidades onde outros veem obstáculos
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <h3 className="font-display font-semibold text-sm">Design Ops</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                O alicerce que traduz intenções em práticas escaláveis
              </p>
            </div>
            <div className="p-5 rounded-xl bg-card/50 border border-border backdrop-blur-sm">
              <h3 className="font-display font-semibold text-sm">Decisões por Dados</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Clareza e precisão para orientar escolhas
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Button 
              size="lg" 
              className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 gap-2"
              asChild
            >
              <Link to="/cursos?tema=estrategia">
                Explorar cursos de estratégia
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
