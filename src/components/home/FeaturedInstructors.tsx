import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Course {
  id: string;
  slug: string;
  title: string;
  thumbnail_url?: string;
  instructor_name: string;
  instructor_avatar?: string;
}

interface FeaturedInstructorsProps {
  courses: Course[];
}

export function FeaturedInstructors({ courses }: FeaturedInstructorsProps) {
  if (courses.length === 0) return null;

  // Get unique instructors from courses
  const instructors = courses.slice(0, 6);

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Aprenda com os melhores
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Designers que lideram times nas maiores empresas do Brasil compartilham suas experiências.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {instructors.map((course) => (
            <Link
              key={course.id}
              to={`/curso/${course.slug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl"
            >
              <img
                src={course.instructor_avatar || course.thumbnail_url || "/placeholder.svg"}
                alt={course.instructor_name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="font-display text-xl font-bold md:text-2xl group-hover:text-primary transition-colors">
                  {course.instructor_name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {course.title}
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                  Ver masterclass
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
