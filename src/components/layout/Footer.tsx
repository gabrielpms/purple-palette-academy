import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Masterclasses", path: "/cursos" },
    { name: "Sobre", path: "/sobre" },
    { name: "Parceiros", path: "/parceiros" },
  ],
  support: [
    { name: "Central de Ajuda", path: "#" },
    { name: "Contato", path: "mailto:contato@plots.com.br" },
    { name: "Seja Parceiro", path: "/seja-parceiro" },
  ],
  legal: [
    { name: "Termos de Uso", path: "#" },
    { name: "Privacidade", path: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="font-display text-lg font-bold text-primary-foreground">P</span>
              </div>
              <span className="font-display text-xl font-bold tracking-tight">
                Plots
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Aprenda design estratégico com os melhores profissionais do Brasil.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Plataforma
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Suporte
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Redes Sociais
            </h4>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Plots. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
