import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useInstructor, useInstructorCourses } from "@/hooks/useInstructors";
import { CourseCard } from "@/components/ui/course-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Linkedin, Twitter, Instagram, Globe } from "lucide-react";

export default function InstructorDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: instructor, isLoading: loadingInstructor } = useInstructor(slug || "");
  const { data: courses, isLoading: loadingCourses } = useInstructorCourses(instructor?.id || "");

  if (loadingInstructor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-12">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold">Instrutor não encontrado</h1>
            <p className="mt-2 text-muted-foreground">
              O instrutor que você está procurando não existe ou foi removido.
            </p>
            <Button asChild className="mt-6">
              <Link to="/instrutores">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Ver todos os instrutores
              </Link>
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
        {/* Hero */}
        <section className="bg-gradient-hero py-12 md:py-20">
          <div className="container">
            <Link
              to="/instrutores"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para instrutores
            </Link>

            <div className="grid gap-8 lg:grid-cols-3 lg:gap-12 items-start">
              {/* Photo */}
              <div className="lg:col-span-1">
                <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                  {instructor.logo_url ? (
                    <img
                      src={instructor.logo_url}
                      alt={instructor.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-subtle">
                      <span className="font-display text-8xl font-bold text-primary">
                        {instructor.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {instructor.linkedin_url && (
                    <a
                      href={instructor.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm hover:border-primary/30 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {instructor.twitter_url && (
                    <a
                      href={instructor.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm hover:border-primary/30 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                  )}
                  {instructor.instagram_url && (
                    <a
                      href={instructor.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm hover:border-primary/30 transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                  )}
                  {instructor.website_url && (
                    <a
                      href={instructor.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm hover:border-primary/30 transition-colors"
                    >
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>

                {/* Presentation Video */}
                {instructor.video_url && (
                  <div className="mt-8">
                    <div className="aspect-video overflow-hidden rounded-2xl border border-border">
                      <iframe
                        src={instructor.video_url}
                        title={`Vídeo de apresentação - ${instructor.name}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="lg:col-span-2">
                <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
                  {instructor.name}
                </h1>
                
                {instructor.description && (
                  <p className="mt-4 text-lg text-primary font-medium">
                    {instructor.description}
                  </p>
                )}

                {instructor.bio && (
                  <div className="mt-6 prose prose-muted max-w-none">
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {instructor.bio}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="font-display text-2xl font-bold md:text-3xl">
              Cursos de {instructor.name}
            </h2>

            {loadingCourses ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-[350px] rounded-2xl" />
                ))}
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center">
                <p className="text-muted-foreground">
                  Este instrutor ainda não possui cursos na plataforma.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
