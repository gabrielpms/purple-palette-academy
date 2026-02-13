import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  short_description?: string;
  thumbnail_url?: string;
  price: number;
  original_price?: number;
  duration_hours?: number;
  level?: string;
  instructor_name: string;
  instructor_avatar?: string;
  instructor_bio?: string;
  category_id?: string;
  partner_id?: string;
  hotmart_url: string;
  rating?: number;
  reviews_count?: number;
  students_count?: number;
  is_featured?: boolean;
  is_new?: boolean;
  is_season_highlight?: boolean;
  tags?: string[];
  learning_topics?: string[];
  season_connection_text?: string;
  season_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Partner {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  bio: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  video_url: string | null;
  is_active: boolean;
}


export function useCourses(filters?: {
  categorySlug?: string;
  featured?: boolean;
  isNew?: boolean;
  seasonHighlight?: boolean;
}) {
  return useQuery({
    queryKey: ["courses", filters],
    queryFn: async () => {
      let query = supabase.from("courses").select(`
        *,
        categories(id, name, slug)
      `);

      if (filters?.categorySlug) {
        const { data: category } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", filters.categorySlug)
          .single();
        
        if (category) {
          query = query.eq("category_id", category.id);
        }
      }

      if (filters?.featured) {
        query = query.eq("is_featured", true);
      }

      if (filters?.isNew) {
        query = query.eq("is_new", true);
      }

      if (filters?.seasonHighlight) {
        query = query.eq("is_season_highlight", true);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) throw error;
      return data as Course[];
    },
  });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          categories(id, name, slug),
          partners(id, name, slug, logo_url, website_url, description, bio, linkedin_url, twitter_url, instagram_url, video_url, is_active),
          seasons(id, title, slug, concept, subtitle)
        `)
        .eq("slug", slug)
        .single();

      if (error) throw error;
      return data as Course & { categories: Category; partners: Partner; seasons: { id: string; title: string; slug: string; concept: string; subtitle: string | null } | null };
    },
    enabled: !!slug,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) throw error;
      return data as Category[];
    },
  });
}

export function usePartners() {
  return useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      return data as Partner[];
    },
  });
}

