import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { SectionLabel } from "@/components/landing/SectionLabel";

const footerLinks = {
  platform: [
    { name: "Masterclasses", path: "/cursos" },
    { name: "Assinatura", path: "/assinatura" },
    { name: "Parceiros", path: "/instrutores" },
    { name: "Sobre", path: "/sobre" },
  ],
  support: [
    { name: "Seja parceiro", path: "/seja-parceiro" },
    { name: "Contato", path: "mailto:contato@plots.com.br" },
    { name: "Central de Ajuda", path: "#" },
  ],
  legal: [
    { name: "Termos", path: "#" },
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
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto max-w-[1480px] px-6 lg:px-12 py-20 md:py-28">
        {/* Manifesto */}
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <SectionLabel>Plots — Comunidade de design</SectionLabel>
            <h3 className="mt-8 font-display text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              Pensar design <em>em coautoria</em>.<br />
              Praticar com <em>propósito</em>.
            </h3>
          </div>

          <div className="md:col-span-5 md:pl-8 md:border-l md:border-white/5">
            <p className="text-[15px] leading-relaxed text-foreground/55 max-w-md">
              Uma comunidade aberta a quem quer aprender, ensinar e construir
              significado no encontro entre estratégia, design e cultura.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-[2px] border border-white/10 text-foreground/60 transition-colors hover:border-primary hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="mt-20 grid gap-12 border-t border-white/5 pt-12 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 className="label-uppercase text-foreground/35">Plataforma</h4>
            <ul className="mt-5 space-y-3">
              {footerLinks.platform.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="label-uppercase text-foreground/35">Suporte</h4>
            <ul className="mt-5 space-y-3">
              {footerLinks.support.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    className="text-sm text-foreground/70 transition-colors hover:text-primary"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="label-uppercase text-foreground/35">Newsletter</h4>
            <p className="mt-5 text-sm text-foreground/55 leading-relaxed">
              Receba reflexões e novas masterclasses no seu e-mail.
            </p>
            <Link
              to="/#newsletter"
              className="mt-4 inline-flex text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              Assinar →
            </Link>
          </div>
          <div>
            <h4 className="label-uppercase text-foreground/35">Logo</h4>
            <Link
              to="/"
              className="mt-5 inline-flex items-center gap-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[2px] bg-primary">
                <span className="font-display text-base font-semibold text-primary-foreground leading-none">
                  P
                </span>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">
                Plots
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <p className="text-xs text-foreground/35 tracking-wide">
            © {new Date().getFullYear()} Plots. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs text-foreground/35 tracking-wide transition-colors hover:text-foreground"
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
