import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "@/components/ui/course-card";
import { useCourses, useCategories } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const levelOptions = [
  { value: "all", label: "Todos os níveis" },
  { value: "iniciante", label: "Iniciante" },
  { value: "intermediario", label: "Intermediário" },
  { value: "avancado", label: "Avançado" },
];

const sortOptions = [
  { value: "recent", label: "Mais recentes" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "rating", label: "Melhor avaliação" },
  { value: "students", label: "Mais populares" },
];

export default function CoursesPage() {
  const { categorySlug } = useParams();
  const { data: courses, isLoading } = useCourses({ categorySlug });
  const { data: categories } = useCategories();
  
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || "all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);

  const currentCategory = categories?.find((c) => c.slug === categorySlug);

  const filteredCourses = useMemo(() => {
    if (!courses) return [];

    let filtered = courses.filter((course) => {
      // Price filter
      if (course.price < priceRange[0] || course.price > priceRange[1]) {
        return false;
      }

      // Level filter
      if (selectedLevel !== "all" && course.level !== selectedLevel) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && (!course.rating || course.rating < minRating)) {
        return false;
      }

      return true;
    });

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "students":
        filtered.sort((a, b) => (b.students_count || 0) - (a.students_count || 0));
        break;
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return filtered;
  }, [courses, priceRange, selectedLevel, minRating, sortBy]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedLevel !== "all") count++;
    if (priceRange[0] > 0 || priceRange[1] < 1000) count++;
    if (minRating > 0) count++;
    return count;
  }, [selectedLevel, priceRange, minRating]);

  const clearFilters = () => {
    setSelectedLevel("all");
    setPriceRange([0, 1000]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-hero py-12 md:py-16">
          <div className="container">
            <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              {currentCategory ? currentCategory.name : "Todos os Cursos"}
            </h1>
            {currentCategory?.description && (
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
                {currentCategory.description}
              </p>
            )}
            
            {/* Category Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={!categorySlug ? "default" : "outline"}
                className={cn(!categorySlug && "bg-gradient-primary")}
                asChild
              >
                <a href="/cursos">Todos</a>
              </Button>
              {categories?.map((cat) => (
                <Button
                  key={cat.slug}
                  size="sm"
                  variant={categorySlug === cat.slug ? "default" : "outline"}
                  className={cn(categorySlug === cat.slug && "bg-gradient-primary")}
                  asChild
                >
                  <a href={`/cursos/${cat.slug}`}>{cat.name}</a>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Filters & Courses */}
        <section className="py-12">
          <div className="container">
            {/* Filter Bar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge className="ml-1 bg-primary text-primary-foreground">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-muted-foreground"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4" />
                    Limpar filtros
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {filteredCourses.length} curso{filteredCourses.length !== 1 && "s"}
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mb-8 rounded-xl border border-border bg-card p-6 animate-fade-in">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {/* Level */}
                  <div>
                    <label className="text-sm font-medium">Nível</label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {levelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div className="lg:col-span-2">
                    <label className="text-sm font-medium">
                      Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                    </label>
                    <Slider
                      value={priceRange}
                      min={0}
                      max={1000}
                      step={50}
                      onValueChange={setPriceRange}
                      className="mt-4"
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-medium">Avaliação mínima</label>
                    <Select value={minRating.toString()} onValueChange={(v) => setMinRating(Number(v))}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Qualquer avaliação</SelectItem>
                        <SelectItem value="3">3+ estrelas</SelectItem>
                        <SelectItem value="4">4+ estrelas</SelectItem>
                        <SelectItem value="4.5">4.5+ estrelas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Course Grid */}
            {isLoading ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-[400px] rounded-2xl" />
                ))}
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="py-20 text-center">
                <Filter className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 font-display text-xl font-semibold">
                  Nenhum curso encontrado
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Tente ajustar os filtros para ver mais resultados.
                </p>
                <Button className="mt-6" onClick={clearFilters}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
