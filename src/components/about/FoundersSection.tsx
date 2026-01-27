import { useFounders } from "@/hooks/useFounders";
import { Linkedin } from "lucide-react";

export function FoundersSection() {
  const { data: founders, isLoading } = useFounders();

  if (isLoading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <div className="animate-pulse h-10 bg-muted rounded w-64 mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  if (!founders || founders.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Nossos Fundadores
          </h2>
          <p className="mt-4 text-muted-foreground">
            As pessoas por trás da DesignSchool.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {founders.map((founder) => (
            <div
              key={founder.id}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted">
                  {founder.photo_url ? (
                    <img
                      src={founder.photo_url}
                      alt={founder.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-primary text-primary-foreground text-4xl font-bold">
                      {founder.name.charAt(0)}
                    </div>
                  )}
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold">
                  {founder.name}
                </h3>
                <p className="text-sm text-primary font-medium">{founder.role}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {founder.bio}
                </p>

                {founder.linkedin_url && (
                  <a
                    href={founder.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
