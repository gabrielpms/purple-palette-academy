import { EditorialButton } from "@/components/landing/EditorialButton";
import { EditorialHeading } from "@/components/landing/EditorialHeading";
import { SectionLabel } from "@/components/landing/SectionLabel";
import { SweepDivider } from "@/components/landing/SweepDivider";
import { EditorialInput } from "@/components/landing/EditorialInput";

// ─── Color tokens ────────────────────────────────────────────────────────────

const colorPalette = [
  {
    group: "Core",
    tokens: [
      { name: "Ink", token: "--background", hex: "#080808", hsl: "0 0% 3%", usage: "bg-background" },
      { name: "Electric Blue", token: "--primary", hex: "#2B2BFF", hsl: "240 100% 58%", usage: "bg-primary" },
      { name: "Cream", token: "--cream", hex: "#F2EDE6", hsl: "36 35% 93%", usage: "text-cream" },
      { name: "White", token: "--foreground", hex: "#FFFFFF", hsl: "0 0% 100%", usage: "text-foreground" },
    ],
  },
  {
    group: "Surfaces",
    tokens: [
      { name: "Surface", token: "--surface", hex: "#121212", hsl: "0 0% 7%", usage: "bg-surface" },
      { name: "Surface 2", token: "--surface-2", hex: "#171717", hsl: "0 0% 9%", usage: "bg-surface-2" },
      { name: "Muted", token: "--muted", hex: "#1C1C1C", hsl: "0 0% 11%", usage: "bg-muted" },
      { name: "Border", token: "--border", hex: "#1F1F1F", hsl: "0 0% 12%", usage: "border-border" },
    ],
  },
  {
    group: "Semantic",
    tokens: [
      { name: "Success", token: "--success", hex: "#4DC877", hsl: "142 50% 55%", usage: "text-success" },
      { name: "Destructive", token: "--destructive", hex: "#E53333", hsl: "0 80% 60%", usage: "text-destructive" },
      { name: "Muted Text", token: "--muted-foreground", hex: "#8C8C8C", hsl: "0 0% 55%", usage: "text-muted-foreground" },
      { name: "Blue Dark", token: "--purple-dark", hex: "#0D0D99", hsl: "240 100% 30%", usage: "text-purple-dark" },
    ],
  },
];

// ─── Type scale ──────────────────────────────────────────────────────────────

const displayScale = [
  { label: "Display / 72px", size: "text-[72px]", sample: "Plots" },
  { label: "H1 / 56px", size: "text-[56px]", sample: "Headline One" },
  { label: "H2 / 40px", size: "text-[40px]", sample: "Headline Two" },
  { label: "H3 / 28px", size: "text-[28px]", sample: "Headline Three" },
  { label: "H4 / 22px", size: "text-[22px]", sample: "Headline Four" },
];

const uiScale = [
  { label: "Body Large / 18px", size: "text-lg", weight: "font-normal" },
  { label: "Body / 16px", size: "text-base", weight: "font-normal" },
  { label: "Body Small / 14px", size: "text-sm", weight: "font-normal" },
  { label: "Label / 12px — 600", size: "text-xs", weight: "font-semibold" },
  { label: "Label Uppercase / 11px — 600", size: "text-[11px]", weight: "font-semibold", extra: "tracking-[3px] uppercase" },
];

// ─── Spacing ─────────────────────────────────────────────────────────────────

const spacingScale = [
  { name: "4", px: "4px", tw: "p-1" },
  { name: "8", px: "8px", tw: "p-2" },
  { name: "12", px: "12px", tw: "p-3" },
  { name: "16", px: "16px", tw: "p-4" },
  { name: "24", px: "24px", tw: "p-6" },
  { name: "32", px: "32px", tw: "p-8" },
  { name: "48", px: "48px", tw: "p-12" },
  { name: "64", px: "64px", tw: "p-16" },
  { name: "80", px: "80px", tw: "p-20" },
  { name: "100", px: "100px", tw: "p-[100px]" },
];

// ─── Shadows ──────────────────────────────────────────────────────────────────

