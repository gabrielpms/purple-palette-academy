import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Info, Plus, Trash2 } from "lucide-react";

interface AboutSettingsCardProps {
  heroTitle: string;
  setHeroTitle: (v: string) => void;
  heroDescription: string;
  setHeroDescription: (v: string) => void;
  storyTitle: string;
  setStoryTitle: (v: string) => void;
  storyParagraphs: string[];
  setStoryParagraphs: (v: string[]) => void;
  storyImageUrl: string;
  setStoryImageUrl: (v: string) => void;
  valuesTitle: string;
  setValuesTitle: (v: string) => void;
  valuesSubtitle: string;
  setValuesSubtitle: (v: string) => void;
  values: { icon: string; title: string; description: string }[];
  setValues: (v: { icon: string; title: string; description: string }[]) => void;
  numbers: { value: string; label: string }[];
  setNumbers: (v: { value: string; label: string }[]) => void;
}

export function AboutSettingsCard({
  heroTitle, setHeroTitle,
  heroDescription, setHeroDescription,
  storyTitle, setStoryTitle,
  storyParagraphs, setStoryParagraphs,
  storyImageUrl, setStoryImageUrl,
  valuesTitle, setValuesTitle,
  valuesSubtitle, setValuesSubtitle,
  values, setValues,
  numbers, setNumbers,
}: AboutSettingsCardProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5" />
          Página Sobre
        </CardTitle>
        <CardDescription>
          Edite os conteúdos da página "Sobre".
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hero */}
        <div className="space-y-3 border-b pb-4">
          <h4 className="font-semibold text-sm">Hero</h4>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Sobre a DesignSchool" />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea value={heroDescription} onChange={(e) => setHeroDescription(e.target.value)} rows={3} />
          </div>
        </div>

        {/* Story */}
        <div className="space-y-3 border-b pb-4">
          <h4 className="font-semibold text-sm">Nossa História</h4>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={storyTitle} onChange={(e) => setStoryTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Parágrafos</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => setStoryParagraphs([...storyParagraphs, ""])}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </div>
            {storyParagraphs.map((p, idx) => (
              <div key={idx} className="flex gap-2">
                <Textarea
                  value={p}
                  onChange={(e) => {
                    const updated = [...storyParagraphs];
                    updated[idx] = e.target.value;
                    setStoryParagraphs(updated);
                  }}
                  rows={2}
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" className="text-destructive mt-1" onClick={() => setStoryParagraphs(storyParagraphs.filter((_, i) => i !== idx))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label>URL da Imagem</Label>
            <Input value={storyImageUrl} onChange={(e) => setStoryImageUrl(e.target.value)} placeholder="https://..." />
          </div>
        </div>

        {/* Values */}
        <div className="space-y-3 border-b pb-4">
          <h4 className="font-semibold text-sm">Valores</h4>
          <div className="space-y-2">
            <Label>Título</Label>
            <Input value={valuesTitle} onChange={(e) => setValuesTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Subtítulo</Label>
            <Input value={valuesSubtitle} onChange={(e) => setValuesSubtitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Cards de valores</Label>
              <Button type="button" variant="outline" size="sm" onClick={() => setValues([...values, { icon: "Target", title: "", description: "" }])}>
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </div>
            {values.map((val, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={val.icon}
                      onChange={(e) => { const u = [...values]; u[idx] = { ...u[idx], icon: e.target.value }; setValues(u); }}
                      placeholder="Ícone (Target, Heart...)"
                    />
                    <Input
                      value={val.title}
                      onChange={(e) => { const u = [...values]; u[idx] = { ...u[idx], title: e.target.value }; setValues(u); }}
                      placeholder="Título"
                    />
                  </div>
                  <Input
                    value={val.description}
                    onChange={(e) => { const u = [...values]; u[idx] = { ...u[idx], description: e.target.value }; setValues(u); }}
                    placeholder="Descrição"
                  />
                </div>
                <Button type="button" variant="ghost" size="icon" className="text-destructive mt-1" onClick={() => setValues(values.filter((_, i) => i !== idx))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Numbers */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Números / Estatísticas</h4>
          <div className="flex items-center justify-between">
            <Label>Estatísticas</Label>
            <Button type="button" variant="outline" size="sm" onClick={() => setNumbers([...numbers, { value: "", label: "" }])}>
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>
          {numbers.map((num, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input
                  value={num.value}
                  onChange={(e) => { const u = [...numbers]; u[idx] = { ...u[idx], value: e.target.value }; setNumbers(u); }}
                  placeholder="Valor (ex: 5.000+)"
                />
                <Input
                  value={num.label}
                  onChange={(e) => { const u = [...numbers]; u[idx] = { ...u[idx], label: e.target.value }; setNumbers(u); }}
                  placeholder="Label"
                />
              </div>
              <Button type="button" variant="ghost" size="icon" className="text-destructive mt-1" onClick={() => setNumbers(numbers.filter((_, i) => i !== idx))}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
