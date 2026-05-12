## Plano: Alternar entre Landing Page e Site no Admin

Adicionar uma opção no admin para escolher qual versão é exibida na rota raiz (`/`) do projeto: a **landing page** estática (`public/landing.html`) ou o **site completo** (React, `Index.tsx`).

### O que muda para o usuário

- Em `/admin/configuracoes`, novo bloco **"Versão Ativa do Site"** com duas opções:
  - **Site completo** (padrão) — comportamento atual.
  - **Landing page** — quem acessar a URL raiz é redirecionado para `landing.html`.
- A escolha vale para todos os visitantes (preview e URL publicada), em tempo real, sem deploy.

### Como funciona tecnicamente

1. **Banco** — adicionar coluna `active_version text default 'site'` em `site_settings` (valores aceitos: `'site'` | `'landing'`).
2. **Hook `useSiteSettings`** — incluir `active_version` no tipo `SiteSettings`.
3. **Roteamento da raiz** — em `src/pages/Index.tsx` (ou um wrapper antes de renderizar), ao montar:
   - Buscar `active_version`.
   - Se `'landing'`: `window.location.replace('/landing.html')`.
   - Se `'site'`: renderizar normalmente.
   - Mostrar um skeleton/tela neutra enquanto a settings carrega para evitar flash do site quando o modo for landing.
4. **Admin** — em `src/pages/admin/AdminSettingsPage.tsx`, adicionar um card com `RadioGroup` (Site / Landing page) que salva via `useUpdateSiteSettings`.
5. **Landing page** — `public/landing.html` continua servido como arquivo estático pelo Vite/host. Sem mudanças no arquivo.

### Pontos de atenção

- A landing.html é estática: não é editável pelo admin nesta etapa (só a chave de qual versão exibir). Posso adicionar edição depois se quiser.
- Outras rotas (`/cursos`, `/admin`, etc.) **continuam funcionando** mesmo no modo landing — o redirecionamento só acontece em `/`. Isso garante que você sempre consiga acessar `/admin` para voltar.
- Como o redirect acontece no client após carregar o JS, há um pequeno atraso (~200–500ms). É o trade-off de manter tudo dinâmico sem edge function.

Quer que eu siga com este plano?