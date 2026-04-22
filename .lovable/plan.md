

## Plano: Aplicar o Tom & Voz Plots no site

Vou reescrever os textos públicos do site para refletir os 5 pilares da Plots — **Impactante, Provocadora, Minimalista, Inclusiva e Acessível** — usando o glossário recomendado (comunidade, temporada, coautoria, jornada, parceiro) e eliminando termos proibidos ("o melhor", "exclusivo", "imperdível", "fórmula", "milagre"). Também substituo "instrutor" por "parceiro" e "curso/plataforma" por "masterclass/temporada/comunidade" onde apropriado.

### Princípios aplicados
- Segunda pessoa ("você"), voz ativa, frases curtas.
- Trocar afirmações genéricas por perguntas instigantes nos blocos de abertura.
- Remover hype ("os melhores do Brasil", "milhares de profissionais", "5.000+ alunos formados") por linguagem com propósito.
- Trocar "instrutor" → "parceiro" / "quem ensina"; "curso" → "masterclass"; "plataforma" → "comunidade/Plots"; "trilha" → "jornada".

### Arquivos e mudanças de copy

**1. `src/components/home/HeroMasterclass.tsx`** (defaults)
- Título default: `"APRENDA COM QUEM FAZ O MERCADO."` → `"DESIGN COMEÇA POR UMA PERGUNTA."`
- Descrição default: trocar para algo como: `"Masterclasses e temporadas para quem quer pensar o design com profundidade — e transformar essa reflexão em prática."`
- CTA secundário "Conhecer a Plataforma" → `"Conhecer a Plots"`
- Stats default: remover hype ("5.000+ alunos formados") → `"200+ aulas"`, `"15+ masterclasses"`, `"1 comunidade ativa"`.

**2. `src/components/home/ValuePropositionMinimal.tsx`** (defaults)
- Título: `"O que está incluso"` → `"Como você aprende na Plots"`
- Subtítulo: `"Um caminho desenhado para quem quer pensar e praticar design com propósito."`
- Cards (defaults):
  - "Masterclasses Completas" → "Masterclasses" / "Aulas profundas com quem vive o que ensina."
  - "Nano Aulas" → "Nano aulas" / "Conteúdos curtos para aprender no seu ritmo."
  - "Mentorias ao Vivo" → "Encontros ao vivo" / "Conversas mensais com parceiros da comunidade."
  - "Projetos Práticos" → "Prática real" / "Cases para você aplicar e construir repertório."

**3. `src/components/home/SeasonHighlight.tsx`**
- Manter título "O Retorno da Estratégia".
- Descrição: reduzir e reforçar provocação — `"Onde estratégia encontra design, escolhas ganham significado. Esta temporada propõe uma releitura: estratégia não como abstração, mas como motor de transformação."`
- CTA: `"Conhecer a temporada completa"` → `"Entrar na temporada"`.

**4. `src/components/home/FeaturedInstructors.tsx`**
- Título: `"Aprenda com quem faz o mercado"` → `"Quem ensina, também aprende"`
- Subtítulo: `"Parceiros que dividem prática real e abrem espaço para novas perguntas."`
- "Ver perfil" → "Ver parceiro".

**5. `src/components/home/NewCourses.tsx`**
- Badge "Novidades" mantido.
- Título: `"Recém Lançados"` → `"Novas masterclasses"`
- Subtítulo: `"Conteúdos recentes para começar uma nova jornada."`
- "Explorar mais" → "Ver todas".

**6. `src/components/home/SubscriptionSection.tsx`** (defaults)
- Título default: `"Aprenda continuamente. Evolua constantemente."` → `"Aprender é um processo. A Plots caminha com você."`
- Descrição default: `"Com a assinatura você acessa nano aulas e encontros ao vivo com parceiros da comunidade. Um espaço para evoluir no seu ritmo."`
- Benefícios fixos: trocar "Comunidade exclusiva de designers" → "Comunidade de designers em diálogo"; "Certificados de participação" → "Certificados de jornada".
- "Prefere comprar uma masterclass individual?" → "Prefere uma masterclass específica?"

**7. `src/components/home/LeadCapture.tsx`**
- Badge "Newsletter Exclusiva" → "Newsletter Plots" (remove "exclusiva" — termo proibido).
- Título: `"Fique por dentro das novidades"` → `"Cada temporada começa com uma pergunta."`
- Descrição: `"Receba reflexões, novas masterclasses e convites para encontros da comunidade."`
- Sucesso: `"Em breve você receberá nossas novidades..."` → `"Em breve você recebe nossas próximas reflexões e convites."`

**8. `src/components/home/CTASection.tsx`**
- Badge "Comece sua jornada hoje" → "Sua jornada começa aqui"
- Título: `"Pronto para transformar sua carreira em design?"` → `"E se design for, antes de tudo, uma forma de pensar?"`
- Descrição: `"Entre na comunidade Plots e construa sua jornada com parceiros que praticam o que ensinam."` (remove "milhares de profissionais" e "melhores instrutores").
- "Conhecer a Escola" → "Conhecer a Plots".

**9. `src/components/layout/Header.tsx`**
- Item "Instrutores" → "Parceiros".
- Botão "Começar" → "Entrar na Plots".

**10. `src/components/layout/Footer.tsx`**
- Bio: `"Aprenda design estratégico com os melhores profissionais do Brasil."` → `"Uma comunidade de design para pensar com profundidade e praticar com propósito."` (remove "os melhores").
- Link "Sobre" mantido; "Parceiros" mantido.

**11. `src/pages/AboutPage.tsx`** (defaults)
- Hero título: `"Sobre a DesignSchool"` → `"Sobre a Plots"`.
- Hero descrição: `"A Plots é uma comunidade de design e produto para quem quer pensar de forma crítica, sistêmica e estratégica — e construir significado junto."`
- Story title mantido. Parágrafos: substituir "DesignSchool" → "Plots"; remover "5.000 profissionais formados" → linguagem de comunidade/coautoria.
- Values default: títulos como "Foco em Resultado" → manter, mas refazer descrições sem hype ("certificados", "melhor"). Ex.: "Acessibilidade" → "Educação que cabe em jornadas diferentes."
- Numbers: trocar "Avaliação média" e demais por métricas de comunidade ("temporadas no ar", "parceiros", "aulas publicadas") sem inflar.

**12. `src/pages/BecomePartnerPage.tsx`**
- Hero título: `"Seja um Parceiro"` (manter).
- Hero descrição: `"Plots é um espaço para quem quer ensinar o que vive — e aprender enquanto compartilha."` (citação direta do manual).
- Benefits: reescrever descrições sem hype ("milhares").
- Form heading "Entre em Contato" → "Vamos conversar".
- Sucesso: `"Obrigado pelo interesse! Entraremos em contato em breve."` → `"Recebemos sua mensagem. Em breve continuamos a conversa."`
- Mensagem placeholder: `"Conte um pouco sobre como gostaria de colaborar..."` → `"O que você gostaria de ensinar — e por quê?"`

### Notas técnicas
- Todas as alterações são apenas de copy (strings em componentes React). Sem migrações de banco.
- Os campos editáveis no admin (`site_settings.hero_title`, `subscription_title`, `about_*`, etc.) já gravados no banco **não serão sobrescritos**: só atualizo os valores `default` no código (fallback). Se o admin quiser, atualiza pela tela `/admin/configuracoes` usando o mesmo tom.
- Não há mudança de comportamento, rotas ou estado.

