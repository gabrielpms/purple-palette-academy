import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCourse, useCourses } from "@/hooks/useCourses";
import { CourseCard } from "@/components/ui/course-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  Star,
  Users,
  BookOpen,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  Tag,
  Lightbulb,
  Layers,
} from "lucide-react";

const levelLabels: Record<string, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export default function CourseDetailPage() {
  const { slug } = useParams();
  const { data: course, isLoading } = useCourse(slug || "");
  const { data: relatedCourses } = useCourses({ featured: true });

  const hasDiscount = course?.original_price && course.original_price > course.price;
  const discountPercent = hasDiscount
    ? Math.round(((course.original_price! - course.price) / course.original_price!) * 100)
    : 0;

  const filteredRelated = relatedCourses?.filter((c) => c.slug !== slug).slice(0, 3);

  const learningTopics = (course?.learning_topics as string[]) || [];
  const seasonConnectionText = course?.season_connection_text;
  const instructorContext = course?.partners?.description;
  const instructorVideo = course?.partners?.video_url;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container">
            <Skeleton className="h-[400px] w-full rounded-2xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-20">
          <div className="container text-center">
            <h1 className="font-display text-3xl font-bold">Curso não encontrado</h1>
            <p className="mt-2 text-muted-foreground">
              O curso que você está procurando não existe ou foi removido.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/cursos">Ver todos os cursos</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-muted/30">
          <div className="container py-4">
            <Link
              to="/cursos"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              Voltar para cursos
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-hero py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
              {/* Content */}
              <div>
                {/* Category & Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  {course.categories && (
                    <Link to={`/cursos/${course.categories.slug}`}>
                      <Badge variant="secondary" className="text-sm">
                        {course.categories.name}
                      </Badge>
                    </Link>
                  )}
                  {course.is_new && (
                    <Badge className="bg-success text-primary-foreground border-0">
                      Novo
                    </Badge>
                  )}
                  {hasDiscount && (
                    <Badge className="bg-destructive text-destructive-foreground border-0">
                      -{discountPercent}% OFF
                    </Badge>
                  )}
                </div>

                <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                  {course.title}
                </h1>

                {course.short_description && (
                  <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                    {course.short_description}
                  </p>
                )}

                {/* Stats */}
                <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
                  {course.rating && course.rating > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Star className="h-5 w-5 fill-gold text-gold" />
                      <span className="font-semibold">{course.rating}</span>
                      {course.reviews_count && (
                        <span className="text-muted-foreground">
                          ({course.reviews_count} avaliações)
                        </span>
                      )}
                    </div>
                  )}
                  {course.students_count && course.students_count > 0 && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-5 w-5" />
                      {course.students_count.toLocaleString("pt-BR")} alunos
                    </div>
                  )}
                  {course.duration_hours && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="h-5 w-5" />
                      {course.duration_hours}h de conteúdo
                    </div>
                  )}
                  {course.level && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <BookOpen className="h-5 w-5" />
                      {levelLabels[course.level] || course.level}
                    </div>
                  )}
                </div>

                {/* Instructor */}
                <div className="mt-8 flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                  {course.instructor_avatar && (
                    <img
                      src={course.instructor_avatar}
                      alt={course.instructor_name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Instrutor(a)</p>
                    <p className="font-display text-lg font-semibold">
                      {course.instructor_name}
                    </p>
                    {course.instructor_bio && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {course.instructor_bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                {course.tags && course.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Purchase Card */}
              <div className="lg:pl-8">
                <div className="sticky top-24 overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
                  {/* Thumbnail */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={course.thumbnail_url || "/placeholder.svg"}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-4xl font-bold text-primary">
                        R$ {course.price.toFixed(0)}
                      </span>
                      {hasDiscount && (
                        <span className="text-lg text-muted-foreground line-through">
                          R$ {course.original_price?.toFixed(0)}
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <Button
                      size="lg"
                      className="mt-6 w-full bg-gradient-primary hover:opacity-90 gap-2 h-14 text-lg"
                      asChild
                    >
                      <a href={course.hotmart_url} target="_blank" rel="noopener noreferrer">
                        Comprar Agora
                        <ArrowRight className="h-5 w-5" />
                      </a>
                    </Button>

                    <p className="mt-3 text-center text-sm text-muted-foreground">
                      Pagamento seguro via Hotmart
                    </p>

                    {/* Benefits */}
                    <div className="mt-6 space-y-3 border-t border-border pt-6">
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span>Acesso vitalício ao conteúdo</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span>Certificado de conclusão</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span>Suporte e comunidade exclusiva</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <span>7 dias de garantia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Topics */}
        {learningTopics.length > 0 && (
          <section className="py-12 md:py-16 border-t border-border">
            <div className="container">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold md:text-3xl">
                    O que você vai aprender
                  </h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {learningTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
                    >
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span className="text-sm leading-relaxed">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Description */}
        <section className="py-12 md:py-16 border-t border-border">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Sobre o Curso
              </h2>
              <div className="mt-6 prose prose-lg max-w-none text-muted-foreground">
                <p className="whitespace-pre-line leading-relaxed">{course.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Season Connection */}
        {seasonConnectionText && course.seasons && (
          <section className="py-12 md:py-16 border-t border-border bg-muted/30">
            <div className="container">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Layers className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      Conexão com a Temporada
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {course.seasons.title}
                    </p>
                  </div>
                </div>
                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {seasonConnectionText}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Instructor Context (Why it matters) - from partner description */}
        {instructorContext && (
          <section className="py-12 md:py-16 border-t border-border">
            <div className="container">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold md:text-3xl">
                    Por que isso importa
                  </h2>
                </div>
                <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {instructorContext}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Instructor Video & Info */}
        {course.partners && (
          <section className="border-t border-border py-12 md:py-16">
            <div className="container">
              <div className="max-w-3xl">
                <div className="flex items-center gap-4">
                  {course.partners.logo_url && (
                    <img
                      src={course.partners.logo_url}
                      alt={course.partners.name}
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Instrutor</p>
                    <Link
                      to={`/instrutor/${course.partners.slug}`}
                      className="font-display text-lg font-semibold hover:text-primary transition-colors"
                    >
                      {course.partners.name}
                    </Link>
                  </div>
                </div>

                {instructorVideo && (
                  <div className="mt-8">
                    <h3 className="font-display text-lg font-semibold mb-4">
                      Conheça o instrutor
                    </h3>
                    <div className="aspect-video overflow-hidden rounded-2xl border border-border">
                      <iframe
                        src={instructorVideo}
                        title={`Vídeo de apresentação - ${course.partners.name}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Related Courses */}
        {filteredRelated && filteredRelated.length > 0 && (
          <section className="border-t border-border bg-muted/30 py-16">
            <div className="container">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Cursos Relacionados
              </h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRelated.map((relatedCourse) => (
                  <CourseCard key={relatedCourse.id} course={relatedCourse} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
