import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Layers } from "lucide-react";

interface ValuePropFeature {
  icon: string;
  title: string;
  description: string;
}

interface ValuePropSettingsCardProps {
  title: string;
  setTitle: (v: string) => void;
  subtitle: string;
  setSubtitle: (v: string) => void;
  features: ValuePropFeature[];
  setFeatures: (v: ValuePropFeature[]) => void;
}

const availableIcons = ["BookOpen", "Zap", "Users", "Layers", "Target", "Award", "Star", "Lightbulb", "Rocket", "Shield"];

export function ValuePropSettingsCard({
  title, setTitle,
  subtitle, setSubtitle,
  features, setFeatures,
}: ValuePropSettingsCardProps) {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          Seção "O que está incluso"
        </CardTitle>
        <CardDescription>
          Edite o título, subtítulo e os cards de conteúdo desta seção.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Título</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="O que está incluso" />
        </div>
        <div className="space-y-2">
          <Label>Subtítulo</Label>
          <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Tudo que você precisa..." />
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-center justify-between">
            <Label>Cards de conteúdo</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setFeatures([...features, { icon: "BookOpen", title: "", description: "" }])}
            >
              <Plus className="h-4 w-4 mr-1" /> Adicionar
            </Button>
          </div>
          {features.map((feat, idx) => (
            <div key={idx} className="rounded-lg border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Card {idx + 1}</span>
                <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => setFeatures(features.filter((_, i) => i !== idx))}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Ícone</Label>
                  <select
                    value={feat.icon}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[idx] = { ...updated[idx], icon: e.target.value };
                      setFeatures(updated);
                    }}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <Label className="text-xs">Título</Label>
                  <Input
                    value={feat.title}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[idx] = { ...updated[idx], title: e.target.value };
                      setFeatures(updated);
                    }}
                    placeholder="Título do card"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Descrição</Label>
                <Textarea
                  value={feat.description}
                  onChange={(e) => {
                    const updated = [...features];
                    updated[idx] = { ...updated[idx], description: e.target.value };
                    setFeatures(updated);
                  }}
                  placeholder="Descrição do card"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
