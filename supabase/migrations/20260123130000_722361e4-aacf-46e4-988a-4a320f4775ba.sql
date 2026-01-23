-- Create seasons table for managing landing pages
CREATE TABLE public.seasons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  subtitle text,
  concept text NOT NULL,
  is_active boolean DEFAULT false,
  hero_image_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create season_pillars table for the pillars/themes of each season
CREATE TABLE public.season_pillars (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  season_id uuid REFERENCES public.seasons(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text,
  order_index integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.seasons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.season_pillars ENABLE ROW LEVEL SECURITY;

-- Public read access for seasons
CREATE POLICY "Seasons are viewable by everyone"
ON public.seasons FOR SELECT
USING (true);

CREATE POLICY "Admins can insert seasons"
ON public.seasons FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update seasons"
ON public.seasons FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete seasons"
ON public.seasons FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public read access for pillars
CREATE POLICY "Season pillars are viewable by everyone"
ON public.season_pillars FOR SELECT
USING (true);

CREATE POLICY "Admins can insert season pillars"
ON public.season_pillars FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update season pillars"
ON public.season_pillars FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete season pillars"
ON public.season_pillars FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add season_id to courses table to link courses to seasons
ALTER TABLE public.courses ADD COLUMN season_id uuid REFERENCES public.seasons(id) ON DELETE SET NULL;

-- Create trigger for updated_at
CREATE TRIGGER update_seasons_updated_at
BEFORE UPDATE ON public.seasons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();