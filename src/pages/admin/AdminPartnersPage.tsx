import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Plus, Pencil, Trash2, Linkedin, Twitter, Instagram } from "lucide-react";
import { toast } from "sonner";
import { Partner } from "@/hooks/useCourses";

export default function AdminPartnersPage() {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [deletingPartner, setDeletingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logo_url: "",
    website_url: "",
    description: "",
    bio: "",
    linkedin_url: "",
    twitter_url: "",
    instagram_url: "",
    video_url: "",
    is_active: true,
    is_featured: false,
  });
  const [loading, setLoading] = useState(false);

  const { data: partners, isLoading } = useQuery({
    queryKey: ["admin-partners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data as Partner[];
    },
  });

  const openForm = (partner?: Partner) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData({
        name: partner.name,
        slug: partner.slug || "",
        logo_url: partner.logo_url || "",
        website_url: partner.website_url || "",
        description: partner.description || "",
        bio: partner.bio || "",
        linkedin_url: partner.linkedin_url || "",
        twitter_url: partner.twitter_url || "",
        instagram_url: partner.instagram_url || "",
        video_url: (partner as any).video_url || "",
        is_active: partner.is_active,
      });
    } else {
      setEditingPartner(null);
      setFormData({ 
        name: "", 
        slug: "",
        logo_url: "", 
        website_url: "", 
        description: "", 
        bio: "",
        linkedin_url: "",
        twitter_url: "",
        instagram_url: "",
        video_url: "",
        is_active: true 
      });
    }
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const generatedSlug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const partnerData = {
      name: formData.name,
      slug: generatedSlug,
      logo_url: formData.logo_url || null,
      website_url: formData.website_url || null,
      description: formData.description || null,
      bio: formData.bio || null,
      linkedin_url: formData.linkedin_url || null,
      twitter_url: formData.twitter_url || null,
      instagram_url: formData.instagram_url || null,
      video_url: formData.video_url || null,
      is_active: formData.is_active,
    };

    let error;

    if (editingPartner) {
      const result = await supabase
        .from("partners")
        .update(partnerData)
        .eq("id", editingPartner.id);
      error = result.error;
    } else {
      const result = await supabase.from("partners").insert(partnerData);
      error = result.error;
    }

    if (error) {
      toast.error("Erro ao salvar instrutor: " + error.message);
    } else {
      toast.success(editingPartner ? "Instrutor atualizado!" : "Instrutor criado!");
      setIsFormOpen(false);
      setEditingPartner(null);
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deletingPartner) return;

    const { error } = await supabase
      .from("partners")
      .delete()
      .eq("id", deletingPartner.id);

    if (error) {
      toast.error("Erro ao excluir instrutor: " + error.message);
    } else {
      toast.success("Instrutor excluído!");
      queryClient.invalidateQueries({ queryKey: ["admin-partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    }

    setDeletingPartner(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold">Instrutores</h1>
            <p className="text-muted-foreground">
              Gerencie os instrutores da plataforma
            </p>
          </div>
          <Button onClick={() => openForm()}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Instrutor
          </Button>
        </div>

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instrutor</TableHead>
                <TableHead className="hidden md:table-cell">Redes Sociais</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-24">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : partners?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    Nenhum instrutor encontrado
                  </TableCell>
                </TableRow>
              ) : (
                partners?.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {partner.logo_url && (
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            className="w-10 h-10 rounded-full object-cover bg-muted"
                          />
                        )}
                        <div>
                          <div className="font-medium">{partner.name}</div>
                          {partner.description && (
                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                              {partner.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex gap-2">
                        {partner.linkedin_url && (
                          <Linkedin className="h-4 w-4 text-muted-foreground" />
                        )}
                        {partner.twitter_url && (
                          <Twitter className="h-4 w-4 text-muted-foreground" />
                        )}
                        {partner.instagram_url && (
                          <Instagram className="h-4 w-4 text-muted-foreground" />
                        )}
                        {!partner.linkedin_url && !partner.twitter_url && !partner.instagram_url && (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={partner.is_active ? "default" : "secondary"}>
                        {partner.is_active ? "Ativo" : "Inativo"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openForm(partner)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setDeletingPartner(partner)}
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
        if (!open) setEditingPartner(null);
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingPartner ? "Editar Instrutor" : "Novo Instrutor"}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh] pr-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="gerado-automaticamente"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo_url">URL da Foto</Label>
                <Input
                  id="logo_url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, logo_url: e.target.value }))}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Título / Cargo</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Ex: Head of Design na Nubank"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Escreva uma biografia detalhada do instrutor..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="video_url">URL do Vídeo de Apresentação</Label>
                <Input
                  id="video_url"
                  value={formData.video_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                  placeholder="https://youtube.com/embed/... ou https://vimeo.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  Use a URL de embed do YouTube ou Vimeo
                </p>
              </div>

              <div className="space-y-4 rounded-lg border p-4">
                <h4 className="font-medium">Redes Sociais</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin_url">LinkedIn</Label>
                    <Input
                      id="linkedin_url"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter_url">Twitter/X</Label>
                    <Input
                      id="twitter_url"
                      value={formData.twitter_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, twitter_url: e.target.value }))}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram_url">Instagram</Label>
                    <Input
                      id="instagram_url"
                      value={formData.instagram_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, instagram_url: e.target.value }))}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website_url">Website</Label>
                    <Input
                      id="website_url"
                      value={formData.website_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, website_url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Ativo</Label>
                  <p className="text-sm text-muted-foreground">
                    Instrutores inativos não aparecem no site
                  </p>
                </div>
                <Switch
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                />
              </div>

              <div className="flex gap-4 justify-end pt-4">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Salvando..." : editingPartner ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deletingPartner} onOpenChange={() => setDeletingPartner(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir instrutor?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o instrutor "{deletingPartner?.name}"? Esta ação não pode ser desfeita.
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
