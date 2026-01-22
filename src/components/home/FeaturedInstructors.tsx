import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Course {
  id: string;
  slug: string;
  title: string;
  instructor_name: string;
  instructor_avatar?: string;
  instructor_bio?: string;
  thumbnail_url?: string;
}

interface FeaturedInstructorsProps {
  courses: Course[];
}

export function FeaturedInstructors({ courses }: FeaturedInstructorsProps) {
  // Get unique instructors from courses
  const instructorsMap = new Map<string, {
    name: string;
    avatar?: string;
    bio?: string;
    courseSlug: string;
    courseTitle: string;
    thumbnail?: string;
  }>();

  courses.forEach((course) => {
    if (!instructorsMap.has(course.instructor_name)) {
      instructorsMap.set(course.instructor_name, {
        name: course.instructor_name,
        avatar: course.instructor_avatar,
        bio: course.instructor_bio,
        courseSlug: course.slug,
        courseTitle: course.title,
        thumbnail: course.thumbnail_url,
      });
    }
  });

  const instructors = Array.from(instructorsMap.values()).slice(0, 6);

  if (instructors.length === 0) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
            Aprenda com quem
            <br />
            <span className="text-muted-foreground">faz o mercado</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Nossos instrutores são profissionais que lideram times nas maiores empresas do Brasil.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {instructors.map((instructor, index) => (
            <Link
              key={instructor.name}
              to={`/curso/${instructor.courseSlug}`}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary"
            >
              {/* Image */}
              <img
                src={instructor.avatar || instructor.thumbnail || `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=500&fit=crop`}
                alt={instructor.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                <h3 className="font-display text-lg md:text-xl font-bold">
                  {instructor.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {instructor.courseTitle}
                </p>
                
                {/* Hover CTA */}
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary opacity-0 transform translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
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
