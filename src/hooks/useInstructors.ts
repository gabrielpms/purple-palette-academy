import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Instructor {
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
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useInstructors() {
  return useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true)
        .order("name");

      if (error) throw error;
      return data as Instructor[];
    },
  });
}

export function useInstructor(slug: string) {
  return useQuery({
    queryKey: ["instructor", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (error) throw error;
      return data as Instructor | null;
    },
    enabled: !!slug,
  });
}

export function useInstructorCourses(instructorId: string) {
  return useQuery({
    queryKey: ["instructor-courses", instructorId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`
          *,
          categories(id, name, slug)
        `)
        .eq("partner_id", instructorId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!instructorId,
  });
}
