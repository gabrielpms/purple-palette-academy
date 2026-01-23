import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SeasonPillar {
  id: string;
  season_id: string;
  title: string;
  description: string;
  icon: string | null;
  order_index: number;
  created_at: string;
}

export interface Season {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  concept: string;
  is_active: boolean;
  hero_image_url: string | null;
  created_at: string;
  updated_at: string;
  pillars?: SeasonPillar[];
}

export function useSeasons() {
  return useQuery({
    queryKey: ["seasons"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seasons")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Season[];
    },
  });
}

export function useActiveSeason() {
  return useQuery({
    queryKey: ["seasons", "active"],
    queryFn: async () => {
      const { data: season, error } = await supabase
        .from("seasons")
        .select("*")
        .eq("is_active", true)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      if (!season) return null;

      const { data: pillars, error: pillarsError } = await supabase
        .from("season_pillars")
        .select("*")
        .eq("season_id", season.id)
        .order("order_index", { ascending: true });

      if (pillarsError) throw pillarsError;

      return { ...season, pillars } as Season;
    },
  });
}

export function useSeason(slug: string) {
  return useQuery({
    queryKey: ["seasons", slug],
    queryFn: async () => {
      const { data: season, error } = await supabase
        .from("seasons")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;

      const { data: pillars, error: pillarsError } = await supabase
        .from("season_pillars")
        .select("*")
        .eq("season_id", season.id)
        .order("order_index", { ascending: true });

      if (pillarsError) throw pillarsError;

      return { ...season, pillars } as Season;
    },
    enabled: !!slug,
  });
}

export function useSeasonById(id: string) {
  return useQuery({
    queryKey: ["seasons", "id", id],
    queryFn: async () => {
      const { data: season, error } = await supabase
        .from("seasons")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      const { data: pillars, error: pillarsError } = await supabase
        .from("season_pillars")
        .select("*")
        .eq("season_id", season.id)
        .order("order_index", { ascending: true });

      if (pillarsError) throw pillarsError;

      return { ...season, pillars } as Season;
    },
    enabled: !!id,
  });
}

export function useSeasonCourses(seasonId: string | undefined) {
  return useQuery({
    queryKey: ["courses", "season", seasonId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*, category:categories(*), partner:partners(*)")
        .eq("season_id", seasonId!)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!seasonId,
  });
}

export function useCreateSeason() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (season: Omit<Season, "id" | "created_at" | "updated_at" | "pillars">) => {
      const { data, error } = await supabase
        .from("seasons")
        .insert(season)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });
}

export function useUpdateSeason() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...season }: Partial<Season> & { id: string }) => {
      const { data, error } = await supabase
        .from("seasons")
        .update(season)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });
}

export function useDeleteSeason() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("seasons").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });
}

export function useCreatePillar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (pillar: Omit<SeasonPillar, "id" | "created_at">) => {
      const { data, error } = await supabase
        .from("season_pillars")
        .insert(pillar)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });
}

export function useUpdatePillar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...pillar }: Partial<SeasonPillar> & { id: string }) => {
      const { data, error } = await supabase
        .from("season_pillars")
        .update(pillar)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });
}

export function useDeletePillar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("season_pillars").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });
}
