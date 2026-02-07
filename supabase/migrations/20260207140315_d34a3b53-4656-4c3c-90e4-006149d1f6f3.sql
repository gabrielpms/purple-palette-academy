-- Create site_settings table for logo, colors and toggles
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text,
  primary_color text DEFAULT '#f97316',
  secondary_color text DEFAULT '#262626',
  show_testimonials boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Everyone can read settings
CREATE POLICY "Site settings are viewable by everyone"
ON public.site_settings FOR SELECT
USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can update site settings"
ON public.site_settings FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can insert settings
CREATE POLICY "Admins can insert site settings"
ON public.site_settings FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Insert default settings row
INSERT INTO public.site_settings (id, logo_url, primary_color, secondary_color, show_testimonials)
VALUES ('00000000-0000-0000-0000-000000000001', null, '#f97316', '#262626', true);

-- Create leads table
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone can insert leads
CREATE POLICY "Anyone can submit leads"
ON public.leads FOR INSERT
WITH CHECK (true);

-- Only admins can view leads
CREATE POLICY "Admins can view leads"
ON public.leads FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add admin policies for testimonials
CREATE POLICY "Admins can insert testimonials"
ON public.testimonials FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update testimonials"
ON public.testimonials FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete testimonials"
ON public.testimonials FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at on site_settings
CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();