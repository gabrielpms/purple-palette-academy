import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useCreateLead } from "@/hooks/useLeads";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { useReveal } from "@/hooks/useReveal";

const emailSchema = z.string().trim().email().max(255);

export function HeroEditorial() {
  const { data: settings } = useSiteSettings();
  const createLead = useCreateLead();
  const { ref } = useReveal<HTMLDivElement>({ threshold: 0.05 });

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const title = settings?.hero_title || "DESIGN COMEÇA POR UMA PERGUNTA.";
  const description =
    settings?.hero_description ||
    "Masterclasses e temporadas para quem quer pensar o design com profundidade — e transformar essa reflexão em prática.";

  const words = title.split(" ");
  const lastIndex = words.length - 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = emailSchema.safeParse(email);
    if (!r.success) {
      setError("E-mail inválido");
      return;
    }
    setError(null);
    createLead.mutate(
      { name: email.split("@")[0] || "Visitante", email: r.data },
      {
        onSuccess: () => {
          setSubmitted(true);
          setEmail("");
        },
      }
    );
  };

  return (
    <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center md:px-12 md:pt-36">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-background" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-[55%] rounded-full editorial-glow animate-glow-pulse"
      />
      <div className="pointer-events-none absolute inset-0 editorial-grid opacity-60" />

      <div ref={ref as any} className="relative z-10 mx-auto max-w-[1100px]">
        <div className="mb-9 flex justify-center">
          <SectionLabel>Temporada 01 · O Retorno da Estratégia</SectionLabel>
        </div>

        <h1 className="font-display text-[64px] font-medium leading-[0.9] tracking-[-2px] text-foreground sm:text-[88px] md:text-[112px] lg:text-[128px]">
          {words.map((w, i) => (
            <span key={i} className="word-reveal mx-[0.05em]">
              <span style={{ transitionDelay: `${i * 80}ms` }}>
                {i === lastIndex ? <em>{w}</em> : w}
              </span>
            </span>
          ))}
        </h1>

        <p
          className="mx-auto mt-9 max-w-[480px] text-[17px] font-light leading-[1.7] text-foreground/50 reveal-up"
          style={{ transitionDelay: "700ms" }}
        >
          {description}
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="reveal-up mx-auto mt-12 flex max-w-[460px]"
            style={{ transitionDelay: "900ms" }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="flex-1 rounded-l-[2px] border border-r-0 border-white/10 bg-white/[0.07] px-5 py-4 text-[15px] text-foreground placeholder:text-foreground/30 outline-none transition-colors focus:border-primary/50 focus:bg-primary/[0.06]"
            />
            <button
              type="submit"
              disabled={createLead.isPending}
              className="btn-sweep relative overflow-hidden rounded-r-[2px] bg-primary px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-opacity disabled:opacity-60"
            >
              <span className="relative z-10">
                {createLead.isPending ? "..." : "Entrar"}
              </span>
            </button>
          </form>
        ) : (
          <p
            className="mx-auto mt-12 max-w-[460px] rounded-[2px] border border-primary/30 bg-primary/10 px-5 py-4 text-sm text-foreground"
            role="status"
          >
            Cadastro feito. Em breve você recebe nossas próximas reflexões.
          </p>
        )}

        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}

        <p
          className="reveal-up mt-4 text-[12px] text-foreground/25"
          style={{ transitionDelay: "1100ms" }}
        >
          Sem spam. Cancele quando quiser.{" "}
          <Link to="/cursos" className="underline underline-offset-4 hover:text-foreground">
            Ou explore as masterclasses →
          </Link>
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="reveal-up absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/25">
        <span className="label-uppercase text-foreground/20">Role</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}
