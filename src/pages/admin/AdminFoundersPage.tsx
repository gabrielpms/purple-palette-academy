import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  useFounders,
  useCreateFounder,
  useUpdateFounder,
  useDeleteFounder,
  Founder,
} from "@/hooks/useFounders";

interface FounderFormData {
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  linkedin_url: string;
  order_index: number;
  is_active: boolean;
}

const initialFormData: FounderFormData = {
  name: "",
  role: "",
  bio: "",
  photo_url: "",
  linkedin_url: "",
  order_index: 0,
  is_active: true,
};

export default function AdminFoundersPage() {
  const { data: founders, isLoading } = useFounders();
  const createFounder = useCreateFounder();
  const updateFounder = useUpdateFounder();
  const deleteFounder = useDeleteFounder();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFounder, setEditingFounder] = useState<Founder | null>(null);
  const [deletingFounder, setDeletingFounder] = useState<Founder | null>(null);
  const [formData, setFormData] = useState<FounderFormData>(initialFormData);

  const handleOpenCreate = () => {
    setFormData(initialFormData);
    setEditingFounder(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (founder: Founder) => {
    setFormData({
      name: founder.name,
      role: founder.role,
      bio: founder.bio,
      photo_url: founder.photo_url || "",
      linkedin_url: founder.linkedin_url || "",
      order_index: founder.order_index,
      is_active: founder.is_active,
    });
    setEditingFounder(founder);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingFounder) {
        await updateFounder.mutateAsync({
          id: editingFounder.id,
          ...formData,
          photo_url: formData.photo_url || null,
          linkedin_url: formData.linkedin_url || null,
        });
        toast.success("Fundador atualizado com sucesso!");
      } else {
        await createFounder.mutateAsync({
          ...formData,
          photo_url: formData.photo_url || null,
          linkedin_url: formData.linkedin_url || null,
        });
        toast.success("Fundador criado com sucesso!");
      }
      setIsFormOpen(false);
      setEditingFounder(null);
    } catch (error) {
      toast.error("Erro ao salvar fundador");
    }
  };

  const handleDelete = async () => {
    if (!deletingFounder) return;

    try {
      await deleteFounder.mutateAsync(deletingFounder.id);
      toast.success("Fundador excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir fundador");
    }
    setDeletingFounder(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fundadores</h1>
            <p className="text-muted-foreground">
              Gerencie os fundadores exibidos na página Sobre
            </p>
          </div>
          <Button onClick={handleOpenCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Fundador
          </Button>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fundador</TableHead>
                <TableHead className="hidden md:table-cell">Cargo</TableHead>
                <TableHead className="hidden sm:table-cell">Ordem</TableHead>
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
              ) : founders?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    Nenhum fundador cadastrado
                  </TableCell>
                </TableRow>
              ) : (
                founders?.map((founder) => (
                  <TableRow key={founder.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {founder.photo_url ? (
                          <img
                            src={founder.photo_url}
                            alt={founder.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                            {founder.name.charAt(0)}
                          </div>
                        )}
                        <span className="font-medium">{founder.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {founder.role}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {founder.order_index}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={founder.is_active ? "default" : "secondary"}>
                        {founder.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(founder)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeletingFounder(founder)}
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
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingFounder ? "Editar Fundador" : "Novo Fundador"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Cargo *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Ex: Co-fundador & CEO"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Mini-bio *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Uma breve descrição sobre o fundador..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo_url">URL da Foto</Label>
              <Input
                id="photo_url"
                type="url"
                value={formData.photo_url}
                onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkedin_url">URL do LinkedIn</Label>
              <Input
                id="linkedin_url"
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order_index">Ordem de exibição</Label>
              <Input
                id="order_index"
                type="number"
                value={formData.order_index}
                onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Ativo</Label>
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={createFounder.isPending || updateFounder.isPending}
              >
                {editingFounder ? "Salvar" : "Criar"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingFounder} onOpenChange={() => setDeletingFounder(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir fundador?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deletingFounder?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
