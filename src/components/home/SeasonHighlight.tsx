import { Link } from "react-router-dom";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SeasonHighlightProps {
  course?: {
    title: string;
    slug: string;
    short_description?: string;
    description?: string;
    thumbnail_url?: string;
    instructor_name: string;
    instructor_avatar?: string;
    instructor_bio?: string;
    duration_hours?: number;
    students_count?: number;
    rating?: number;
  };
}

export function SeasonHighlight({ course }: SeasonHighlightProps) {
  if (!course) return null;

  return (
    <section className="py-24 md:py-32 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20">
            Destaque da Temporada
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-primary/5 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src={course.thumbnail_url || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              {/* Instructor overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-4">
                  {course.instructor_avatar && (
                    <img
                      src={course.instructor_avatar}
                      alt={course.instructor_name}
                      className="h-16 w-16 rounded-full border-2 border-primary object-cover"
                    />
                  )}
                  <div>
                    <p className="font-display text-lg font-semibold">{course.instructor_name}</p>
                    <p className="text-sm text-muted-foreground">Instrutor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl leading-tight">
              {course.title}
            </h2>
            
            {course.short_description && (
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {course.short_description}
              </p>
            )}

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              {course.rating && (
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-gold text-gold" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">avaliação</span>
                </div>
              )}
              {course.duration_hours && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration_hours}h de conteúdo</span>
                </div>
              )}
              {course.students_count && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-5 w-5" />
                  <span>{course.students_count.toLocaleString("pt-BR")} alunos</span>
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 gap-2"
                asChild
              >
                <Link to={`/curso/${course.slug}`}>
                  Ver Masterclass
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
