

## Redesign da seção "Conceito" na pagina da Temporada

A seção de conceito atualmente exibe todos os paragrafos em sequencia simples, criando um bloco visual monotonico e cansativo. A proposta e transformar isso em uma diagramacao editorial mais dinamica.

### Abordagem de design

O texto do conceito tem 9 paragrafos. A nova diagramacao vai alternar entre diferentes layouts para criar ritmo visual:

1. **Paragrafo de abertura (destaque)** -- O primeiro paragrafo sera exibido em tamanho maior, com tipografia display e destaque visual, funcionando como um "lead" editorial.

2. **Citacao em destaque** -- O segundo paragrafo ("O retorno da estrategia nao significa voltar ao passado...") sera estilizado como um blockquote com borda lateral na cor primaria e tipografia italica.

3. **Paragrafos em grid alternado** -- Os paragrafos seguintes serao distribuidos em layouts alternados:
   - Alguns em largura total com margem generosa
   - Outros em grid de 2 colunas lado a lado
   - Paragrafos curtos e impactantes recebem destaque tipografico como "pull quotes"

4. **Paragrafo de fechamento (destaque)** -- O ultimo paragrafo sera estilizado como uma conclusao com destaque visual similar ao de abertura, mas com fundo sutil.

### Detalhes tecnicos

**Arquivo modificado:** `src/pages/SeasonPage.tsx`

A secao "Concept" (linhas 105-118) sera substituida por uma nova estrutura que:

- Renderiza o primeiro paragrafo com classes `text-xl md:text-2xl font-display font-medium text-foreground` em largura total
- Renderiza paragrafos curtos (menos de 200 caracteres) como blockquotes com `border-l-4 border-primary pl-6 italic text-xl`
- Agrupa pares de paragrafos intermediarios em `grid md:grid-cols-2 gap-8` para quebrar a monotonia
- Aplica ao ultimo paragrafo um estilo de destaque com fundo `bg-primary/5 rounded-2xl p-8`
- Adiciona separadores visuais sutis (`<div className="w-16 h-1 bg-primary/20 mx-auto">`) entre blocos para ritmo
- Usa `max-w-4xl` no container geral para dar mais respiro ao texto

Nao sera necessario alterar banco de dados nem criar novos componentes -- apenas refatorar o JSX da secao de conceito dentro do `SeasonPage.tsx`.

