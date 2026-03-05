import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, LayoutTemplate, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface HeroStat {
  value: string;
  label: string;
}

interface HeroSettingsCardProps {
  heroTitle: string;
  setHeroTitle: (v: string) => void;
  heroDescription: string;
  setHeroDescription: (v: string) => void;
  heroCtaPrimaryText: string;
  setHeroCtaPrimaryText: (v: string) => void;
  heroCtaPrimaryUrl: string;
  setHeroCtaPrimaryUrl: (v: string) => void;
  heroCtaSecondaryText: string;
  setHeroCtaSecondaryText: (v: string) => void;
  heroCtaSecondaryUrl: string;
  setHeroCtaSecondaryUrl: (v: string) => void;
  heroStats: HeroStat[];
  setHeroStats: (v: HeroStat[]) => void;
  heroBackgroundImages: string[];
  setHeroBackgroundImages: (v: string[]) => void;
}

export function HeroSettingsCard({
  heroTitle, setHeroTitle,
  heroDescription, setHeroDescription,
  heroCtaPrimaryText, setHeroCtaPrimaryText,
  heroCtaPrimaryUrl, setHeroCtaPrimaryUrl,
  heroCtaSecondaryText, setHeroCtaSecondaryText,
  heroCtaSecondaryUrl, setHeroCtaSecondaryUrl,
  heroStats, setHeroStats,
  heroBackgroundImages, setHeroBackgroundImages,
}: HeroSettingsCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `hero/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("site-images")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("site-images")
          .getPublicUrl(fileName);

        newUrls.push(publicUrl);
      }
      setHeroBackgroundImages([...heroBackgroundImages, ...newUrls]);
      toast({ title: "Upload concluído", description: `${newUrls.length} imagem(ns) adicionada(s).` });
    } catch (error: any) {
      toast({ title: "Erro no upload", description: error.message, variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LayoutTemplate className="h-5 w-5" />
          Seção Hero
        </CardTitle>
        <CardDescription>
          Edite o conteúdo principal exibido no topo da página inicial.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Título</Label>
          <Textarea
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            placeholder="APRENDA COM QUEM FAZ O MERCADO."
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label>Descrição</Label>
          <Textarea
            value={heroDescription}
            onChange={(e) => setHeroDescription(e.target.value)}
            placeholder="Masterclasses individuais ou assinatura..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Texto do botão principal</Label>
            <Input value={heroCtaPrimaryText} onChange={(e) => setHeroCtaPrimaryText(e.target.value)} placeholder="Ver Masterclasses" />
          </div>
          <div className="space-y-2">
            <Label>Link do botão principal</Label>
            <Input value={heroCtaPrimaryUrl} onChange={(e) => setHeroCtaPrimaryUrl(e.target.value)} placeholder="/cursos" />
          </div>
          <div className="space-y-2">
            <Label>Texto do botão secundário</Label>
            <Input value={heroCtaSecondaryText} onChange={(e) => setHeroCtaSecondaryText(e.target.value)} placeholder="Conhecer a Plataforma" />
          </div>
          <div className="space-y-2">
            <Label>Link do botão secundário</Label>
            <Input value={heroCtaSecondaryUrl} onChange={(e) => setHeroCtaSecondaryUrl(e.target.value)} placeholder="/sobre" />
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <Label>Estatísticas</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => setHeroStats([...heroStats, { value: "", label: "" }])}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>
          {heroStats.map((stat, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input
                  value={stat.value}
                  onChange={(e) => {
                    const updated = [...heroStats];
                    updated[idx] = { ...updated[idx], value: e.target.value };
                    setHeroStats(updated);
                  }}
                  placeholder="200+"
                />
                <Input
                  value={stat.label}
                  onChange={(e) => {
                    const updated = [...heroStats];
                    updated[idx] = { ...updated[idx], label: e.target.value };
                    setHeroStats(updated);
                  }}
                  placeholder="Aulas disponíveis"
                />
              </div>
              <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => setHeroStats(heroStats.filter((_, i) => i !== idx))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Background Images */}
        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <Label>Imagens de fundo</Label>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                {uploading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Upload className="h-4 w-4 mr-1" />}
                Upload
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setHeroBackgroundImages([...heroBackgroundImages, ""])}>
                <Plus className="h-4 w-4 mr-1" /> URL
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {heroBackgroundImages.map((url, idx) => (
              <div key={idx} className="relative group">
                {url ? (
                  <img src={url} alt="" className="h-24 w-full rounded-lg object-cover border border-border" />
                ) : (
                  <div className="h-24 w-full rounded-lg border border-dashed border-border flex items-center justify-center">
                    <Input
                      value={url}
                      onChange={(e) => {
                        const updated = [...heroBackgroundImages];
                        updated[idx] = e.target.value;
                        setHeroBackgroundImages(updated);
                      }}
                      placeholder="Cole a URL..."
                      className="text-xs h-8"
                    />
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setHeroBackgroundImages(heroBackgroundImages.filter((_, i) => i !== idx))}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
