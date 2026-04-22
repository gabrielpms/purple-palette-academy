import { useState } from "react";
import { useCreateLead } from "@/hooks/useLeads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
});

export function LeadCapture() {
  const createLead = useCreateLead();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = leadSchema.safeParse({ name, email });
    if (!result.success) {
      const fieldErrors: { name?: string; email?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0] === "name") fieldErrors.name = err.message;
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    createLead.mutate(
      { name: result.data.name, email: result.data.email },
      {
        onSuccess: () => {
          setSubmitted(true);
          setName("");
          setEmail("");
        },
      }
    );
  };

  if (submitted) {
    return (
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-dark p-8 md:p-12 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl">
              Cadastro realizado com sucesso!
            </h3>
            <p className="mt-4 text-primary-foreground/80">
              Em breve você recebe nossas próximas reflexões e convites.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="relative overflow-hidden mx-auto max-w-4xl rounded-3xl bg-gradient-dark p-8 md:p-12">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-purple-500/20 blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                Newsletter Plots
              </div>
              <h2 className="font-display text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
                Cada temporada começa com uma pergunta.
              </h2>
              <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
                Receba reflexões, novas masterclasses e convites para encontros da comunidade.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-center"
            >
              <div className="flex-1 max-w-xs">
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>
              <div className="flex-1 max-w-xs">
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={createLead.isPending}
                className="h-12 px-8 whitespace-nowrap"
              >
                {createLead.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="h-4 w-4 mr-2" />
                )}
                Quero receber
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-primary-foreground/60">
              Não enviamos spam. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
