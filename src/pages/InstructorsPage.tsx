import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useInstructors } from "@/hooks/useInstructors";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Linkedin, Twitter, Instagram } from "lucide-react";

export default function InstructorsPage() {
  const { data: instructors, isLoading } = useInstructors();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold md:text-5xl">
                Nossos <span className="text-gradient">Instrutores</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Aprenda com os melhores profissionais do mercado brasileiro de design e produto.
              </p>
            </div>
          </div>
        </section>

        {/* Instructors Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            {isLoading ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[400px] rounded-2xl" />
                ))}
              </div>
            ) : instructors && instructors.length > 0 ? (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {instructors.map((instructor) => (
                  <Link
                    key={instructor.id}
                    to={`/instrutor/${instructor.slug}`}
                    className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-card-hover"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      {instructor.logo_url ? (
                        <img
                          src={instructor.logo_url}
                          alt={instructor.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-subtle">
                          <span className="font-display text-6xl font-bold text-primary">
                            {instructor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold group-hover:text-primary transition-colors">
                        {instructor.name}
                      </h3>
                      {instructor.description && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {instructor.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-3">
                        {instructor.linkedin_url && (
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                        )}
                        {instructor.twitter_url && (
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                        )}
                        {instructor.instagram_url && (
                          <Instagram className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="mt-4 flex items-center text-sm font-medium text-primary">
                        Ver perfil
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum instrutor encontrado.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                Quer ensinar na plataforma?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Se você é um profissional experiente e quer compartilhar seu conhecimento,
                adoraríamos conversar com você.
              </p>
              <Button size="lg" className="mt-8 bg-gradient-primary gap-2" asChild>
                <Link to="/seja-parceiro">
                  Seja um Instrutor
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
