import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useInstructors } from "@/hooks/useInstructors";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

export function InstructorsCarousel() {
  const { data: allInstructors, isLoading } = useInstructors();
  const { ref } = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const instructors = allInstructors?.filter((i) => (i as any).is_featured) ?? [];

  if (isLoading || instructors.length === 0) return null;

  return (
    <section ref={ref as any} className="overflow-hidden border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Parceiros</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
              Quem ensina, <em>também aprende</em>
            </h2>
          </div>
          <Link
            to="/instrutores"
            className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.5px] text-foreground/45 transition-colors hover:text-primary"
          >
            Ver todos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-6 px-6 md:px-12">
          {instructors.slice(0, 8).map((instructor, idx) => (
            <Link
              key={instructor.id}
              to={`/instrutor/${instructor.slug}`}
              className="group relative block min-w-[280px] sm:min-w-[320px] md:min-w-[360px]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-secondary">
                {instructor.logo_url ? (
                  <img
                    src={instructor.logo_url}
                    alt={instructor.name}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-dark">
                    <span className="font-display text-6xl text-foreground/20">
                      {instructor.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <span className="absolute left-5 top-5 label-uppercase text-foreground/60">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl font-medium leading-tight transition-colors group-hover:text-primary">
                  {instructor.name}
                </h3>
                {instructor.description && (
                  <p className="mt-1 text-sm text-foreground/45 line-clamp-1">
                    {instructor.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
