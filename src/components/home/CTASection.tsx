import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-dark p-8 md:p-16">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-purple-glow/20 blur-3xl" />
            <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Comece sua jornada hoje
            </div>

            <h2 className="mt-6 font-display text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              Pronto para transformar sua carreira em design?
            </h2>

            <p className="mt-4 text-lg text-primary-foreground/80">
              Junte-se a milhares de profissionais que já estão evoluindo suas habilidades 
              com os melhores instrutores do Brasil.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 h-12 px-8 text-base"
                asChild
              >
                <Link to="/cursos">
                  Explorar Cursos
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2 h-12 px-8 text-base"
                asChild
              >
                <Link to="/sobre">
                  Conhecer a Escola
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
