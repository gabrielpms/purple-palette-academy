
ALTER TABLE public.site_settings
  ADD COLUMN subscription_cta_url TEXT DEFAULT '/assinatura',
  ADD COLUMN subscription_features JSONB DEFAULT '[{"title":"Nano Aulas","description":"Conteúdos rápidos de 5-15 min para aprender no seu ritmo"},{"title":"Sessões de Mentoria","description":"Encontros ao vivo mensais com instrutores"},{"title":"Novos conteúdos toda semana","description":"Atualizações constantes com tendências do mercado"}]';
