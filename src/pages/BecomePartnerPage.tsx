import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, CheckCircle, Building2, Users, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Building2,
    title: "Exposição de Marca",
    description: "Sua empresa visível para milhares de profissionais de design e produto.",
  },
  {
    icon: Users,
    title: "Comunidade Qualificada",
    description: "Acesso a uma comunidade engajada de designers estratégicos.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Mútuo",
    description: "Parcerias que beneficiam ambos os lados e geram resultados reais.",
  },
];

export default function BecomePartnerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("partner_requests").insert([formData]);

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Solicitação enviada com sucesso!");
    } catch (error) {
      console.error("Error submitting partner request:", error);
      toast.error("Erro ao enviar solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-display text-4xl font-bold md:text-5xl">
                Seja um <span className="text-gradient">Parceiro</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Junte-se a nós e faça parte da transformação da educação em design no Brasil.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="border-t border-border bg-muted/30 py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-xl">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle className="h-8 w-8 text-success" />
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold">
                    Solicitação Enviada!
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Obrigado pelo interesse! Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-10">
                    <h2 className="font-display text-2xl font-bold md:text-3xl">
                      Entre em Contato
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      Preencha o formulário abaixo e nossa equipe entrará em contato.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome completo *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Seu nome"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Nome da empresa"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://suaempresa.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Conte um pouco sobre como gostaria de colaborar..."
                        rows={5}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        "Enviar Solicitação"
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
