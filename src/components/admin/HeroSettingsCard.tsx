import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, LayoutTemplate } from "lucide-react";

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
            <Label>Imagens de fundo (instrutores)</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => setHeroBackgroundImages([...heroBackgroundImages, ""])}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>
          {heroBackgroundImages.map((url, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <Input
                className="flex-1"
                value={url}
                onChange={(e) => {
                  const updated = [...heroBackgroundImages];
                  updated[idx] = e.target.value;
                  setHeroBackgroundImages(updated);
                }}
                placeholder="https://..."
              />
              {url && (
                <img src={url} alt="" className="h-10 w-10 rounded object-cover" />
              )}
              <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => setHeroBackgroundImages(heroBackgroundImages.filter((_, i) => i !== idx))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
