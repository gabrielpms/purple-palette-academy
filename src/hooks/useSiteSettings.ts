import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface SiteSettings {
  id: string;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  show_testimonials: boolean;
  show_subscription: boolean;
  subscription_title: string | null;
  subscription_description: string | null;
  subscription_price: number | null;
  subscription_original_price: number | null;
  subscription_annual_price: number | null;
  subscription_discount_text: string | null;
  subscription_cta_text: string | null;
  subscription_cta_url: string | null;
  subscription_note: string | null;
  subscription_features: { title: string; description: string }[] | null;
  hero_title: string | null;
  hero_description: string | null;
  hero_cta_primary_text: string | null;
  hero_cta_primary_url: string | null;
  hero_cta_secondary_text: string | null;
  hero_cta_secondary_url: string | null;
  hero_stats: { value: string; label: string }[] | null;
  hero_background_images: string[] | null;
  value_prop_title: string | null;
  value_prop_subtitle: string | null;
  value_prop_features: { icon: string; title: string; description: string }[] | null;
  about_hero_title: string | null;
  about_hero_description: string | null;
  about_story_title: string | null;
  about_story_paragraphs: string[] | null;
  about_story_image_url: string | null;
  about_values_title: string | null;
  about_values_subtitle: string | null;
  about_values: { icon: string; title: string; description: string }[] | null;
  about_numbers: { value: string; label: string }[] | null;
  active_version: string;
  created_at: string;
  updated_at: string;
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) throw error;
      return data as unknown as SiteSettings;
    },
  });
}

export function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      const { data, error } = await supabase
        .from("site_settings")
        .update(settings)
        .eq("id", "00000000-0000-0000-0000-000000000001")
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-settings"] });
      toast({
        title: "Configurações salvas",
        description: "As configurações do site foram atualizadas com sucesso.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
