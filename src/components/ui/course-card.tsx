import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { AbstractCourseThumbnail } from "@/components/ui/abstract-course-thumbnail";

interface CourseCardProps {
  course: {
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
  };
  variant?: "default" | "featured" | "compact";
}

const levelLabels: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export function CourseCard({ course, variant = "default" }: CourseCardProps) {
  const hasDiscount = course.original_price && course.original_price > course.price;
  const discountPercent = hasDiscount
    ? Math.round(((course.original_price! - course.price) / course.original_price!) * 100)
    : 0;

  if (variant === "compact") {
    return (
      <Link
        to={`/curso/${course.slug}`}
        className="group flex gap-4 rounded-xl border border-border p-3 transition-all hover:border-primary/30 hover:bg-secondary/30"
      >
        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
          {course.thumbnail_url ? (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <AbstractCourseThumbnail title={course.title} className="h-full w-full" />
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <h4 className="line-clamp-2 font-display text-sm font-semibold leading-tight group-hover:text-primary">
            {course.title}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{course.instructor_name}</span>
            <span className="font-display font-bold text-primary">
              R$ {course.price.toFixed(0)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/curso/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-border transition-all hover:border-primary/20 hover:shadow-xl"
    >
      {/* Image with overlay */}
      <div className="relative aspect-[3/4] overflow-hidden">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <AbstractCourseThumbnail
            title={course.title}
            className="h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {course.is_new && (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Novo
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
              -{discountPercent}%
            </span>
          )}
          {course.level && (
            <span className="rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white">
              {levelLabels[course.level] || course.level}
            </span>
          )}
        </div>

        {/* Title overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-display text-xl font-bold leading-tight text-white drop-shadow-lg">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Info below image */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        {/* Instructor */}
        <div className="flex items-center gap-2">
          {course.instructor_avatar && (
            <img
              src={course.instructor_avatar}
              alt={course.instructor_name}
              className="h-6 w-6 rounded-full object-cover"
            />
          )}
          <span className="text-sm font-medium text-foreground">{course.instructor_name}</span>
        </div>

        {/* Short description */}
        {course.short_description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.short_description}
          </p>
        )}

        {/* Price */}
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                R$ {course.original_price?.toFixed(0)}
              </span>
            )}
            <p className="font-display text-lg font-bold text-primary">
              R$ {course.price.toFixed(0)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