const shadowTokens = [
  { name: "shadow-sm", value: "0 2px 8px -2px rgba(0,0,0,0.4)", tw: "shadow-sm" },
  { name: "shadow-md", value: "0 8px 24px -8px rgba(0,0,0,0.5)", tw: "shadow-md" },
  { name: "shadow-lg", value: "0 16px 48px -12px rgba(0,0,0,0.6)", tw: "shadow-lg" },
  { name: "shadow-card", value: "0 4px 24px -8px rgba(0,0,0,0.4)", tw: "shadow-card" },
  { name: "shadow-card-hover", value: "Blue glow — 0 16px 48px -12px hsl(primary/0.25)", tw: "shadow-card-hover" },
  { name: "shadow-glow", value: "0 0 60px -10px hsl(primary/0.45)", tw: "shadow-glow" },
];

// ─── Animation tokens ─────────────────────────────────────────────────────────

const animationTokens = [
  { name: "fade-in", duration: "0.5s", easing: "ease-out", desc: "Opacity + translateY(10px) entrance" },
  { name: "fade-up", duration: "0.6s", easing: "ease-out", desc: "Opacity + translateY(20px) entrance" },
  { name: "scale-in", duration: "0.3s", easing: "ease-out", desc: "Opacity + scale(0.95→1)" },
  { name: "clip-reveal", duration: "1s", easing: "cubic-bezier(0.16,1,0.3,1)", desc: "Clip-path left→right reveal" },
  { name: "word-reveal", duration: "0.9s", easing: "cubic-bezier(0.16,1,0.3,1)", desc: "Word translateY(110%→0)" },
  { name: "glow-pulse", duration: "7s infinite", easing: "ease-in-out alternate", desc: "Radial glow scale + opacity" },
  { name: "marquee", duration: "28s linear infinite", easing: "linear", desc: "Horizontal translateX loop" },
  { name: "float", duration: "6s infinite", easing: "ease-in-out", desc: "Subtle Y-axis oscillation" },
  { name: "shimmer", duration: "3s infinite", easing: "ease-in-out", desc: "Background-position sweep" },
];

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`py-16 ${className}`}>
      {children}
    </section>
  );
}

function SectionHeader({ label, title, desc }: { label: string; title: React.ReactNode; desc?: string }) {
  return (
    <div className="mb-12">
      <SectionLabel className="mb-4">{label}</SectionLabel>
      <EditorialHeading as="h2" className="text-[36px] mb-4">
        {title}
      </EditorialHeading>
      {desc && <p className="text-muted-foreground text-sm max-w-lg">{desc}</p>}
    </div>
  );
}

// ─── Color swatch ─────────────────────────────────────────────────────────────

function ColorSwatch({ name, hex, hsl, token, usage }: {
  name: string; hex: string; hsl: string; token: string; usage: string;
}) {
  const isLight = ["#FFFFFF", "#F2EDE6"].includes(hex);
  return (
    <div className="group flex flex-col gap-0 border border-border rounded-[2px] overflow-hidden">
      <div
        className="h-20 w-full transition-all duration-300 group-hover:h-28"
        style={{ backgroundColor: hex }}
      />
      <div className="p-4 bg-surface space-y-1">
        <p className="text-foreground text-[13px] font-semibold">{name}</p>
        <p className="text-muted-foreground text-[11px] font-mono">{hex}</p>
        <p className="text-muted-foreground text-[11px] font-mono leading-relaxed">{hsl}</p>
        <p className="text-primary text-[10px] font-mono pt-1">{usage}</p>
      </div>
    </div>
  );
}

// ─── Token badge ──────────────────────────────────────────────────────────────

