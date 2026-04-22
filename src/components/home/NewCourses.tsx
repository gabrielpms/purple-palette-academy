import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/course-card";

interface Course {
  id: string;
  slug: string;
  title: string;
  short_description?: string;
  thumbnail_url?: string;
  price: number;
  original_price?: number;
  duration_hours?: number;
  level?: string;
  instructor_name: string;
  instructor_avatar?: string;
  rating?: number;
  reviews_count?: number;
  students_count?: number;
  is_new?: boolean;
  is_featured?: boolean;
  tags?: string[];
}

interface NewCoursesProps {
  courses: Course[];
}

export function NewCourses({ courses }: NewCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-sm font-medium text-success">
              <Sparkles className="h-4 w-4" />
              Novidades
            </div>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Novas masterclasses
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Conteúdos recentes para começar uma nova jornada.
            </p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/cursos">
              Ver todas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
