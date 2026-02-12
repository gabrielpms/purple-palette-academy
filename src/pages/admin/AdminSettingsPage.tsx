import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Palette, Image, MessageSquare, CreditCard } from "lucide-react";

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#f97316");
  const [secondaryColor, setSecondaryColor] = useState("#262626");
  const [showTestimonials, setShowTestimonials] = useState(true);

  // Subscription fields
  const [subTitle, setSubTitle] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [subPrice, setSubPrice] = useState("");
  const [subOriginalPrice, setSubOriginalPrice] = useState("");
  const [subAnnualPrice, setSubAnnualPrice] = useState("");
  const [subDiscountText, setSubDiscountText] = useState("");
  const [subCtaText, setSubCtaText] = useState("");
  const [subNote, setSubNote] = useState("");

  useEffect(() => {
    if (settings) {
      setLogoUrl(settings.logo_url || "");
      setPrimaryColor(settings.primary_color);
      setSecondaryColor(settings.secondary_color);
      setShowTestimonials(settings.show_testimonials);
      setSubTitle(settings.subscription_title || "");
      setSubDescription(settings.subscription_description || "");
      setSubPrice(String(settings.subscription_price ?? ""));
      setSubOriginalPrice(String(settings.subscription_original_price ?? ""));
      setSubAnnualPrice(String(settings.subscription_annual_price ?? ""));
      setSubDiscountText(settings.subscription_discount_text || "");
      setSubCtaText(settings.subscription_cta_text || "");
      setSubNote(settings.subscription_note || "");
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings.mutate({
      logo_url: logoUrl || null,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      show_testimonials: showTestimonials,
      subscription_title: subTitle || null,
      subscription_description: subDescription || null,
      subscription_price: subPrice ? Number(subPrice) : null,
      subscription_original_price: subOriginalPrice ? Number(subOriginalPrice) : null,
      subscription_annual_price: subAnnualPrice ? Number(subAnnualPrice) : null,
      subscription_discount_text: subDiscountText || null,
      subscription_cta_text: subCtaText || null,
      subscription_note: subNote || null,
    });
  };

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
          <h1 className="text-2xl font-bold">Configurações do Site</h1>
          <p className="text-muted-foreground">
            Personalize a aparência e funcionalidades do seu site.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Logo Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Logo do Site
              </CardTitle>
              <CardDescription>
                Defina a logo que aparece no cabeçalho do site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logoUrl">URL da Logo</Label>
                <Input
                  id="logoUrl"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>
              {logoUrl && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                  <img
                    src={logoUrl}
                    alt="Logo preview"
                    className="h-12 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Color Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Cores do Site
              </CardTitle>
              <CardDescription>
                Personalize as cores primária e secundária.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Cor Primária</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="primaryColor"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    placeholder="#f97316"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Cor Secundária</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    id="secondaryColor"
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    value={secondaryColor}
                    onChange={(e) => setSecondaryColor(e.target.value)}
                    placeholder="#262626"
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Preview:</p>
                <div className="flex gap-2">
                  <div
                    className="w-16 h-10 rounded"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div
                    className="w-16 h-10 rounded"
                    style={{ backgroundColor: secondaryColor }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Toggle */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Depoimentos
              </CardTitle>
              <CardDescription>
                Controle a exibição dos depoimentos de alunos no site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Exibir depoimentos</p>
                  <p className="text-sm text-muted-foreground">
                    Quando ativado, os depoimentos serão exibidos na página inicial.
                  </p>
                </div>
                <Switch
                  checked={showTestimonials}
                  onCheckedChange={setShowTestimonials}
                />
              </div>
            </CardContent>
          </Card>


          {/* Subscription Settings */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Assinatura na Home
              </CardTitle>
              <CardDescription>
                Edite os textos e valores exibidos na seção de assinatura da página inicial.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subTitle">Título</Label>
                <Input
                  id="subTitle"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  placeholder="Aprenda continuamente. Evolua constantemente."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subDescription">Descrição</Label>
                <Textarea
                  id="subDescription"
                  value={subDescription}
                  onChange={(e) => setSubDescription(e.target.value)}
                  placeholder="Nossa assinatura te dá acesso..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subPrice">Preço mensal (R$)</Label>
                  <Input
                    id="subPrice"
                    type="number"
                    value={subPrice}
                    onChange={(e) => setSubPrice(e.target.value)}
                    placeholder="79"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subOriginalPrice">Preço original (R$)</Label>
                  <Input
                    id="subOriginalPrice"
                    type="number"
                    value={subOriginalPrice}
                    onChange={(e) => setSubOriginalPrice(e.target.value)}
                    placeholder="149"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subAnnualPrice">Preço anual (R$)</Label>
                  <Input
                    id="subAnnualPrice"
                    type="number"
                    value={subAnnualPrice}
                    onChange={(e) => setSubAnnualPrice(e.target.value)}
                    placeholder="569"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subDiscountText">Texto de desconto</Label>
                <Input
                  id="subDiscountText"
                  value={subDiscountText}
                  onChange={(e) => setSubDiscountText(e.target.value)}
                  placeholder="Economize 47% - Oferta de lançamento"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subCtaText">Texto do botão (CTA)</Label>
                <Input
                  id="subCtaText"
                  value={subCtaText}
                  onChange={(e) => setSubCtaText(e.target.value)}
                  placeholder="Começar 7 dias grátis"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subNote">Nota sobre masterclasses</Label>
                <Textarea
                  id="subNote"
                  value={subNote}
                  onChange={(e) => setSubNote(e.target.value)}
                  placeholder="As masterclasses são vendidas separadamente..."
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={updateSettings.isPending}>
            {updateSettings.isPending ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Salvar Configurações
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
