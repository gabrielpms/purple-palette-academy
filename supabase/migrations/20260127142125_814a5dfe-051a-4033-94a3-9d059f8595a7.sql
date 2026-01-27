-- Create founders table
CREATE TABLE public.founders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT,
  linkedin_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.founders ENABLE ROW LEVEL SECURITY;

-- Everyone can view active founders
CREATE POLICY "Active founders are viewable by everyone"
ON public.founders FOR SELECT
USING (is_active = true);

-- Admins can manage founders
CREATE POLICY "Admins can insert founders"
ON public.founders FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update founders"
ON public.founders FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete founders"
ON public.founders FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_founders_updated_at
BEFORE UPDATE ON public.founders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();