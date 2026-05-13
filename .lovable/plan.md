## Objetivo

Trazer o sistema visual da `public/landing.html` para todo o site público em React: paleta azul elétrica + ink, tipografia serif/sans, animações de revelação, cursor custom e linguagem editorial. Estrutura de dados (Supabase, hooks, rotas) e admin permanecem intactos.

---

## 1. Sistema de Design (base)

**`src/index.css`** — substituir o tema atual (coral/Plus Jakarta) pelo da landing:

Tokens (em HSL):
- `--background` ink `0 0% 3%` (#080808)
- `--surface` `0 0% 7%` / `--surface-2` `0 0% 9%`
- `--foreground` branco
- `--primary` azul elétrico `240 100% 58%` (#2B2BFF), `--primary-foreground` branco
- `--cream` `36 35% 93%` (#F2EDE6) — usado para itálico editorial
- `--muted-foreground` rgba(255,255,255,.5)
- `--border` rgba(255,255,255,.07)
- `--radius` 1px (cantos quase retos como na landing)

Tipografia:
- Substituir import do Google Fonts por **Cormorant Garamond** (serif display, com itálico) + **Space Grotesk** (UI/body)
- `body` → Space Grotesk; `h1–h3` e classe `.font-display` → Cormorant Garamond, peso 500/600
- Utilitário `.italic-cream` para `<em>` editorial

Utilitários novos (em `@layer utilities`):
- `.cursor-none-area` — esconde cursor do sistema
- `.sweep-line`, `.hero-grid`, `.hero-glow` (orbs com `radial-gradient`)
- `.reveal-up` (clip-path inset reveal), `.word-reveal` (translateY 110%→0)
- `.btn-sweep` (overlay branco scaleX no hover)

**`tailwind.config.ts`** — adicionar:
- `fontFamily: { display: ['Cormorant Garamond', 'serif'], sans: ['Space Grotesk', 'sans-serif'] }`
- Cor `blue: 'hsl(var(--primary))'`, `ink`, `cream`
- Keyframes/animations: `clip-reveal`, `word-reveal`, `fade-up`, `glow-pulse`, `marquee`, `scroll-line`, `sweep`

---

## 2. Componentes globais novos / refatorados

Criar em `src/components/landing/`:

| Componente | Função |
|---|---|
| `CustomCursor.tsx` | Cursor com dot + ring (escala em hover de a/button). Desabilitado em touch. |
| `EditorialHeading.tsx` | H1/H2 serif com word-reveal por palavra; suporta `<em>` cream |
| `SectionLabel.tsx` | Tag uppercase azul com clip-reveal e linha lateral |
| `SweepDivider.tsx` | Linha 1px com varredura azul ao entrar no viewport (IntersectionObserver) |
| `Marquee.tsx` | Ticker infinito de tags (cursos, valores) |
| `RevealOnScroll.tsx` | Wrapper genérico que aplica `.rev` quando entra no viewport |
| `EditorialButton.tsx` | Botão pill quadrado, uppercase, com sweep interno |
| `EditorialInput.tsx` | Input com borda fina, foco azul translúcido |

Refatorar:
- **`Header.tsx`** → nav fixa com padding 28px→15px ao scrollar, links em `letter-spacing:.5px`, CTA branco que vira azul no hover
- **`Footer.tsx`** → fundo ink, grid editorial, manifesto curto + links discretos
- **`button.tsx`** (shadcn) → adicionar variantes `editorial` (branco→azul) e `editorial-blue` (azul→branco)

---

## 3. Home (`src/pages/Index.tsx`)

Reescrever a Home espelhando a sequência da landing, mas alimentada pelo Supabase (hooks já existentes):

1. **Hero** (`HeroEditorial.tsx` — substitui `HeroMasterclass`)
   - tag azul "TEMPORADA 01 — O RETORNO DA ESTRATÉGIA"
   - título serif gigante com word-reveal e itálico cream na última palavra
   - descrição curta + form de captura (e-mail) que grava em `leads` (newsletter)
   - orb azul pulsante + grid sutil + scroll indicator
2. **Marquee** com tags dos cursos (`useCourses`)
3. **Manifesto Comunidade** (fundo azul, dois orbs, headline serif balanceada) — usa copy de `site_settings.value_prop_*` ou fallback editorial
4. **Instrutores em destaque** (`useFeaturedInstructors`) — carrossel horizontal estilo landing, fotos B&W com hover colorido
5. **Masterclasses** — grid editorial dos cursos recentes; card serif com número (01, 02…), título grande, instrutor e preço discreto
6. **Temporada / SeasonHighlight** reformatado em duas colunas com tipografia editorial
7. **Subscription** (se `show_subscription`) — card minimal azul/ink
8. **Lead capture final** — manifesto + form
9. **Testimonials** (se `show_testimonials`) — card serif com aspas grandes

Manter o redirect `active_version === "landing"` já existente.

---

## 4. Demais páginas públicas

Aplicar os mesmos tokens, componentes e estrutura editorial:

- **`CoursesPage.tsx`** — header editorial + filtros minimal (chips com borda fina) + grid de cards no padrão novo
- **`CourseDetailPage.tsx`** — hero serif com título, instrutor, número da masterclass; seções com `SectionLabel` + `SweepDivider`; CTA azul
- **`InstructorsPage.tsx`** / **`InstructorDetailPage.tsx`** — grid editorial B&W, página de detalhe com hero serif e bio em colunas
- **`AboutPage.tsx`** — manifesto editorial; founders em layout assimétrico
- **`SubscriptionPage.tsx`** — pricing card único, fundo azul/ink alternado
- **`SeasonPage.tsx`** / **`StrategyReturnPage.tsx`** — já editoriais, ajustar tokens/fontes
- **`BecomePartnerPage.tsx`** — form com `EditorialInput` + manifesto à esquerda
- **`LoginPage.tsx`** — split editorial: manifesto à esquerda, form minimal à direita
- **`NotFound.tsx`** — número grande serif + frase editorial

---

## 5. Cards e listas

- **`course-card.tsx`** → variante editorial: borda fina, número no topo, título serif grande, hover com sweep azul
- **`abstract-course-thumbnail.tsx`** → manter SVGs, mas paleta azul/ink/cream
- Carrossel de instrutores (`FeaturedInstructors.tsx`) → fotos em escala de cinza, nome serif por baixo, hover descobre cor

---

## 6. Animações e interação

- `RevealOnScroll` global usando `IntersectionObserver` (1 hook reutilizável `useReveal`)
- Word/line reveals nas headlines via CSS keyframes (sem libs novas)
- Cursor custom só em desktop (`matchMedia('(hover:hover)')`); preserva `cursor:pointer` em inputs/admin
- Marquee em CSS puro com `prefers-reduced-motion` desativando

---

## 7. Escopo NÃO incluído

- `/admin/*` continua com o tema atual (coral) — `AdminLayout` aplica a classe `.admin-theme` que sobrescreve tokens
- Nenhuma alteração em schema, hooks de dados, RLS, edge functions ou rotas
- Copy permanece o que já foi aplicado (tom Plots) — só a apresentação muda
- `landing.html` em si não é alterado

---

## Detalhes técnicos

```text
src/
  index.css                        ← tokens novos (ink, blue, cream, sweep utils)
  tailwind.config.ts               ← font-display, cor blue/ink/cream, keyframes
  components/
    landing/
      CustomCursor.tsx
      EditorialHeading.tsx
      SectionLabel.tsx
      SweepDivider.tsx
      Marquee.tsx
      RevealOnScroll.tsx
      EditorialButton.tsx
      EditorialInput.tsx
    home/
      HeroEditorial.tsx            ← novo (substitui HeroMasterclass)
      ManifestoBlue.tsx            ← novo
      InstructorsCarousel.tsx      ← refator de FeaturedInstructors
      MasterclassesEditorial.tsx   ← refator de NewCourses
    layout/
      Header.tsx                   ← refator
      Footer.tsx                   ← refator
    admin/AdminLayout.tsx          ← envolve com div.admin-theme (mantém tema atual)
  hooks/useReveal.ts               ← IntersectionObserver helper
  pages/                           ← Index + todas públicas refatoradas
```

Performance: fontes via `&display=swap`; orbs com `will-change:transform`; respeitar `prefers-reduced-motion`.

Acessibilidade: contrastes AA mantidos (branco sobre ink, branco sobre azul); cursor custom não substitui foco visível; word-reveals não bloqueiam leitores de tela (texto fica no DOM completo).

Entrega em duas ondas dentro deste mesmo loop:
1. Tokens + componentes globais + Header/Footer + Home
2. Páginas internas (Cursos, Curso, Instrutores, Sobre, Assinatura, Become Partner, Login, NotFound)
