# Plots — Design System

> Identidade visual editorial da **Plots Academy**: tokens, tipografia, componentes e padrões de animação.

---

## Índice

1. [Princípios](#1-princípios)
2. [Cores](#2-cores)
3. [Tipografia](#3-tipografia)
4. [Espaçamento](#4-espaçamento)
5. [Bordas & Raio](#5-bordas--raio)
6. [Sombras & Glow](#6-sombras--glow)
7. [Componentes](#7-componentes)
8. [Animações](#8-animações)
9. [Utilitários CSS](#9-utilitários-css)
10. [Temas](#10-temas)
11. [Stack Técnica](#11-stack-técnica)

---

## 1. Princípios

| Princípio | Descrição |
|-----------|-----------|
| **Editorial Excellence** | Tipografia serifada com itálico creme para hierarquia visual marcante |
| **Dark & Bold** | Fundo Ink profundo (#080808) com azul elétrico como contraste de ação |
| **Reveal Animations** | Conteúdo entra na tela com timing coreografado e escalonado |
| **Minimal Borders** | Raio de 2px e linhas de 1px reforçam o caráter gráfico e impresso |
| **Responsive Typography** | `clamp()` para escalonamento fluido entre breakpoints |
| **Interaction Depth** | Hovers revelam, escalam e brilham — cada elemento responde ao toque |

---

## 2. Cores

### Paleta Core

| Nome | Token CSS | Hex | HSL | Uso |
|------|-----------|-----|-----|-----|
| **Ink** | `--background` | `#080808` | `0 0% 3%` | Fundo principal |
| **Electric Blue** | `--primary` | `#2B2BFF` | `240 100% 58%` | CTAs, destaques, interações |
| **Cream** | `--cream` | `#F2EDE6` | `36 35% 93%` | Itálico editorial em headings |
| **White** | `--foreground` | `#FFFFFF` | `0 0% 100%` | Texto principal |

### Superfícies

| Nome | Token CSS | Hex | HSL |
|------|-----------|-----|-----|
| Surface | `--surface` | `#121212` | `0 0% 7%` |
| Surface 2 | `--surface-2` | `#171717` | `0 0% 9%` |
| Muted | `--muted` | `#1C1C1C` | `0 0% 11%` |
| Border | `--border` | `#1F1F1F` | `0 0% 12%` |

### Semânticas

| Nome | Token CSS | Hex | HSL |
|------|-----------|-----|-----|
| Success | `--success` | `#4DC877` | `142 50% 55%` |
| Destructive | `--destructive` | `#E53333` | `0 80% 60%` |
| Muted Text | `--muted-foreground` | `#8C8C8C` | `0 0% 55%` |

### Gradientes

```css
--gradient-primary: linear-gradient(135deg, hsl(240 100% 58%) 0%, hsl(240 100% 35%) 100%);
--gradient-subtle:  linear-gradient(180deg, hsl(0 0% 7%) 0%, hsl(0 0% 3%) 100%);
--gradient-dark:    linear-gradient(135deg, hsl(0 0% 5%) 0%, hsl(0 0% 9%) 100%);
--gradient-hero:    linear-gradient(180deg, hsl(0 0% 3%) 0%, hsl(0 0% 5%) 100%);
```

---

## 3. Tipografia

### Famílias de Fonte

| Família | Fonte | Pesos | Uso |
|---------|-------|-------|-----|
| **Display** | `Cormorant Garamond` | 400, 500, 600, 700 + italic | H1–H6, títulos editoriais |
| **UI / Body** | `Space Grotesk` | 300, 400, 500, 600, 700 | Corpo, labels, botões, nav |

```css
font-family: 'Cormorant Garamond', Georgia, serif;   /* font-display */
font-family: 'Space Grotesk', system-ui, sans-serif; /* font-ui / font-sans */
```

### Escala Display (Cormorant Garamond)

| Token | Tamanho | Letter-spacing | Line-height |
|-------|---------|---------------|-------------|
| Display | 72px | -0.01em | 0.95 |
| H1 | 56px | -0.01em | 0.95 |
| H2 | 40px | -0.01em | 0.95 |
| H3 | 28px | -0.01em | 1.1 |
| H4 | 22px | -0.01em | 1.2 |

### Escala UI (Space Grotesk)

| Token | Tamanho | Peso |
|-------|---------|------|
| Body Large | 18px | 400 |
| Body | 16px | 400 |
| Body Small | 14px | 400 |
| Label | 12px | 600 |
| Label Uppercase | 11px | 600, letter-spacing: 3px |

### Padrão Editorial — Itálico Creme

```html
<!-- Em headings, <em> = itálico + cor creme automático -->
<h2 class="font-display">Aprender design é aprender a ver o <em>invisível</em></h2>
```

```css
.font-display em, h1 em, h2 em, h3 em {
  font-style: italic;
  color: hsl(var(--cream)); /* #F2EDE6 */
}
```

---

## 4. Espaçamento

Base: **múltiplos de 4px**.

| Token | px | Tailwind |
|-------|----|---------|
| 4 | 4px | `p-1` |
| 8 | 8px | `p-2` |
| 12 | 12px | `p-3` |
| 16 | 16px | `p-4` |
| 24 | 24px | `p-6` |
| 32 | 32px | `p-8` |
| 48 | 48px | `p-12` |
| 64 | 64px | `p-16` |
| 80 | 80px | `p-20` |
| 100 | 100px | `py-[100px]` (padding de seção) |

### Layout & Container

```
max-width:  1400px (screens.2xl)
padding:    px-[60px] desktop / px-[28px] mobile
seção:      py-[100px] desktop / py-[72–80px] mobile
gap grid:   1px (separadores visíveis) ou 16px+ entre cards
```

---

## 5. Bordas & Raio

```css
--radius: 0.125rem; /* 2px — quase quadrado, estilo editorial */
```

| Classe Tailwind | Valor |
|-----------------|-------|
| `rounded-sm` | 0px |
| `rounded` | 2px (padrão) |
| `rounded-md` | 4px |
| `rounded-lg` | 8px (admin theme) |
| `rounded-full` | 9999px (avatares/badges) |

---

## 6. Sombras & Glow

```css
--shadow-sm:        0 2px  8px  -2px hsl(0 0% 0% / 0.4);
--shadow-md:        0 8px  24px -8px hsl(0 0% 0% / 0.5);
--shadow-lg:        0 16px 48px -12px hsl(0 0% 0% / 0.6);
--shadow-card:      0 4px  24px -8px hsl(0 0% 0% / 0.4);
--shadow-card-hover:0 16px 48px -12px hsl(240 100% 58% / 0.25); /* blue glow */
```

```css
/* Utilitário */
.shadow-glow { box-shadow: 0 0 60px -10px hsl(var(--primary) / 0.45); }
```

---

## 7. Componentes

### `EditorialButton`

```tsx
import { EditorialButton } from "@/components/landing/EditorialButton";

<EditorialButton variant="white">Explorar cursos</EditorialButton>
<EditorialButton variant="blue">Começar agora</EditorialButton>
<EditorialButton variant="ghost">Saiba mais</EditorialButton>
```

| Prop | Valores | Default |
|------|---------|---------|
| `variant` | `white` \| `blue` \| `ghost` | `white` |
| `size` | `sm` \| `md` \| `lg` | `md` |

**Comportamento:** Hover dispara `btn-sweep` — overlay branco `scaleX(0→1)`, origin left, `400ms cubic-bezier(0.16,1,0.3,1)`.

---

### `EditorialHeading`

```tsx
import { EditorialHeading } from "@/components/landing/EditorialHeading";

// Com children e <em>
<EditorialHeading as="h2" className="text-[48px]">
  Aprender <em>design</em>
</EditorialHeading>

// Com prop text + italicLast (word-by-word reveal)
<EditorialHeading as="h3" text="palavra por palavra" italicLast />
```

| Prop | Tipo | Descrição |
|------|------|-----------|
| `as` | `ElementType` | Tag HTML (`h1`–`h6`) |
| `text` | `string` | Texto simples com word-reveal |
| `italicLast` | `boolean` | Aplica `<em>` na última palavra |
| `className` | `string` | Classes Tailwind adicionais |

**Animação:** `word-reveal` — cada palavra em `<span class="word-reveal"><span>` com `transitionDelay: i * 60ms`. Ativa via `IntersectionObserver` com `threshold: 0.2`.

---

### `SectionLabel`

```tsx
import { SectionLabel } from "@/components/landing/SectionLabel";

<SectionLabel>01 — Cursos</SectionLabel>
<SectionLabel tone="cream">Editorial</SectionLabel>
<SectionLabel tone="muted" withLine={false}>Discreto</SectionLabel>
```

| Prop | Valores | Default |
|------|---------|---------|
| `tone` | `blue` \| `cream` \| `muted` | `blue` |
| `withLine` | `boolean` | `true` |

**Estilo:** `label-uppercase` — 11px, 600, 3px letter-spacing, uppercase. **Animação:** `reveal-clip` via `IntersectionObserver` com `threshold: 0.4`.

---

### `SweepDivider`

```tsx
import { SweepDivider } from "@/components/landing/SweepDivider";

<SweepDivider />
<SweepDivider className="my-16" />
```

Linha de 1px `hsl(0 0% 100% / 0.07)`. Após entrar em viewport: `::after` sweep azul `left(-100% → 200%)` em `1.2s ease`.

---

### `EditorialInput`

```tsx
import { EditorialInput } from "@/components/landing/EditorialInput";

<EditorialInput placeholder="nome@email.com" label="E-mail" />
```

Border bottom only. Focus: `border-primary`. Label flutuante uppercase 11px.

---

## 8. Animações

### Keyframes personalizados

| Nome | Duração | Easing | Descrição |
|------|---------|--------|-----------|
| `fade-in` | `0.5s` | `ease-out` | opacity + translateY(10px) → 0 |
| `fade-up` | `0.6s` | `ease-out` | opacity + translateY(20px) → 0 |
| `scale-in` | `0.3s` | `ease-out` | opacity + scale(0.95 → 1) |
| `clip-reveal` | `1s` | `cubic` | clipPath inset(0 100% → 0) |
| `word-reveal` | `0.9s` | `cubic` | translateY(110% → 0) |
| `glow-pulse` | `7s ∞` | `ease-in-out alt` | opacity + scale do glow |
| `marquee` | `28s ∞` | `linear` | translateX loop horizontal |
| `float` | `6s ∞` | `ease-in-out` | Y-axis oscillation ±10px |
| `shimmer` | `3s ∞` | `ease-in-out` | background-position sweep |
| `scroll-line` | `1.8s ∞` | `ease-in-out` | scaleY 0→1→0 (linha de scroll) |

### Easing padrão

```css
cubic-bezier(0.16, 1, 0.3, 1)
/* Entrada acelerada, saída com overshoot suave */
```

### Classes de reveal (IntersectionObserver)

```css
/* Clip path — horizontal reveal */
.reveal-clip { clip-path: inset(0 100% 0 0); transition: clip-path 0.9s cubic-bezier(0.16,1,0.3,1); }
.reveal-clip.is-visible { clip-path: inset(0 0 0 0); }

/* Fade up */
.reveal-up { opacity: 0; transform: translateY(24px); transition: opacity 0.8s, transform 0.8s; }
.reveal-up.is-visible { opacity: 1; transform: translateY(0); }

/* Word reveal — aplicado por palavra */
.word-reveal > span { display: inline-block; transform: translateY(110%); transition: transform 0.9s; }
.is-visible .word-reveal > span { transform: translateY(0); }
```

### Acessibilidade

```css
@media (prefers-reduced-motion: reduce) {
  .reveal-clip, .reveal-up, .word-reveal > span, .sweep-line::after {
    transition: none !important;
  }
  /* Estados finais aplicados diretamente */
}
```

---

## 9. Utilitários CSS

Definidos em `@layer utilities` no `src/index.css`.

| Classe | Descrição |
|--------|-----------|
| `.editorial-grid` | Grid 80×80px, linhas brancas 2.5% de opacidade |
| `.editorial-glow` | Radial gradient azul com blur — efeito ambiental |
| `.sweep-line` | Divisor 1px com sweep azul no scroll |
| `.reveal-clip` | Reveal horizontal via clip-path |
| `.reveal-up` | Reveal por opacidade + translateY |
| `.word-reveal` | Wrapper de palavra para animação stagger |
| `.btn-sweep` | Overlay branco no hover de botões |
| `.label-uppercase` | 11px / 600 / 3px letter-spacing / uppercase |
| `.editorial-divider` | Linha 32×1px, opacidade 40% |
| `.shadow-glow` | Box-shadow com brilho azul |
| `.text-cream` | `color: hsl(var(--cream))` |
| `.text-gradient` | Texto com gradiente primário |
| `.bg-gradient-primary` | Background gradient primário |
| `.bg-gradient-subtle` | Background gradient sutil |
| `.bg-ink` | Background Ink |
| `.bg-blue` | Background Electric Blue |

---

## 10. Temas

O sistema suporta três contextos de tema via CSS custom properties:

### Dark (padrão — editorial)

```
background: #080808   primary: #2B2BFF   radius: 2px
```

Aplicado por padrão em `:root`. Estética escura com forte contraste azul elétrico.

### Light

```
background: #FAFAFA   foreground: #1A1A1A   primary: #1A1AF5
```

Ativado com a classe `.light` no `<html>`. Mantém azul elétrico em fundo claro.

### Admin

```
background: #121212   primary: #F26B5B (coral)   radius: 8px
```

Ativado com a classe `.admin-theme`. Mais arredondado, tom coral para identidade de produto interno.

---

## 11. Stack Técnica

| Tecnologia | Versão | Papel |
|-----------|--------|-------|
| **React** | 18.3.1 | Framework de UI |
| **TypeScript** | — | Tipagem estática |
| **Vite** | — | Build tool e dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first CSS |
| **shadcn/ui** | — | Componentes Radix UI + Tailwind |
| **Lucide React** | — | Ícones |
| **Supabase** | — | Backend, auth, banco de dados |
| **React Query** | — | Server state management |
| **React Router DOM** | — | Roteamento SPA |
| **Recharts** | — | Gráficos (admin) |
| **React Hook Form + Zod** | — | Formulários + validação |

### Arquivos-chave

```
src/index.css              # Design tokens, @layer base + utilities
tailwind.config.ts         # Extensão do tema Tailwind
src/components/landing/    # Componentes editoriais (Button, Heading, Label…)
src/components/home/       # Seções da homepage
src/components/ui/         # Componentes shadcn/ui
src/pages/DesignSystemPage.tsx  # Living Design System (rota /design-system)
```

---

> Design System mantido pelo time Plots · 2025
