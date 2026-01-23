import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useSeasonById,
  useCreatePillar,
  useUpdatePillar,
  useDeletePillar,
  SeasonPillar,
} from "@/hooks/useSeasons";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ICON_OPTIONS = [
  { value: "Target", label: "Alvo" },
  { value: "TrendingUp", label: "Crescimento" },
  { value: "Users", label: "Pessoas" },
  { value: "Lightbulb", label: "Ideia" },
  { value: "Sparkles", label: "Destaque" },
  { value: "Compass", label: "Bússola" },
  { value: "BarChart3", label: "Gráfico" },
  { value: "Layers", label: "Camadas" },
  { value: "Puzzle", label: "Puzzle" },
  { value: "Rocket", label: "Foguete" },
];

export default function AdminSeasonPillarsPage() {
  const { seasonId } = useParams<{ seasonId: string }>();
  const { data: season, isLoading } = useSeasonById(seasonId || "");
  const createPillar = useCreatePillar();
  const updatePillar = useUpdatePillar();
  const deletePillar = useDeletePillar();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPillar, setEditingPillar] = useState<SeasonPillar | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "Sparkles",
    order_index: 0,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      icon: "Sparkles",
      order_index: season?.pillars?.length || 0,
    });
    setEditingPillar(null);
  };

  const handleOpenDialog = (pillar?: SeasonPillar) => {
    if (pillar) {
      setEditingPillar(pillar);
      setFormData({
        title: pillar.title,
        description: pillar.description,
        icon: pillar.icon || "Sparkles",
        order_index: pillar.order_index,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!seasonId) return;

    try {
      if (editingPillar) {
        await updatePillar.mutateAsync({
          id: editingPillar.id,
          ...formData,
        });
        toast.success("Pilar atualizado com sucesso!");
      } else {
        await createPillar.mutateAsync({
          season_id: seasonId,
          ...formData,
        });
        toast.success("Pilar criado com sucesso!");
      }
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Erro ao salvar pilar");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este pilar?")) return;

    try {
      await deletePillar.mutateAsync(id);
      toast.success("Pilar excluído com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir pilar");
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="text-muted-foreground">Carregando...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/temporadas">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Pilares: {season?.title}</h1>
            <p className="text-muted-foreground">
              Gerencie os pilares e temas desta temporada.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Pilar
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingPillar ? "Editar Pilar" : "Novo Pilar"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, title: e.target.value }))
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    rows={4}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Ícone</Label>
                    <select
                      id="icon"
                      value={formData.icon}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, icon: e.target.value }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      {ICON_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order_index">Ordem</Label>
                    <Input
                      id="order_index"
                      type="number"
                      value={formData.order_index}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          order_index: parseInt(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editingPillar ? "Salvar" : "Criar"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ordem</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Ícone</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {season?.pillars?.map((pillar) => (
                <TableRow key={pillar.id}>
                  <TableCell>{pillar.order_index}</TableCell>
                  <TableCell className="font-medium">{pillar.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {pillar.icon || "Sparkles"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(pillar)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(pillar.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {(!season?.pillars || season.pillars.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-muted-foreground py-8"
                  >
                    Nenhum pilar cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
