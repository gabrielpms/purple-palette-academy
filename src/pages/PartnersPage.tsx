import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { usePartners } from "@/hooks/useCourses";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function PartnersPage() {
  const { data: partners, isLoading } = usePartners();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold md:text-5xl">
                Nossos <span className="text-gradient">Parceiros</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Trabalhamos com as melhores empresas e escolas do mercado para 
                trazer conteúdo de qualidade excepcional.
              </p>
            </div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[300px] rounded-2xl" />
                ))}
              </div>
            ) : partners && partners.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((partner) => (
                  <div
                    key={partner.id}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-card-hover"
                  >
                    <div className="aspect-video overflow-hidden bg-muted">
                      {partner.logo_url ? (
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-subtle">
                          <span className="font-display text-4xl font-bold text-primary">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold">
                        {partner.name}
                      </h3>
                      {partner.description && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                          {partner.description}
                        </p>
                      )}
                      {partner.website_url && (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          Visitar site
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum parceiro encontrado.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Quer ser nosso parceiro?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Se você tem uma escola, agência ou empresa e quer colaborar conosco,
                adoraríamos conversar com você.
              </p>
              <Button size="lg" className="mt-8 bg-gradient-primary gap-2" asChild>
                <Link to="/seja-parceiro">
                  Seja um Parceiro
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
