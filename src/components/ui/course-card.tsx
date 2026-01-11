import { Link } from "react-router-dom";
import { Clock, Star, Users, ArrowRight, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
        className="group flex gap-4 rounded-xl border border-border p-3 transition-all hover:border-primary/30 hover:shadow-card-hover"
      >
        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={course.thumbnail_url || "/placeholder.svg"}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
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
        "group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all hover-lift",
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
        <img
          src={course.thumbnail_url || "/placeholder.svg"}
          alt={course.title}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
            variant === "featured" && "aspect-video md:aspect-auto md:h-full"
          )}
        />
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {course.is_new && (
            <Badge className="bg-success text-primary-foreground border-0">
              Novo
            </Badge>
          )}
          {hasDiscount && (
            <Badge className="bg-destructive text-destructive-foreground border-0">
              -{discountPercent}%
            </Badge>
          )}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className={cn("flex flex-1 flex-col p-5", variant === "featured" && "md:p-8")}>
        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title & Description */}
        <h3
          className={cn(
            "font-display font-bold leading-tight transition-colors group-hover:text-primary",
            variant === "featured" ? "text-xl md:text-2xl" : "text-lg"
          )}
        >
          {course.title}
        </h3>
        {course.short_description && (
          <p
            className={cn(
              "mt-2 text-muted-foreground",
              variant === "featured" ? "line-clamp-3 text-sm md:text-base" : "line-clamp-2 text-sm"
            )}
          >
            {course.short_description}
          </p>
        )}

        {/* Instructor */}
        <div className="mt-4 flex items-center gap-2">
          {course.instructor_avatar && (
            <img
              src={course.instructor_avatar}
              alt={course.instructor_name}
              className="h-8 w-8 rounded-full object-cover"
            />
          )}
          <span className="text-sm font-medium">{course.instructor_name}</span>
        </div>

        {/* Stats */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {course.rating && course.rating > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-gold text-gold" />
              <span className="font-medium text-foreground">{course.rating}</span>
              {course.reviews_count && (
                <span>({course.reviews_count})</span>
              )}
            </div>
          )}
          {course.students_count && course.students_count > 0 && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.students_count.toLocaleString("pt-BR")} alunos</span>
            </div>
          )}
          {course.duration_hours && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration_hours}h de conteúdo</span>
            </div>
          )}
          {course.level && (
            <Badge variant="secondary" className="text-xs">
              {levelLabels[course.level] || course.level}
            </Badge>
          )}
        </div>

        {/* Price & CTA */}
        <div className="mt-auto flex items-end justify-between pt-5">
          <div>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {course.original_price?.toFixed(0)}
              </span>
            )}
            <p className="font-display text-2xl font-bold text-primary">
              R$ {course.price.toFixed(0)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Ver curso
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
