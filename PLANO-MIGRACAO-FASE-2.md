# Plano de migração — Fase 2 (CMS para Helem)

**Status:** proposto, aguardando alinhamento de 4 decisões (ver final)
**Data:** 2026-05-21

Migração do site `helemfranceschini.com` da Fase 1 (HTML manual) para a Fase 2 (Astro + Sveltia CMS), permitindo que Helem publique artigos sozinha pelo navegador, com tradução automática PT→EN.

---

## Stack proposto

- **Astro** (gerador estático) — mantém o site rápido e Vercel-friendly, com templates reutilizáveis em vez de HTML duplicado
- **Sveltia CMS** — painel de edição com login GitHub, código aberto, sem servidor próprio
- **Claude API** — tradução PT→EN no momento do build, só quando necessário
- **Vercel** (continua) — deploy automático a cada commit

---

## Etapas

| # | Etapa | Tempo | Entrega |
|---|---|---|---|
| 1 | **Setup do Astro** (projeto em branch separado, content collections, design tokens portados) | 4-6h | Esqueleto rodando local |
| 2 | **Layout + componentes** (nav, footer, mobile menu, hero de artigo, home, lista de artigos, página de privacidade — tudo virando componentes reutilizáveis) | 4-6h | Site renderiza idêntico ao atual |
| 3 | **Migração dos 3 artigos atuais** (HTML → Markdown, preservando URLs exatas) | 2-3h | Artigos antigos no novo sistema, sem mudança de SEO |
| 4 | **Configuração do Sveltia CMS** (`/admin`, schema de coleções, OAuth via GitHub) | 2-3h | Helem consegue logar e criar artigo de teste |
| 5 | **Pipeline de tradução automática** (script de build chama Claude, gera EN quando PT é publicado ou marcado como "stale") | 3-4h | Helem escreve PT, EN aparece sozinho |
| 6 | **SEO sanity check + cutover** (comparar URL por URL, redirects se necessário, submeter sitemap novo no GSC, fundir na `main`) | 2-3h | Site novo no ar, sem quebrar nada do antigo |
| 7 | **Onboarding da Helem** (criar conta GitHub se não tiver, adicionar ao repo, gravar Loom de 15 min) | 1h | Helem publicando sozinha |

**Total: ~20-26h** — cabe em 2 dias dedicados ou ~1 semana part-time.

---

## Custos (mensais)

- Vercel: **R$ 0** (Hobby tier sobra)
- GitHub: **R$ 0**
- Sveltia CMS: **R$ 0** (config no próprio repo)
- Auth proxy do Sveltia: **R$ 0** (eles oferecem grátis)
- Claude API pra tradução: **~R$ 0,10-0,30 por artigo** (~R$ 5-15/mês mesmo com cadência alta)
- **Total: praticamente R$ 0/mês**

Único custo é o tempo de migração inicial.

---

## Como vai ser pra Helem depois de pronto

1. Abre `helemfranceschini.com/admin` no navegador
2. **Login com GitHub** (uma vez só, depois fica autenticado)
3. Vê lista dos artigos, clica **"+ Novo artigo"**
4. Preenche formulário: título, categoria, imagem de capa (upload arrasta-e-solta), tags, e escreve o corpo em **editor visual** (igual Notion/Word) ou Markdown
5. Marca checkbox **"Traduzir para inglês no próximo deploy"** (opcional, ela controla)
6. Clica **"Salvar e publicar"**
7. ~45 segundos depois tá no ar, em PT (e EN se ela marcou)

Se preferir, pode salvar como rascunho e voltar depois. Pode também editar artigos antigos do mesmo painel.

---

## Riscos e decisões a alinhar antes de começar

1. **Qualidade da tradução IA:** Claude é muito bom mas não perfeito. Sugestão: deixar a tradução automática gerar o EN como **rascunho**, e a Helem dar um OK rápido antes de ir ao ar (10-15 min vs 1-2h traduzindo do zero).
   - *Decisão:* tradução com revisão da Helem, ou publicação direta sem revisão?

2. **Conta GitHub da Helem:** ela já tem ou precisa criar? Não pode fugir disso — é o mecanismo de auth do Sveltia.
   - *Decisão:* confirmar se ela já tem usuário; se não, criar antes da etapa 7.

3. **Backup plan se Sveltia quebrar:** o CMS gera apenas commits no GitHub. Se um dia o painel der problema, dá pra editar o Markdown direto pelo GitHub web — nada fica preso a uma ferramenta proprietária.
   - *Decisão:* nenhuma, é só uma garantia de portabilidade.

4. **Categorias fixas vs livres:** hoje temos *Direito Digital*, *LGPD*, *Contencioso Estratégico*, *Advocacia & Liderança*.
   - *Decisão:* manter essas 4 fixas ou permitir categorias novas livremente?
