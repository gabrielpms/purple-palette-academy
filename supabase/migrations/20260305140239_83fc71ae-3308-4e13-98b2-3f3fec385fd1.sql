
ALTER TABLE public.site_settings
  ADD COLUMN about_hero_title text DEFAULT 'Sobre a DesignSchool',
  ADD COLUMN about_hero_description text DEFAULT 'Somos a plataforma brasileira de educação em design e produto estratégico. Nossa missão é formar a próxima geração de designers que pensam como estrategistas e executam com excelência.',
  ADD COLUMN about_story_title text DEFAULT 'Nossa História',
  ADD COLUMN about_story_paragraphs jsonb DEFAULT '["A DesignSchool nasceu da frustração de profissionais que não encontravam conteúdo de qualidade sobre design estratégico em português. Enquanto o mercado internacional avançava, o Brasil ficava para trás.","Reunimos os melhores profissionais do mercado brasileiro — designers que lideram times em empresas como Nubank, iFood, Itaú e Magazine Luiza — para criar cursos que realmente fazem diferença.","Hoje, já formamos mais de 5.000 profissionais e somos referência em educação de design no Brasil. Mas estamos apenas começando."]'::jsonb,
  ADD COLUMN about_story_image_url text DEFAULT 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
  ADD COLUMN about_values_title text DEFAULT 'Nossos Valores',
  ADD COLUMN about_values_subtitle text DEFAULT 'Os princípios que guiam tudo o que fazemos.',
  ADD COLUMN about_values jsonb DEFAULT '[{"icon":"Target","title":"Foco em Resultado","description":"Nossos cursos são desenhados para gerar impacto real na sua carreira, não apenas certificados."},{"icon":"Heart","title":"Comunidade Forte","description":"Fazemos parte de uma comunidade vibrante de designers que se apoiam e crescem juntos."},{"icon":"Lightbulb","title":"Inovação Constante","description":"Estamos sempre atualizando nosso conteúdo com as práticas mais recentes do mercado."},{"icon":"Users","title":"Acessibilidade","description":"Acreditamos que educação de qualidade deve ser acessível a todos os profissionais."}]'::jsonb,
  ADD COLUMN about_numbers jsonb DEFAULT '[{"value":"15+","label":"Cursos disponíveis"},{"value":"5.000+","label":"Alunos formados"},{"value":"4.9","label":"Avaliação média"},{"value":"20+","label":"Instrutores experts"}]'::jsonb;
