
ALTER TABLE public.site_settings
  ADD COLUMN subscription_title TEXT DEFAULT 'Aprenda continuamente. Evolua constantemente.',
  ADD COLUMN subscription_description TEXT DEFAULT 'Nossa assinatura te dá acesso a nano aulas exclusivas e sessões de mentoria ao vivo com profissionais de mercado. Ideal para quem quer manter-se atualizado e evoluir constantemente.',
  ADD COLUMN subscription_price NUMERIC DEFAULT 79,
  ADD COLUMN subscription_original_price NUMERIC DEFAULT 149,
  ADD COLUMN subscription_annual_price NUMERIC DEFAULT 569,
  ADD COLUMN subscription_discount_text TEXT DEFAULT 'Economize 47% - Oferta de lançamento',
  ADD COLUMN subscription_cta_text TEXT DEFAULT 'Começar 7 dias grátis',
  ADD COLUMN subscription_note TEXT DEFAULT 'As masterclasses são vendidas separadamente e não estão incluídas na assinatura.';
