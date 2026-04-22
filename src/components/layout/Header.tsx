import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Masterclasses", path: "/cursos" },
  { name: "Assinatura", path: "/assinatura" },
  { name: "Sobre", path: "/sobre" },
  { name: "Parceiros", path: "/instrutores" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/30 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-lg font-bold text-primary-foreground">P</span>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Plots
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors",
                isActive(link.path)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link 
            to="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Entrar
          </Link>
          <Button size="sm" className="h-10 px-6 font-semibold" asChild>
            <Link to="/cursos">Entrar na Plots</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Button variant="outline" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Entrar
                </Link>
              </Button>
              <Button asChild>
                <Link to="/cursos" onClick={() => setIsOpen(false)}>
                  Entrar na Plots
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
