
ALTER TABLE public.site_settings
  ADD COLUMN hero_title text DEFAULT 'APRENDA COM QUEM FAZ O MERCADO.',
  ADD COLUMN hero_description text DEFAULT 'Masterclasses individuais ou assinatura com nano aulas e sessões de mentoria. Aprenda design estratégico com os melhores profissionais do Brasil.',
  ADD COLUMN hero_cta_primary_text text DEFAULT 'Ver Masterclasses',
  ADD COLUMN hero_cta_primary_url text DEFAULT '/cursos',
  ADD COLUMN hero_cta_secondary_text text DEFAULT 'Conhecer a Plataforma',
  ADD COLUMN hero_cta_secondary_url text DEFAULT '/sobre',
  ADD COLUMN hero_stats jsonb DEFAULT '[{"value":"200+","label":"Aulas disponíveis"},{"value":"15+","label":"Masterclasses"},{"value":"5.000+","label":"Alunos formados"}]'::jsonb,
  ADD COLUMN hero_background_images jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN value_prop_title text DEFAULT 'O que está incluso',
  ADD COLUMN value_prop_subtitle text DEFAULT 'Tudo que você precisa para se tornar um designer estratégico.',
  ADD COLUMN value_prop_features jsonb DEFAULT '[{"icon":"BookOpen","title":"Masterclasses Completas","description":"Cursos profundos com profissionais referência no mercado brasileiro."},{"icon":"Zap","title":"Nano Aulas","description":"Conteúdos rápidos de 5-15 minutos para aprender no seu ritmo."},{"icon":"Users","title":"Mentorias ao Vivo","description":"Sessões exclusivas mensais com os melhores designers."},{"icon":"Layers","title":"Projetos Práticos","description":"Cases reais para você aplicar e adicionar ao seu portfólio."}]'::jsonb;
