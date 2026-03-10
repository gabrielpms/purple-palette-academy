
-- Add is_featured column to partners
ALTER TABLE public.partners ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Add RLS policies for partner_requests so admins can view and manage them
CREATE POLICY "Admins can view partner requests" ON public.partner_requests FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update partner requests" ON public.partner_requests FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete partner requests" ON public.partner_requests FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
