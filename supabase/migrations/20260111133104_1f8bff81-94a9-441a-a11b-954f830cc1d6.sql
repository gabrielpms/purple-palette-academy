-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partners table
CREATE TABLE public.partners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  thumbnail_url TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  original_price DECIMAL(10,2),
  duration_hours INTEGER,
  level TEXT CHECK (level IN ('iniciante', 'intermediario', 'avancado')),
  instructor_name TEXT NOT NULL,
  instructor_avatar TEXT,
  instructor_bio TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
  hotmart_url TEXT NOT NULL,
  rating DECIMAL(2,1) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  students_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_new BOOLEAN DEFAULT false,
  is_season_highlight BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table for social proof
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create partner_requests table for partner registration
CREATE TABLE public.partner_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  website TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_requests ENABLE ROW LEVEL SECURITY;

-- Public read policies (everyone can view published content)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Active partners are viewable by everyone" ON public.partners FOR SELECT USING (is_active = true);
CREATE POLICY "Courses are viewable by everyone" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Featured testimonials are viewable by everyone" ON public.testimonials FOR SELECT USING (true);

-- Partner request insert policy (anyone can submit)
CREATE POLICY "Anyone can submit partner request" ON public.partner_requests FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_courses_category ON public.courses(category_id);
CREATE INDEX idx_courses_partner ON public.courses(partner_id);
CREATE INDEX idx_courses_featured ON public.courses(is_featured);
CREATE INDEX idx_courses_new ON public.courses(is_new);
CREATE INDEX idx_courses_slug ON public.courses(slug);
CREATE INDEX idx_categories_slug ON public.categories(slug);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON public.partners FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Design de Produto', 'design-de-produto', 'Aprenda a criar produtos digitais incríveis', 'Layers'),
  ('UX/UI Design', 'ux-ui-design', 'Domine a experiência do usuário', 'Palette'),
  ('Estratégia de Negócios', 'estrategia-negocios', 'Pensamento estratégico para designers', 'Target'),
  ('Design System', 'design-system', 'Construa sistemas de design escaláveis', 'Component'),
  ('Liderança em Design', 'lideranca-design', 'Desenvolva sua carreira como líder', 'Users');

-- Insert sample partners
INSERT INTO public.partners (name, logo_url, website_url, description) VALUES
  ('Studio Design Co.', 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200', 'https://example.com', 'Agência líder em design de produto'),
  ('Product School Brasil', 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200', 'https://example.com', 'Escola de produto referência no mercado'),
  ('DesignOps Academy', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200', 'https://example.com', 'Formação em operações de design');

-- Insert sample testimonials
INSERT INTO public.testimonials (name, role, company, content, rating, is_featured) VALUES
  ('Marina Santos', 'Head of Design', 'Nubank', 'Os cursos transformaram minha forma de pensar design estratégico. Conteúdo de altíssimo nível!', 5, true),
  ('Rafael Costa', 'Product Designer', 'iFood', 'Finalmente uma plataforma brasileira que entende as necessidades do mercado local.', 5, true),
  ('Carla Mendes', 'Design Lead', 'Itaú', 'A melhor decisão que tomei para minha carreira. Os instrutores são referência no mercado.', 5, true),
  ('Lucas Ferreira', 'UX Researcher', 'Magazine Luiza', 'Conteúdo prático e aplicável desde a primeira aula. Recomendo demais!', 5, true);

-- Insert sample courses
INSERT INTO public.courses (title, slug, description, short_description, thumbnail_url, price, original_price, duration_hours, level, instructor_name, instructor_avatar, category_id, hotmart_url, rating, reviews_count, students_count, is_featured, is_new, is_season_highlight, tags) VALUES
  ('Design de Produto: Do Conceito à Execução', 'design-produto-conceito-execucao', 'Aprenda todo o processo de criação de produtos digitais, desde a descoberta até o lançamento. Um curso completo para quem quer dominar o design de produto.', 'Domine o processo completo de design de produto digital', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800', 497.00, 697.00, 40, 'intermediario', 'Ana Silva', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200', (SELECT id FROM public.categories WHERE slug = 'design-de-produto'), 'https://hotmart.com/exemplo', 4.9, 234, 1850, true, false, true, ARRAY['produto', 'estratégia', 'discovery']),
  ('UX Research: Métodos e Práticas', 'ux-research-metodos-praticas', 'Descubra como conduzir pesquisas de usuário que geram insights acionáveis para seu produto.', 'Aprenda a fazer pesquisas que transformam produtos', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800', 397.00, NULL, 25, 'iniciante', 'Pedro Oliveira', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200', (SELECT id FROM public.categories WHERE slug = 'ux-ui-design'), 'https://hotmart.com/exemplo', 4.8, 189, 1420, true, true, false, ARRAY['pesquisa', 'UX', 'entrevistas']),
  ('Estratégia de Produto para Designers', 'estrategia-produto-designers', 'Entenda como alinhar design e estratégia de negócios para criar produtos de sucesso.', 'Pense como um estrategista, execute como designer', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', 597.00, 797.00, 35, 'avancado', 'Juliana Martins', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200', (SELECT id FROM public.categories WHERE slug = 'estrategia-negocios'), 'https://hotmart.com/exemplo', 4.9, 156, 980, true, true, false, ARRAY['estratégia', 'negócios', 'métricas']),
  ('Design System na Prática', 'design-system-pratica', 'Construa um design system do zero e aprenda a mantê-lo em grandes organizações.', 'Crie sistemas de design escaláveis e consistentes', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', 447.00, NULL, 30, 'intermediario', 'Carlos Souza', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200', (SELECT id FROM public.categories WHERE slug = 'design-system'), 'https://hotmart.com/exemplo', 4.7, 98, 720, false, true, false, ARRAY['design system', 'componentes', 'tokens']),
  ('Liderança em Design', 'lideranca-design', 'Desenvolva habilidades de gestão e liderança para times de design de alta performance.', 'Torne-se um líder de design inspirador', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', 697.00, 897.00, 45, 'avancado', 'Fernanda Lima', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200', (SELECT id FROM public.categories WHERE slug = 'lideranca-design'), 'https://hotmart.com/exemplo', 4.9, 87, 540, false, false, false, ARRAY['liderança', 'gestão', 'carreira']),
  ('UI Design Avançado', 'ui-design-avancado', 'Eleve suas habilidades de UI com técnicas avançadas de composição visual e animação.', 'Crie interfaces que encantam e convertem', 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800', 347.00, NULL, 20, 'avancado', 'Bruno Nascimento', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', (SELECT id FROM public.categories WHERE slug = 'ux-ui-design'), 'https://hotmart.com/exemplo', 4.6, 145, 890, false, false, false, ARRAY['UI', 'visual', 'animação']);