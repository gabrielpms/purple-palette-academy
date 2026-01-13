import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Course, Category, Partner } from "@/hooks/useCourses";

const courseSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  short_description: z.string().optional(),
  thumbnail_url: z.string().url("URL inválida").optional().or(z.literal("")),
  price: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
  original_price: z.coerce.number().optional(),
  duration_hours: z.coerce.number().optional(),
  level: z.string().optional(),
  instructor_name: z.string().min(1, "Nome do instrutor é obrigatório"),
  instructor_avatar: z.string().optional(),
  instructor_bio: z.string().optional(),
  category_id: z.string().optional(),
  partner_id: z.string().optional(),
  hotmart_url: z.string().url("URL da Hotmart inválida"),
  is_featured: z.boolean().default(false),
  is_new: z.boolean().default(false),
  is_season_highlight: z.boolean().default(false),
  tags: z.string().optional(),
});

type CourseFormData = z.infer<typeof courseSchema>;

interface CourseFormProps {
  course?: Course | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CourseForm({ course, onSuccess, onCancel }: CourseFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course?.title || "",
      slug: course?.slug || "",
      description: course?.description || "",
      short_description: course?.short_description || "",
      thumbnail_url: course?.thumbnail_url || "",
      price: course?.price || 0,
      original_price: course?.original_price || undefined,
      duration_hours: course?.duration_hours || undefined,
      level: course?.level || "",
      instructor_name: course?.instructor_name || "",
      instructor_avatar: course?.instructor_avatar || "",
      instructor_bio: course?.instructor_bio || "",
      category_id: course?.category_id || "",
      partner_id: course?.partner_id || "",
      hotmart_url: course?.hotmart_url || "",
      is_featured: course?.is_featured || false,
      is_new: course?.is_new || false,
      is_season_highlight: course?.is_season_highlight || false,
      tags: course?.tags?.join(", ") || "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      const [categoriesRes, partnersRes] = await Promise.all([
        supabase.from("categories").select("*").order("name"),
        supabase.from("partners").select("*").eq("is_active", true).order("name"),
      ]);
      
      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (partnersRes.data) setPartners(partnersRes.data);
    }
    fetchData();
  }, []);

  // Auto-generate slug from title
  const title = form.watch("title");
  useEffect(() => {
    if (!course && title) {
      const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  }, [title, course, form]);

  const onSubmit = async (data: CourseFormData) => {
    setLoading(true);

    const courseData = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      instructor_name: data.instructor_name,
      hotmart_url: data.hotmart_url,
      price: data.price,
      tags: data.tags ? data.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      category_id: data.category_id || null,
      partner_id: data.partner_id || null,
      thumbnail_url: data.thumbnail_url || null,
      short_description: data.short_description || null,
      instructor_avatar: data.instructor_avatar || null,
      instructor_bio: data.instructor_bio || null,
      original_price: data.original_price || null,
      duration_hours: data.duration_hours || null,
      level: data.level || null,
      is_featured: data.is_featured,
      is_new: data.is_new,
      is_season_highlight: data.is_season_highlight,
    };

    let error;

    if (course) {
      const result = await supabase
        .from("courses")
        .update(courseData)
        .eq("id", course.id);
      error = result.error;
    } else {
      const result = await supabase.from("courses").insert([courseData]);
      error = result.error;
    }

    if (error) {
      toast.error("Erro ao salvar curso: " + error.message);
    } else {
      toast.success(course ? "Curso atualizado!" : "Curso criado!");
      onSuccess();
    }

    setLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título *</FormLabel>
                <FormControl>
                  <Input placeholder="Nome do curso" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug *</FormLabel>
                <FormControl>
                  <Input placeholder="nome-do-curso" {...field} />
                </FormControl>
                <FormDescription>URL amigável do curso</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="short_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Curta</FormLabel>
              <FormControl>
                <Input placeholder="Uma breve descrição do curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição Completa *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição detalhada do curso..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="thumbnail_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Imagem</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotmart_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL da Hotmart *</FormLabel>
                <FormControl>
                  <Input placeholder="https://hotmart.com/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$) *</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="original_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço Original (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormDescription>Para mostrar desconto</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration_hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duração (horas)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nível</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o nível" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Iniciante">Iniciante</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                    <SelectItem value="Avançado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="instructor_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Instrutor *</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instructor_avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar do Instrutor</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="instructor_bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio do Instrutor</FormLabel>
              <FormControl>
                <Textarea placeholder="Sobre o instrutor..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="partner_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parceiro</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um parceiro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {partners.map((partner) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="design, ux, produto (separados por vírgula)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-3">
          <FormField
            control={form.control}
            name="is_featured"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Destaque</FormLabel>
                  <FormDescription>Exibir na home</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_new"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Novo</FormLabel>
                  <FormDescription>Badge de novo</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_season_highlight"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Destaque Temporada</FormLabel>
                  <FormDescription>Tema principal</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Salvando..." : course ? "Atualizar Curso" : "Criar Curso"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
