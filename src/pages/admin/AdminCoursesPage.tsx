import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { CourseForm } from "@/components/admin/CourseForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { toast } from "sonner";
import { Course } from "@/hooks/useCourses";

export default function AdminCoursesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);

  const { data: courses, isLoading } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select(`*, categories(name)`)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as unknown as (Course & { categories: { name: string } | null })[];
    },
  });

  const filteredCourses = courses?.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deletingCourse) return;

    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", deletingCourse.id);

    if (error) {
      toast.error("Erro ao excluir curso: " + error.message);
    } else {
      toast.success("Curso excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    }

    setDeletingCourse(null);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingCourse(null);
    queryClient.invalidateQueries({ queryKey: ["admin-courses"] });
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Cursos</h1>
            <p className="text-muted-foreground">
              Gerencie os cursos da plataforma
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Curso
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Curso</TableHead>
                <TableHead className="hidden md:table-cell">Categoria</TableHead>
                <TableHead className="hidden sm:table-cell">Preço</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : filteredCourses?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Nenhum curso encontrado
                  </TableCell>
                </TableRow>
              ) : (
                filteredCourses?.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {course.thumbnail_url && (
                          <img
                            src={course.thumbnail_url}
                            alt={course.title}
                            className="w-12 h-12 rounded object-cover hidden sm:block"
                          />
                        )}
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {course.instructor_name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {course.categories?.name || "-"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      R$ {course.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {course.is_featured && (
                          <Badge variant="secondary">Destaque</Badge>
                        )}
                        {course.is_new && (
                          <Badge className="bg-green-500">Novo</Badge>
                        )}
                        {course.is_season_highlight && (
                          <Badge variant="outline">Temporada</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingCourse(course);
                            setIsFormOpen(true);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeletingCourse(course)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => {
        setIsFormOpen(open);
        if (!open) setEditingCourse(null);
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? "Editar Curso" : "Novo Curso"}
            </DialogTitle>
          </DialogHeader>
          <CourseForm
            course={editingCourse}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingCourse(null);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingCourse} onOpenChange={() => setDeletingCourse(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir curso?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o curso "{deletingCourse?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
