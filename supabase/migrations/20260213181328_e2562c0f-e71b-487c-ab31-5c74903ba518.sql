
-- Add learning topics and season connection text to courses
ALTER TABLE public.courses
ADD COLUMN learning_topics jsonb DEFAULT '[]'::jsonb,
ADD COLUMN season_connection_text text;
