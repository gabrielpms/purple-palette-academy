import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useLeads, useDeleteLead } from "@/hooks/useLeads";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Trash2, Mail, Download, Building2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PartnerRequest {
  id: string;
  name: string;
  email: string;
  whatsapp: string | null;
  company: string | null;
  website: string | null;
  message: string | null;
  status: string | null;
  created_at: string;
}

function usePartnerRequests() {
  return useQuery({
    queryKey: ["partner-requests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("partner_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PartnerRequest[];
    },
  });
}

export default function AdminLeadsPage() {
  const { data: leads, isLoading: loadingLeads } = useLeads();
  const { data: partnerRequests, isLoading: loadingRequests } = usePartnerRequests();
  const deleteLead = useDeleteLead();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = () => {
    if (deleteId) {
      deleteLead.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const handleExportCSV = () => {
    if (!leads || leads.length === 0) return;

    const csvContent = [
      ["Nome", "Email", "Data de Cadastro"],
      ...leads.map((lead) => [
        lead.name,
        lead.email,
        format(new Date(lead.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR }),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads_${format(new Date(), "yyyy-MM-dd")}.csv`;
    link.click();
  };

  const isLoading = loadingLeads || loadingRequests;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Leads & Solicitações</h1>
          <p className="text-muted-foreground">
            Gerencie leads capturados e solicitações de instrutores
          </p>
        </div>

        <Tabs defaultValue="leads">
          <TabsList>
            <TabsTrigger value="leads" className="gap-2">
              <Mail className="h-4 w-4" />
              Leads ({leads?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="partner-requests" className="gap-2">
              <Building2 className="h-4 w-4" />
              Solicitações de Instrutores ({partnerRequests?.length || 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="space-y-4">
            <div className="flex justify-end">
              {leads && leads.length > 0 && (
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="h-4 w-4 mr-2" />
                  Exportar CSV
                </Button>
              )}
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Data de Cadastro</TableHead>
                    <TableHead className="w-[80px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-12">
                        <Mail className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground">Nenhum lead capturado ainda.</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    leads?.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell>
                          <a href={`mailto:${lead.email}`} className="text-primary hover:underline">
                            {lead.email}
                          </a>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(lead.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" onClick={() => setDeleteId(lead.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="partner-requests">
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="hidden md:table-cell">WhatsApp</TableHead>
                    <TableHead className="hidden md:table-cell">Empresa</TableHead>
                    <TableHead className="hidden lg:table-cell">Mensagem</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerRequests?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                        <p className="text-muted-foreground">Nenhuma solicitação recebida ainda.</p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    partnerRequests?.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">{req.name}</TableCell>
                        <TableCell>
                          <a href={`mailto:${req.email}`} className="text-primary hover:underline">
                            {req.email}
                          </a>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {req.company || "-"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-muted-foreground text-sm line-clamp-2 max-w-xs">
                            {req.message || "-"}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={req.status === "pending" ? "secondary" : "default"}>
                            {req.status === "pending" ? "Pendente" : req.status || "Pendente"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {format(new Date(req.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir lead?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O lead será removido permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLead.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