function TokenBadge({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-2 py-0.5 text-[11px] font-mono bg-muted text-primary rounded-[2px] border border-border">
      {children}
    </code>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative border-b border-border overflow-hidden">
        <div className="editorial-grid absolute inset-0 pointer-events-none" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-[60px] py-24">
          <SectionLabel className="mb-6" tone="cream">Plots — Design System</SectionLabel>
          <EditorialHeading as="h1" className="text-[72px] leading-none mb-6">
            Design <em>System</em>
          </EditorialHeading>
          <p className="text-muted-foreground text-lg max-w-xl mb-8 leading-relaxed">
            Tokens, tipografia, componentes e padrões de animação que constroem a identidade editorial da Plots Academy.
          </p>
          <div className="flex items-center gap-3">
            <TokenBadge>v1.0</TokenBadge>
            <TokenBadge>Cormorant + Space Grotesk</TokenBadge>
            <TokenBadge>Tailwind CSS</TokenBadge>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-[60px]">

        {/* ── Colors ───────────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="01 — Cores"
            title={<>Paleta <em>Editorial</em></>}
            desc="Fundo Ink profundo, azul elétrico como acento de ação e creme para ênfase tipográfica em itálico."
          />
          <div className="space-y-12">
            {colorPalette.map((group) => (
              <div key={group.group}>
                <p className="label-uppercase text-muted-foreground mb-4">{group.group}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {group.tokens.map((t) => (
                    <ColorSwatch key={t.name} {...t} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient tokens */}
          <div className="mt-12">
            <p className="label-uppercase text-muted-foreground mb-4">Gradientes</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "gradient-primary", style: "linear-gradient(135deg, #2B2BFF 0%, #0D0D99 100%)" },
                { name: "gradient-subtle", style: "linear-gradient(180deg, #121212 0%, #080808 100%)" },
                { name: "gradient-dark", style: "linear-gradient(135deg, #0D0D0D 0%, #171717 100%)" },
                { name: "gradient-hero", style: "linear-gradient(180deg, #080808 0%, #0D0D0D 100%)" },
              ].map((g) => (
                <div key={g.name} className="border border-border rounded-[2px] overflow-hidden">
                  <div className="h-20" style={{ background: g.style }} />
                  <div className="p-4 bg-surface">
                    <p className="text-[11px] font-mono text-muted-foreground">{g.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Typography ───────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="02 — Tipografia"
            title={<>Duas <em>famílias</em></>}
            desc="Cormorant Garamond para display editorial; Space Grotesk para interface e corpo de texto."
          />

          {/* Font families */}
          <div className="grid md:grid-cols-2 gap-1 mb-16">
            <div className="p-8 bg-surface border border-border space-y-4">
              <p className="label-uppercase text-muted-foreground">Display — Cormorant Garamond</p>
              <p className="font-display text-[56px] leading-[0.95] tracking-tight">
                Forma e <em>função</em>
              </p>
              <div className="pt-4 space-y-1 text-[11px] text-muted-foreground font-mono">
                <p>font-family: Cormorant Garamond, Georgia, serif</p>
                <p>weights: 400, 500, 600, 700 + italic</p>
                <p>tracking: -0.01em</p>
                <p>leading: 0.95 (headings)</p>
              </div>
            </div>
            <div className="p-8 bg-surface border border-border space-y-4">
              <p className="label-uppercase text-muted-foreground">UI — Space Grotesk</p>
              <p className="font-ui text-[40px] font-medium leading-tight">
                Design é estratégia
              </p>
              <div className="pt-4 space-y-1 text-[11px] text-muted-foreground font-mono">
                <p>font-family: Space Grotesk, system-ui, sans-serif</p>
                <p>weights: 300, 400, 500, 600, 700</p>
                <p>tracking: default / 3px (labels)</p>
                <p>leading: 1.5 (body)</p>
              </div>
            </div>
          </div>

          {/* Display scale */}
          <div className="mb-12">
            <p className="label-uppercase text-muted-foreground mb-6">Escala Display</p>
            <div className="border border-border divide-y divide-border">
              {displayScale.map((item) => (
                <div key={item.label} className="flex items-baseline gap-6 px-6 py-4 bg-surface hover:bg-muted transition-colors">
                  <span className="w-40 text-[11px] font-mono text-muted-foreground shrink-0">{item.label}</span>
                  <span className={`font-display ${item.size} leading-none tracking-tight`}>{item.sample}</span>
                </div>
              ))}
            </div>
          </div>

          {/* UI scale */}
          <div>
            <p className="label-uppercase text-muted-foreground mb-6">Escala UI</p>
            <div className="border border-border divide-y divide-border">
              {uiScale.map((item) => (
                <div key={item.label} className="flex items-center gap-6 px-6 py-4 bg-surface hover:bg-muted transition-colors">
                  <span className="w-56 text-[11px] font-mono text-muted-foreground shrink-0">{item.label}</span>
                  <span className={`font-ui ${item.size} ${item.weight} ${item.extra ?? ""}`}>
                    Design é estratégia, produto é consequência
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial italic */}
          <div className="mt-8 p-6 border border-primary/20 bg-primary/5 rounded-[2px]">
            <p className="label-uppercase text-primary mb-4">Itálico Editorial — Acento Creme</p>
            <p className="font-display text-[32px] leading-tight tracking-tight">
              Aprender design é aprender a ver o <em>invisível</em>
            </p>
            <p className="text-muted-foreground text-sm mt-3 font-mono">
              {"<em>"} dentro de headings aplica <code>font-style: italic</code> + <code>color: hsl(var(--cream))</code>
            </p>
          </div>
        </Section>

        {/* ── Spacing ──────────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="03 — Espaçamento"
            title={<>Grid de <em>8px</em></>}
            desc="Escala baseada em múltiplos de 4px. Seções usam 100px vertical no desktop e 72px no mobile."
          />
          <div className="space-y-3">
            {spacingScale.map((s) => (
              <div key={s.name} className="flex items-center gap-6">
                <span className="w-16 text-[11px] font-mono text-muted-foreground">{s.px}</span>
                <div className="h-5 bg-primary" style={{ width: s.px }} />
                <span className="text-[11px] font-mono text-muted-foreground">{s.tw}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-1">
            <div className="p-6 bg-surface border border-border">
              <p className="label-uppercase text-muted-foreground mb-3">Container</p>
              <p className="font-display text-2xl mb-2">max-w-[1400px]</p>
              <p className="text-muted-foreground text-sm">px-[60px] desktop · px-[28px] mobile</p>
            </div>
            <div className="p-6 bg-surface border border-border">
              <p className="label-uppercase text-muted-foreground mb-3">Seção</p>
              <p className="font-display text-2xl mb-2">py-[100px]</p>
              <p className="text-muted-foreground text-sm">100px desktop · 72–80px mobile</p>
            </div>
            <div className="p-6 bg-surface border border-border">
              <p className="label-uppercase text-muted-foreground mb-3">Grid editorial</p>
              <p className="font-display text-2xl mb-2">80px × 80px</p>
              <p className="text-muted-foreground text-sm">1px branco 2.5% opacidade</p>
            </div>
          </div>
        </Section>

        {/* ── Border Radius ─────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="04 — Bordas"
            title={<>Quase <em>quadrado</em></>}
            desc="Border-radius mínimo reforça o caráter editorial e gráfico do sistema."
          />
          <div className="flex flex-wrap gap-8 items-end">
            {[
              { label: "rounded-sm / 0px", r: "0px" },
              { label: "rounded / 2px (padrão)", r: "2px" },
              { label: "rounded-md / 4px", r: "4px" },
              { label: "rounded-lg / 8px (admin)", r: "8px" },
              { label: "rounded-full", r: "9999px" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 bg-primary"
                  style={{ borderRadius: item.r }}
                />
                <p className="text-[10px] font-mono text-muted-foreground text-center max-w-[80px]">{item.label}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Shadows ──────────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="05 — Sombras"
            title={<>Profundidade <em>sutil</em></>}
            desc="Sombras escuras para fundo dark; shadow-card-hover adiciona brilho azul no hover de cards."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {shadowTokens.map((s) => (
              <div
                key={s.name}
                className="p-6 bg-surface border border-border rounded-[2px] transition-all duration-300 hover:scale-[1.02]"
                style={{ boxShadow: s.name === "shadow-glow" ? "0 0 60px -10px hsl(240 100% 58% / 0.45)" : undefined }}
              >
                <p className="font-mono text-[11px] text-primary mb-2">{s.name}</p>
                <p className="text-[10px] text-muted-foreground font-mono leading-relaxed mb-3">{s.value}</p>
                <TokenBadge>{s.tw}</TokenBadge>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Components ───────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="06 — Componentes"
            title={<>Peças <em>editoriais</em></>}
            desc="Componentes construídos sobre os tokens do sistema — cada um com animação própria."
          />

          {/* EditorialButton */}
          <div className="mb-12">
            <p className="label-uppercase text-muted-foreground mb-6">EditorialButton</p>
            <div className="p-8 bg-surface border border-border rounded-[2px] space-y-8">
              <div>
                <p className="text-[11px] text-muted-foreground mb-4 font-mono">Variantes</p>
                <div className="flex flex-wrap gap-4">
                  <EditorialButton variant="white">White (padrão)</EditorialButton>
                  <EditorialButton variant="blue">Blue</EditorialButton>
                  <EditorialButton variant="ghost">Ghost</EditorialButton>
                </div>
              </div>
              <div>
                <p className="text-[11px] text-muted-foreground mb-4 font-mono">Tamanhos</p>
                <div className="flex flex-wrap items-center gap-4">
                  <EditorialButton size="sm">Small</EditorialButton>
                  <EditorialButton size="md">Medium</EditorialButton>
                  <EditorialButton size="lg">Large</EditorialButton>
                </div>
              </div>
              <div className="pt-4 border-t border-border text-[11px] font-mono text-muted-foreground space-y-1">
                <p>Hover: btn-sweep — overlay branco scaleX(0→1), origin left, 400ms</p>
                <p>Classes base: inline-flex items-center gap-2 font-semibold uppercase tracking-[0.12em] rounded-[2px]</p>
              </div>
            </div>
          </div>

          {/* SectionLabel */}
          <div className="mb-12">
            <p className="label-uppercase text-muted-foreground mb-6">SectionLabel</p>
            <div className="p-8 bg-surface border border-border rounded-[2px] space-y-6">
              <div className="space-y-4">
                <SectionLabel tone="blue">Blue — Padrão</SectionLabel>
                <SectionLabel tone="cream">Cream — Acento</SectionLabel>
                <SectionLabel tone="muted">Muted — Discreto</SectionLabel>
                <SectionLabel withLine={false}>Sem linha</SectionLabel>
              </div>
              <div className="pt-4 border-t border-border text-[11px] font-mono text-muted-foreground">
                <p>label-uppercase: font-size 11px · font-weight 600 · letter-spacing 3px · text-transform uppercase</p>
                <p>Reveal: clip-path inset(0 100% 0 0 → 0 0 0 0) via IntersectionObserver</p>
              </div>
            </div>
          </div>

          {/* EditorialHeading */}
          <div className="mb-12">
            <p className="label-uppercase text-muted-foreground mb-6">EditorialHeading</p>
            <div className="p-8 bg-surface border border-border rounded-[2px] space-y-6">
              <EditorialHeading as="h2" className="text-[48px]">
                Aprender <em>design</em>
              </EditorialHeading>
              <EditorialHeading as="h3" className="text-[32px]" text="palavra por palavra" italicLast />
              <div className="pt-4 border-t border-border text-[11px] font-mono text-muted-foreground space-y-1">
                <p>font-display leading-[0.95] tracking-tight</p>
                <p>Prop text: split por palavra → word-reveal span com stagger de 60ms por palavra</p>
                <p>italicLast: aplica {"<em>"} na última palavra → creme + itálico</p>
              </div>
            </div>
          </div>

          {/* SweepDivider */}
          <div className="mb-12">
            <p className="label-uppercase text-muted-foreground mb-6">SweepDivider</p>
            <div className="p-8 bg-surface border border-border rounded-[2px] space-y-6">
              <SweepDivider />
              <div className="text-[11px] font-mono text-muted-foreground space-y-1">
                <p>height: 1px · background: hsl(0 0% 100% / 0.07)</p>
                <p>Após IntersectionObserver: ::after sweep azul left(-100%) → left(200%), 1.2s ease</p>
              </div>
            </div>
          </div>

          {/* EditorialInput */}
          <div className="mb-12">
            <p className="label-uppercase text-muted-foreground mb-6">EditorialInput</p>
            <div className="p-8 bg-surface border border-border rounded-[2px] space-y-6">
              <EditorialInput placeholder="nome@email.com" label="E-mail" />
              <div className="text-[11px] font-mono text-muted-foreground">
                <p>Border bottom only · focus: border-primary · label flutuante uppercase 11px</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Animations ───────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="07 — Animações"
            title={<>Motion <em>editorial</em></>}
            desc="Easing personalizado cubic-bezier(0.16, 1, 0.3, 1) — entrada rápida, saída suave. Todas as animações respeitam prefers-reduced-motion."
          />

          <div className="grid md:grid-cols-3 gap-1 mb-8">
            {animationTokens.map((a) => (
              <div key={a.name} className="p-6 bg-surface border border-border hover:border-primary/40 transition-colors">
                <p className="font-mono text-[12px] text-primary mb-1">{a.name}</p>
                <p className="text-[10px] font-mono text-muted-foreground mb-3">{a.duration} · {a.easing}</p>
                <p className="text-sm text-foreground/70">{a.desc}</p>
              </div>
            ))}
          </div>

          {/* Easing visual */}
          <div className="p-6 border border-border bg-surface rounded-[2px]">
            <p className="label-uppercase text-muted-foreground mb-4">Easing Padrão</p>
            <div className="flex items-center gap-4">
              <code className="text-primary font-mono text-sm">cubic-bezier(0.16, 1, 0.3, 1)</code>
              <span className="text-muted-foreground text-sm">— entrada acelerada, overshoots suave na saída</span>
            </div>
          </div>
        </Section>

        {/* ── Utility Classes ───────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="08 — Utilitários CSS"
            title={<>Classes <em>prontas</em></>}
            desc="Helpers de layout, reveal e textura definidos em @layer utilities."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { cls: ".editorial-grid", desc: "Grid 80×80px com linhas brancas 2.5% — textura de fundo" },
              { cls: ".editorial-glow", desc: "Radial gradient azul com blur — efeito de brilho ambiental" },
              { cls: ".sweep-line", desc: "Divisor 1px + sweep azul via ::after no scroll" },
              { cls: ".reveal-clip", desc: "clip-path inset(0 100%→0) via .is-visible" },
              { cls: ".reveal-up", desc: "opacity 0 + translateY(24px) → 1/0 via .is-visible" },
              { cls: ".word-reveal", desc: "Wrapper por palavra — translateY(110%→0) em span filho" },
              { cls: ".btn-sweep", desc: "Overlay ::before scaleX(0→1) no hover — origin left" },
              { cls: ".label-uppercase", desc: "11px / 600 / 3px letter-spacing / uppercase" },
              { cls: ".editorial-divider", desc: "Linha 32×1px, opacidade 40% — separador inline" },
              { cls: ".shadow-glow", desc: "box-shadow 0 0 60px -10px hsl(primary/0.45)" },
              { cls: ".text-cream", desc: "color: hsl(var(--cream)) — itálico editorial" },
              { cls: ".text-gradient", desc: "bg-clip-text + gradient-primary — texto degradê" },
            ].map((u) => (
              <div key={u.cls} className="flex gap-4 p-4 border border-border bg-surface rounded-[2px]">
                <TokenBadge>{u.cls}</TokenBadge>
                <p className="text-sm text-muted-foreground">{u.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Themes ───────────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="09 — Temas"
            title={<>Três <em>contextos</em></>}
            desc="O sistema suporta três themes: o padrão editorial escuro, light mode e o admin produtivo."
          />
          <div className="grid md:grid-cols-3 gap-1">
            <div className="p-8 bg-background border border-border">
              <p className="label-uppercase text-primary mb-4">Dark (padrão)</p>
              <div className="space-y-2 text-sm text-muted-foreground font-mono">
                <p>background: #080808</p>
                <p>primary: #2B2BFF</p>
                <p>radius: 2px</p>
              </div>
            </div>
            <div className="p-8 bg-[#FAFAFA] border border-[#E5E5E5]">
              <p className="label-uppercase text-[#1A1AF5] mb-4 text-[11px] font-semibold tracking-[3px]">Light</p>
              <div className="space-y-2 text-sm text-[#666] font-mono">
                <p>background: #FAFAFA</p>
                <p>primary: #1A1AF5</p>
                <p>radius: 2px</p>
              </div>
            </div>
            <div className="p-8 bg-[#121212] border border-[#2E2E2E]">
              <p className="label-uppercase text-[#F26B5B] mb-4 text-[11px] font-semibold tracking-[3px]">Admin</p>
              <div className="space-y-2 text-sm text-[#999] font-mono">
                <p>background: #121212</p>
                <p>primary: #F26B5B (coral)</p>
                <p>radius: 8px</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Tech Stack ────────────────────────────────────────────────────── */}
        <Section>
          <SweepDivider className="mb-16" />
          <SectionHeader
            label="10 — Stack"
            title={<>Tecnologia <em>base</em></>}
          />
          <div className="grid md:grid-cols-4 gap-1">
            {[
              { name: "React 18", role: "UI Framework" },
              { name: "TypeScript", role: "Type Safety" },
              { name: "Tailwind CSS 3", role: "Utility Styling" },
              { name: "Vite", role: "Build Tool" },
              { name: "shadcn/ui", role: "Radix Components" },
              { name: "Lucide React", role: "Icon Library" },
              { name: "Supabase", role: "Backend + Auth" },
              { name: "React Query", role: "Server State" },
            ].map((t) => (
              <div key={t.name} className="p-6 bg-surface border border-border">
                <p className="font-display text-xl mb-1">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </Section>

      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <div className="border-t border-border mt-8">
        <div className="max-w-[1400px] mx-auto px-[60px] py-12 flex items-center justify-between">
          <p className="font-display text-xl">Plots Design System <em>v1.0</em></p>
          <p className="text-muted-foreground text-sm">2025 · Uso interno</p>
        </div>
      </div>
    </div>
  );
}
