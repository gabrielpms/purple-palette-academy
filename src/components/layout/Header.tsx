import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomCursor } from "@/components/landing/CustomCursor";

const navLinks = [
  { name: "Masterclasses", path: "/cursos" },
  { name: "Assinatura", path: "/assinatura" },
  { name: "Sobre", path: "/sobre" },
  { name: "Parceiros", path: "/instrutores" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
    <CustomCursor />
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-primary">
            <span className="font-display text-base font-semibold text-primary-foreground leading-none">P</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">
            Plots
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-11 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-[12px] font-medium tracking-[0.5px] transition-colors",
                isActive(link.path)
                  ? "text-foreground"
                  : "text-foreground/45 hover:text-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-6 lg:flex">
          <Link
            to="/login"
            className="text-[12px] font-medium tracking-[0.5px] text-foreground/45 transition-colors hover:text-foreground"
          >
            Entrar
          </Link>
          <Link
            to="/cursos"
            className="btn-sweep relative inline-flex items-center justify-center overflow-hidden rounded-[2px] bg-white px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            <span className="relative z-10">Entrar na Plots</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Abrir menu"
          className="lg:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col gap-1 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="px-2 py-3 text-sm font-medium tracking-wide text-foreground/70 transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-white/5 pt-4">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-2 py-3 text-sm font-medium text-foreground/70"
              >
                Entrar
              </Link>
              <Link
                to="/cursos"
                onClick={() => setIsOpen(false)}
                className="rounded-[2px] bg-white px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-background"
              >
                Entrar na Plots
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
