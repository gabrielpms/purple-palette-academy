import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

interface FeaturedCoursesProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
}

export function FeaturedCourses({
  courses,
  title = "Cursos em Destaque",
  subtitle = "Os cursos mais populares da plataforma, selecionados pela nossa equipe.",
}: FeaturedCoursesProps) {
  if (courses.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              {subtitle}
            </p>
          </div>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/cursos">
              Ver todos os cursos
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
