import { Link } from "react-router-dom";
import { useReveal } from "@/hooks/useReveal";
import { SectionLabel } from "@/components/landing/SectionLabel";

export function ManifestoBlue() {
  const { ref } = useReveal<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full blur-[80px]"
        style={{ background: "rgba(0,0,180,0.25)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 right-[5%] h-[400px] w-[400px] rounded-full blur-[80px]"
        style={{ background: "rgba(0,0,80,0.3)" }}
      />

      <div
        ref={ref as any}
        className="relative mx-auto max-w-[1480px] px-6 py-24 md:px-12 md:py-32"
      >
        <SectionLabel tone="cream">
          <span className="text-white/70">Comunidade</span>
        </SectionLabel>

        <h2 className="mt-12 max-w-[920px] font-display text-[52px] font-semibold leading-[0.9] tracking-[-3px] text-white sm:text-[72px] md:text-[96px] lg:text-[110px]">
          <span className="block overflow-hidden">
            <span className="word-reveal block">
              <span>Aprender é um</span>
            </span>
          </span>
          <span className="block overflow-hidden">
            <span className="word-reveal block">
              <span style={{ transitionDelay: "120ms" }}>
                <em className="text-cream">verbo coletivo.</em>
              </span>
            </span>
          </span>
        </h2>

        <div className="mt-16 grid gap-12 border-t border-white/20 pt-12 md:grid-cols-2 md:gap-16">
          <p className="max-w-[520px] text-[17px] font-light leading-[1.75] text-white/85">
            A Plots é uma comunidade aberta de design. Reunimos parceiros que
            dividem prática real para construir, em coautoria, uma educação
            que pensa com profundidade e age com propósito.
          </p>
          <div className="flex items-end justify-end gap-6">
            <Link
              to="/sobre"
              className="btn-sweep relative inline-flex items-center justify-center overflow-hidden rounded-[2px] border border-white/30 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white"
            >
              <span className="relative z-10">Conhecer a Plots</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
