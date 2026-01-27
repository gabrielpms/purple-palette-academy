import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Founder {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string | null;
  linkedin_url: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export function useFounders() {
  return useQuery({
    queryKey: ["founders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("founders")
        .select("*")
        .order("order_index", { ascending: true });

      if (error) throw error;
      return data as Founder[];
    },
  });
}

export function useCreateFounder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (founder: Omit<Founder, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("founders")
        .insert(founder)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["founders"] });
    },
  });
}

export function useUpdateFounder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...founder }: Partial<Founder> & { id: string }) => {
      const { data, error } = await supabase
        .from("founders")
        .update(founder)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["founders"] });
    },
  });
}

export function useDeleteFounder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("founders").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["founders"] });
    },
  });
}
