import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { AbstractCourseThumbnail } from "@/components/ui/abstract-course-thumbnail";

interface Course {
  id: string;
  slug: string;
  title: string;
  short_description?: string;
  thumbnail_url?: string;
  price: number;
  instructor_name: string;
  is_coming_soon?: boolean;
}

interface MasterclassesEditorialProps {
  courses: Course[];
}

export function MasterclassesEditorial({ courses }: MasterclassesEditorialProps) {
  if (!courses.length) return null;

  return (
    <section className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Masterclasses</SectionLabel>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
              Conteúdo profundo, <em>linha a linha</em>.
            </h2>
            <p className="mt-5 max-w-[460px] text-[15px] leading-[1.7] text-foreground/50">
              Aulas longas para quem quer construir repertório e prática.
            </p>
          </div>
          <Link
            to="/cursos"
            className="group inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.5px] text-foreground/45 transition-colors hover:text-primary"
          >
            Ver todas
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-px border border-white/5 bg-white/5 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <Link
              key={course.id}
              to={`/curso/${course.slug}`}
              className="group relative flex flex-col bg-background p-7 transition-colors hover:bg-surface md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="label-uppercase text-foreground/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {course.is_coming_soon ? (
                  <span className="label-uppercase text-cream">Em breve</span>
                ) : (
                  <span className="label-uppercase text-primary">Disponível</span>
                )}
              </div>

              <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[2px]">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <AbstractCourseThumbnail
                    title={course.title}
                    className="h-full w-full"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <h3 className="mt-7 font-display text-[28px] font-medium leading-[1.05] tracking-tight transition-colors group-hover:text-primary md:text-[32px]">
                {course.title}
              </h3>

              {course.short_description && (
                <p className="mt-3 text-[14px] leading-[1.6] text-foreground/50 line-clamp-2">
                  {course.short_description}
                </p>
              )}

              <div className="mt-7 flex items-center justify-between border-t border-white/5 pt-5">
                <span className="text-sm text-foreground/70">
                  {course.instructor_name}
                </span>
                {!course.is_coming_soon && (
                  <span className="font-display text-xl font-semibold text-primary">
                    R$ {course.price.toFixed(0)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
