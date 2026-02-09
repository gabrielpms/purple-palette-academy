import { Link } from "react-router-dom";
import { Clock, Star, Users, ArrowRight } from "lucide-react";
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
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/20 hover:shadow-lg",
        variant === "featured" && "md:flex-row"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden",
          variant === "featured" ? "md:w-1/2" : "aspect-video"
        )}
      >
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
              variant === "featured" && "aspect-video md:aspect-auto md:h-full"
            )}
          />
        ) : (
          <AbstractCourseThumbnail
            title={course.title}
            className={cn(
              "h-full w-full transition-transform duration-500 group-hover:scale-105",
              variant === "featured" ? "aspect-video md:aspect-auto md:h-full" : "aspect-video"
            )}
          />
        )}
        
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
        </div>
      </div>

      {/* Content */}
      <div className={cn("flex flex-1 flex-col p-6", variant === "featured" && "md:p-8")}>
        {/* Instructor */}
        <div className="flex items-center gap-3">
          {course.instructor_avatar && (
            <img
              src={course.instructor_avatar}
              alt={course.instructor_name}
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <span className="text-sm text-muted-foreground">{course.instructor_name}</span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "mt-4 font-display font-bold leading-tight transition-colors group-hover:text-primary",
            variant === "featured" ? "text-xl md:text-2xl" : "text-lg"
          )}
        >
          {course.title}
        </h3>
        
        {course.short_description && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {course.short_description}
          </p>
        )}

        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {course.rating && course.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-medium text-foreground">{course.rating}</span>
            </div>
          )}
          {course.duration_hours && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration_hours}h</span>
            </div>
          )}
          {course.students_count && course.students_count > 0 && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students_count.toLocaleString("pt-BR")}</span>
            </div>
          )}
          {course.level && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">
              {levelLabels[course.level] || course.level}
            </span>
          )}
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-end justify-between pt-6">
          <div>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {course.original_price?.toFixed(0)}
              </span>
            )}
            <p className="font-display text-2xl font-bold">
              R$ {course.price.toFixed(0)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Ver detalhes
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
