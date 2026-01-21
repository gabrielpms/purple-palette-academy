import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface Partner {
  id: string;
  name: string;
  logo_url?: string;
  description?: string;
  website_url?: string;
}

interface PartnersSectionProps {
  partners: Partner[];
}

export function PartnersSection({ partners }: PartnersSectionProps) {
  if (partners.length === 0) return null;

  return (
    <section className="py-24 md:py-32 border-y border-border">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-secondary text-secondary-foreground mb-6">
            Parceiros
          </span>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Empresas que confiam em nós
          </h2>
          <p className="mt-4 text-muted-foreground">
            Colaboramos com as melhores empresas de design do Brasil para trazer conteúdo exclusivo.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity"
            >
              {partner.logo_url ? (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="h-12 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="font-display text-xl font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            to="/parceiros" 
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Ver todos os parceiros
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
