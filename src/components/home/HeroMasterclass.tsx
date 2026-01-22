import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Instructor {
  name: string;
  role: string;
  avatar_url: string;
  course_slug?: string;
}

interface HeroMasterclassProps {
  instructors?: Instructor[];
}

const defaultInstructors: Instructor[] = [
  {
    name: "Ana Silva",
    role: "Lead Designer, Nubank",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
  },
  {
    name: "Carlos Mendes",
    role: "Head of Product, iFood",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
  },
  {
    name: "Marina Costa",
    role: "Design Director, Itaú",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
  },
  {
    name: "Pedro Santos",
    role: "UX Lead, Mercado Livre",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
  },
];

export function HeroMasterclass({ instructors = defaultInstructors }: HeroMasterclassProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Grid of Instructors */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1 opacity-30">
        {[...instructors, ...instructors].slice(0, 8).map((instructor, index) => (
          <div key={index} className="relative overflow-hidden">
            <img
              src={instructor.avatar_url}
              alt={instructor.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl lg:text-8xl">
            <span className="block">APRENDA COM</span>
            <span className="block">QUEM FAZ O</span>
            <span className="block text-gradient">MERCADO.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            Masterclasses individuais ou assinatura com nano aulas e sessões de mentoria. 
            Aprenda design estratégico com os melhores profissionais do Brasil.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button 
              size="lg" 
              className="h-14 px-8 text-base font-semibold bg-primary hover:bg-primary/90 transition-colors gap-2"
              asChild
            >
              <Link to="/cursos">
                Ver Masterclasses
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 text-base font-semibold border-border hover:bg-secondary gap-2"
              asChild
            >
              <Link to="/sobre">
                <Play className="h-5 w-5" />
                Conhecer a Plataforma
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap gap-12 border-t border-border pt-8">
            <div>
              <p className="font-display text-4xl font-bold md:text-5xl">200+</p>
              <p className="mt-1 text-sm text-muted-foreground">Aulas disponíveis</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold md:text-5xl">15+</p>
              <p className="mt-1 text-sm text-muted-foreground">Masterclasses</p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold md:text-5xl">5.000+</p>
              <p className="mt-1 text-sm text-muted-foreground">Alunos formados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
