import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useInstructors } from "@/hooks/useInstructors";

export function FeaturedInstructors() {
  const { data: allInstructors, isLoading } = useInstructors();

  const instructors = allInstructors?.filter((i) => (i as any).is_featured) ?? [];

  if (isLoading || instructors.length === 0) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Quem ensina,
            <br />
            <span className="text-muted-foreground">também aprende</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Parceiros que dividem prática real e abrem espaço para novas perguntas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {instructors.slice(0, 6).map((instructor, index) => (
            <Link
              key={instructor.id}
              to={`/instrutor/${instructor.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary"
            >
              <img
                src={instructor.logo_url || `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=500&fit=crop`}
                alt={instructor.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h3 className="font-display text-lg md:text-xl font-bold">
                  {instructor.name}
                </h3>
                {instructor.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                    {instructor.description}
                  </p>
                )}

                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transform translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  Ver parceiro
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
