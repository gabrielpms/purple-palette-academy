import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Design de Produto", slug: "design-de-produto" },
  { name: "UX/UI Design", slug: "ux-ui-design" },
  { name: "Estratégia de Negócios", slug: "estrategia-negocios" },
  { name: "Design System", slug: "design-system" },
  { name: "Liderança em Design", slug: "lideranca-design" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 glass">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
            <span className="font-display text-xl font-bold text-primary-foreground">P</span>
          </div>
          <span className="hidden font-display text-xl font-bold text-foreground sm:block">
            Plots
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          <Link
            to="/sobre"
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
              isActive("/sobre")
                ? "text-primary bg-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            Sobre a Escola
          </Link>

          <Link
            to="/retorno-estrategia"
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
              isActive("/retorno-estrategia")
                ? "text-primary bg-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            O Retorno da Estratégia
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-muted-foreground hover:text-foreground">
                  Cursos por Categoria
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-1 p-3">
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={`/cursos/${category.slug}`}
                            className="block select-none rounded-lg px-4 py-3 text-sm font-medium leading-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {category.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                    <li className="border-t border-border mt-2 pt-2">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/cursos"
                          className="block select-none rounded-lg px-4 py-3 text-sm font-semibold text-primary leading-none transition-colors hover:bg-accent"
                        >
                          Ver Todos os Cursos →
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            to="/parceiros"
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
              isActive("/parceiros")
                ? "text-primary bg-accent"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
            )}
          >
            Parceiros
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/seja-parceiro">Seja Parceiro</Link>
          </Button>
          <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity" asChild>
            <Link to="/cursos">Explorar Cursos</Link>
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
        <div className="border-t border-border lg:hidden">
          <nav className="container flex flex-col gap-2 py-4">
            <Link
              to="/sobre"
              className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Sobre a Escola
            </Link>
            <Link
              to="/retorno-estrategia"
              className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              O Retorno da Estratégia
            </Link>
            <div className="px-4 py-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categorias
              </p>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/cursos/${category.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link
              to="/parceiros"
              className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
              onClick={() => setIsOpen(false)}
            >
              Parceiros
            </Link>
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Button variant="outline" asChild>
                <Link to="/seja-parceiro" onClick={() => setIsOpen(false)}>
                  Seja Parceiro
                </Link>
              </Button>
              <Button className="bg-gradient-primary" asChild>
                <Link to="/cursos" onClick={() => setIsOpen(false)}>
                  Explorar Cursos
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
