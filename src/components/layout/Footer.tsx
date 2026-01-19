import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                <span className="font-display text-xl font-bold text-primary-foreground">P</span>
              </div>
              <span className="font-display text-xl font-bold text-foreground">
                Plots
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              A plataforma brasileira de cursos de design e produto estratégico. 
              Aprenda com os melhores profissionais do mercado.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Plataforma
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/cursos" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Todos os Cursos
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Sobre a Escola
                </Link>
              </li>
              <li>
                <Link to="/retorno-estrategia" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  O Retorno da Estratégia
                </Link>
              </li>
              <li>
                <Link to="/parceiros" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Parceiros
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Categorias
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/cursos/design-de-produto" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Design de Produto
                </Link>
              </li>
              <li>
                <Link to="/cursos/ux-ui-design" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  UX/UI Design
                </Link>
              </li>
              <li>
                <Link to="/cursos/estrategia-negocios" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Estratégia de Negócios
                </Link>
              </li>
              <li>
                <Link to="/cursos/design-system" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Design System
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Contato
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/seja-parceiro" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  Seja um Parceiro
                </Link>
              </li>
              <li>
                <a href="mailto:contato@plots.com.br" className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <Mail className="h-4 w-4" />
                  contato@plots.com.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Plots. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Termos de Uso
            </a>
            <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
