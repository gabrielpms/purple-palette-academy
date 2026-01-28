-- Add new fields to partners table for instructor functionality
ALTER TABLE public.partners
ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS instagram_url TEXT;

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS idx_partners_slug ON public.partners(slug);

-- Update existing partners to have a slug based on their name (lowercase, replace spaces with hyphens)
UPDATE public.partners 
SET slug = lower(regexp_replace(name, '\s+', '-', 'g'))
WHERE slug IS NULL;