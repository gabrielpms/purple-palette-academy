import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar_url?: string;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-subtle">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-purple-glow/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            O que nossos alunos dizem
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Histórias de transformação de profissionais que escolheram investir em sua carreira.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote icon */}
              <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/10" />

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>
              )}

              {/* Content */}
              <p className="mt-4 text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                {testimonial.avatar_url ? (
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && " · "}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
