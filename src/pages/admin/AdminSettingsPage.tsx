import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useSiteSettings, useUpdateSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Palette, Image, MessageSquare, CreditCard, Plus, Trash2, Globe } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HeroSettingsCard } from "@/components/admin/HeroSettingsCard";
import { ValuePropSettingsCard } from "@/components/admin/ValuePropSettingsCard";
import { AboutSettingsCard } from "@/components/admin/AboutSettingsCard";

export default function AdminSettingsPage() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();

  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#f97316");
  const [secondaryColor, setSecondaryColor] = useState("#262626");
  const [showTestimonials, setShowTestimonials] = useState(true);
  const [showSubscription, setShowSubscription] = useState(true);
  const [activeVersion, setActiveVersion] = useState<"site" | "landing">("site");

  // Subscription fields
  const [subTitle, setSubTitle] = useState("");
  const [subDescription, setSubDescription] = useState("");
  const [subPrice, setSubPrice] = useState("");
  const [subOriginalPrice, setSubOriginalPrice] = useState("");
  const [subAnnualPrice, setSubAnnualPrice] = useState("");
  const [subDiscountText, setSubDiscountText] = useState("");
  const [subCtaText, setSubCtaText] = useState("");
  const [subCtaUrl, setSubCtaUrl] = useState("");
  const [subNote, setSubNote] = useState("");
  const [subFeatures, setSubFeatures] = useState<{ title: string; description: string }[]>([]);

  // Hero fields
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroCtaPrimaryText, setHeroCtaPrimaryText] = useState("");
  const [heroCtaPrimaryUrl, setHeroCtaPrimaryUrl] = useState("");
  const [heroCtaSecondaryText, setHeroCtaSecondaryText] = useState("");
  const [heroCtaSecondaryUrl, setHeroCtaSecondaryUrl] = useState("");
  const [heroStats, setHeroStats] = useState<{ value: string; label: string }[]>([]);
  const [heroBackgroundImages, setHeroBackgroundImages] = useState<string[]>([]);

  // Value Prop fields
  const [vpTitle, setVpTitle] = useState("");
  const [vpSubtitle, setVpSubtitle] = useState("");
  const [vpFeatures, setVpFeatures] = useState<{ icon: string; title: string; description: string }[]>([]);

  // About fields
  const [aboutHeroTitle, setAboutHeroTitle] = useState("");
  const [aboutHeroDescription, setAboutHeroDescription] = useState("");
  const [aboutStoryTitle, setAboutStoryTitle] = useState("");
  const [aboutStoryParagraphs, setAboutStoryParagraphs] = useState<string[]>([]);
  const [aboutStoryImageUrl, setAboutStoryImageUrl] = useState("");
  const [aboutValuesTitle, setAboutValuesTitle] = useState("");
  const [aboutValuesSubtitle, setAboutValuesSubtitle] = useState("");
  const [aboutValues, setAboutValues] = useState<{ icon: string; title: string; description: string }[]>([]);
  const [aboutNumbers, setAboutNumbers] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    if (settings) {
      setLogoUrl(settings.logo_url || "");
      setPrimaryColor(settings.primary_color);
      setSecondaryColor(settings.secondary_color);
      setShowTestimonials(settings.show_testimonials);
      setShowSubscription(settings.show_subscription ?? true);
      setActiveVersion((settings.active_version as "site" | "landing") || "site");
      setSubTitle(settings.subscription_title || "");
      setSubDescription(settings.subscription_description || "");
      setSubPrice(String(settings.subscription_price ?? ""));
      setSubOriginalPrice(String(settings.subscription_original_price ?? ""));
      setSubAnnualPrice(String(settings.subscription_annual_price ?? ""));
      setSubDiscountText(settings.subscription_discount_text || "");
      setSubCtaText(settings.subscription_cta_text || "");
      setSubCtaUrl(settings.subscription_cta_url || "");
      setSubNote(settings.subscription_note || "");
      setSubFeatures(settings.subscription_features || []);
      setHeroTitle(settings.hero_title || "");
      setHeroDescription(settings.hero_description || "");
      setHeroCtaPrimaryText(settings.hero_cta_primary_text || "");
      setHeroCtaPrimaryUrl(settings.hero_cta_primary_url || "");
      setHeroCtaSecondaryText(settings.hero_cta_secondary_text || "");
      setHeroCtaSecondaryUrl(settings.hero_cta_secondary_url || "");
      setHeroStats(settings.hero_stats || []);
      setHeroBackgroundImages(settings.hero_background_images || []);
      setVpTitle(settings.value_prop_title || "");
      setVpSubtitle(settings.value_prop_subtitle || "");
      setVpFeatures(settings.value_prop_features || []);
      // About
      setAboutHeroTitle(settings.about_hero_title || "");
      setAboutHeroDescription(settings.about_hero_description || "");
      setAboutStoryTitle(settings.about_story_title || "");
      setAboutStoryParagraphs(settings.about_story_paragraphs || []);
      setAboutStoryImageUrl(settings.about_story_image_url || "");
      setAboutValuesTitle(settings.about_values_title || "");
      setAboutValuesSubtitle(settings.about_values_subtitle || "");
      setAboutValues(settings.about_values || []);
      setAboutNumbers(settings.about_numbers || []);
    }
  }, [settings]);

  const handleSave = () => {
    updateSettings.mutate({
      logo_url: logoUrl || null,
      primary_color: primaryColor,
      secondary_color: secondaryColor,
      show_testimonials: showTestimonials,
      show_subscription: showSubscription,
      active_version: activeVersion,
      subscription_description: subDescription || null,
      subscription_price: subPrice ? Number(subPrice) : null,
      subscription_original_price: subOriginalPrice ? Number(subOriginalPrice) : null,
      subscription_annual_price: subAnnualPrice ? Number(subAnnualPrice) : null,
      subscription_discount_text: subDiscountText || null,
      subscription_cta_text: subCtaText || null,
      subscription_cta_url: subCtaUrl || null,
      subscription_note: subNote || null,
      subscription_features: subFeatures.length ? subFeatures : null,
      hero_title: heroTitle || null,
      hero_description: heroDescription || null,
      hero_cta_primary_text: heroCtaPrimaryText || null,
      hero_cta_primary_url: heroCtaPrimaryUrl || null,
      hero_cta_secondary_text: heroCtaSecondaryText || null,
      hero_cta_secondary_url: heroCtaSecondaryUrl || null,
      hero_stats: heroStats.length ? heroStats : null,
      hero_background_images: heroBackgroundImages.filter(Boolean).length ? heroBackgroundImages.filter(Boolean) : null,
      value_prop_title: vpTitle || null,
      value_prop_subtitle: vpSubtitle || null,
      value_prop_features: vpFeatures.length ? vpFeatures : null,
      about_hero_title: aboutHeroTitle || null,
      about_hero_description: aboutHeroDescription || null,
      about_story_title: aboutStoryTitle || null,
      about_story_paragraphs: aboutStoryParagraphs.length ? aboutStoryParagraphs : null,
      about_story_image_url: aboutStoryImageUrl || null,
      about_values_title: aboutValuesTitle || null,
      about_values_subtitle: aboutValuesSubtitle || null,
      about_values: aboutValues.length ? aboutValues : null,
      about_numbers: aboutNumbers.length ? aboutNumbers : null,
    } as any);
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
                  <Input type="color" id="primaryColor" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="w-16 h-10 p-1 cursor-pointer" />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} placeholder="#f97316" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Cor Secundária</Label>
                <div className="flex gap-2">
                  <Input type="color" id="secondaryColor" value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="w-16 h-10 p-1 cursor-pointer" />
                  <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} placeholder="#262626" className="flex-1" />
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm text-muted-foreground">Preview:</p>
                <div className="flex gap-2">
                  <div className="w-16 h-10 rounded" style={{ backgroundColor: primaryColor }} />
                  <div className="w-16 h-10 rounded" style={{ backgroundColor: secondaryColor }} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Settings */}
          <HeroSettingsCard
            heroTitle={heroTitle} setHeroTitle={setHeroTitle}
            heroDescription={heroDescription} setHeroDescription={setHeroDescription}
            heroCtaPrimaryText={heroCtaPrimaryText} setHeroCtaPrimaryText={setHeroCtaPrimaryText}
            heroCtaPrimaryUrl={heroCtaPrimaryUrl} setHeroCtaPrimaryUrl={setHeroCtaPrimaryUrl}
            heroCtaSecondaryText={heroCtaSecondaryText} setHeroCtaSecondaryText={setHeroCtaSecondaryText}
            heroCtaSecondaryUrl={heroCtaSecondaryUrl} setHeroCtaSecondaryUrl={setHeroCtaSecondaryUrl}
            heroStats={heroStats} setHeroStats={setHeroStats}
            heroBackgroundImages={heroBackgroundImages} setHeroBackgroundImages={setHeroBackgroundImages}
          />

          {/* Value Proposition Settings */}
          <ValuePropSettingsCard
            title={vpTitle} setTitle={setVpTitle}
            subtitle={vpSubtitle} setSubtitle={setVpSubtitle}
            features={vpFeatures} setFeatures={setVpFeatures}
          />

          {/* About Page Settings */}
          <AboutSettingsCard
            heroTitle={aboutHeroTitle} setHeroTitle={setAboutHeroTitle}
            heroDescription={aboutHeroDescription} setHeroDescription={setAboutHeroDescription}
            storyTitle={aboutStoryTitle} setStoryTitle={setAboutStoryTitle}
            storyParagraphs={aboutStoryParagraphs} setStoryParagraphs={setAboutStoryParagraphs}
            storyImageUrl={aboutStoryImageUrl} setStoryImageUrl={setAboutStoryImageUrl}
            valuesTitle={aboutValuesTitle} setValuesTitle={setAboutValuesTitle}
            valuesSubtitle={aboutValuesSubtitle} setValuesSubtitle={setAboutValuesSubtitle}
            values={aboutValues} setValues={setAboutValues}
            numbers={aboutNumbers} setNumbers={setAboutNumbers}
          />

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
                <Switch checked={showTestimonials} onCheckedChange={setShowTestimonials} />
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
              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="font-medium text-sm">Exibir seção de assinatura</p>
                  <p className="text-xs text-muted-foreground">Quando desativado, a seção não aparece na home.</p>
                </div>
                <Switch checked={showSubscription} onCheckedChange={setShowSubscription} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subTitle">Título</Label>
                <Input id="subTitle" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} placeholder="Aprenda continuamente. Evolua constantemente." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subDescription">Descrição</Label>
                <Textarea id="subDescription" value={subDescription} onChange={(e) => setSubDescription(e.target.value)} placeholder="Nossa assinatura te dá acesso..." rows={3} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subPrice">Preço mensal (R$)</Label>
                  <Input id="subPrice" type="number" value={subPrice} onChange={(e) => setSubPrice(e.target.value)} placeholder="79" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subOriginalPrice">Preço original (R$)</Label>
                  <Input id="subOriginalPrice" type="number" value={subOriginalPrice} onChange={(e) => setSubOriginalPrice(e.target.value)} placeholder="149" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subAnnualPrice">Preço anual (R$)</Label>
                  <Input id="subAnnualPrice" type="number" value={subAnnualPrice} onChange={(e) => setSubAnnualPrice(e.target.value)} placeholder="569" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subDiscountText">Texto de desconto</Label>
                <Input id="subDiscountText" value={subDiscountText} onChange={(e) => setSubDiscountText(e.target.value)} placeholder="Economize 47% - Oferta de lançamento" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subCtaText">Texto do botão (CTA)</Label>
                <Input id="subCtaText" value={subCtaText} onChange={(e) => setSubCtaText(e.target.value)} placeholder="Começar 7 dias grátis" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subCtaUrl">Link do botão (CTA)</Label>
                <Input id="subCtaUrl" value={subCtaUrl} onChange={(e) => setSubCtaUrl(e.target.value)} placeholder="/assinatura ou https://..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subNote">Nota sobre masterclasses</Label>
                <Textarea id="subNote" value={subNote} onChange={(e) => setSubNote(e.target.value)} placeholder="As masterclasses são vendidas separadamente..." rows={2} />
              </div>
              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <Label>Diferenciais</Label>
                  <Button type="button" variant="outline" size="sm" onClick={() => setSubFeatures([...subFeatures, { title: "", description: "" }])}>
                    <Plus className="h-4 w-4 mr-1" /> Adicionar
                  </Button>
                </div>
                {subFeatures.map((feat, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="flex-1 space-y-2">
                      <Input value={feat.title} onChange={(e) => { const updated = [...subFeatures]; updated[idx] = { ...updated[idx], title: e.target.value }; setSubFeatures(updated); }} placeholder="Título do diferencial" />
                      <Input value={feat.description} onChange={(e) => { const updated = [...subFeatures]; updated[idx] = { ...updated[idx], description: e.target.value }; setSubFeatures(updated); }} placeholder="Descrição do diferencial" />
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="text-destructive mt-1" onClick={() => setSubFeatures(subFeatures.filter((_, i) => i !== idx))}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
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
