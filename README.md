# G&Ms Soluções Tecnológicas — Site Institucional (V2 Modular)

Site institucional da G&Ms Soluções Tecnológicas, publicado em **[https://gems.tec.br](https://gems.tec.br)** pelo GitHub Pages.

---

## 1. Visão Geral da Nova Versão (V2)

Esta nova versão da landing page foi totalmente refatorada para alinhar a comunicação com os objetivos estratégicos da G&Ms e resolver limitações técnicas e estéticas da versão anterior:

1. **Foco no Público-Alvo Real**: Pequenos e médios empreendedores de **Bom Jesus do Itabapoana e região** (além de atendimento remoto em todo o Brasil), apresentando a tecnologia como uma aliada simples e direta para destravar processos e reduzir custos.
2. **Nova Tríade de Serviços**:
   - **Landing Pages**: Porta de entrada para presença digital rápida e acessível.
   - **Consultorias em TI**: Diagnóstico e mapeamento sincero de processos, automações e melhorias.
   - **Sistemas Web Personalizados (ERP Customizado)**: O carro-chefe da empresa, trazendo esteiras operacionais sob medida e controle gerencial ponta a ponta.
3. **Novo Pilar Criativo de Gestão (Antes vs. Depois)**:
   - Componentes visuais interativos que mostram a transformação real em três áreas críticas: **Gestão do Trabalho**, **Gestão da Equipe** e **Gestão Financeira & Estoque** — sem métricas fictícias ou números artificiais.
4. **Processo Transparente em 5 Etapas**:
   - Linha do tempo visual inspirada nas melhores práticas de design (Optsolv e Stripe), detalhando desde a primeira conversa até a homologação iterativa e suporte contínuo.
5. **Casos Reais Reestruturados**:
   - As telas ilustrativas da **ADACI** (árvore genealógica e transmissão de cidadania italiana) e do **Meduc** (gestão escolar multi-tenant com isolamento seguro de dados) foram reposicionadas como vitrine de maturidade técnica do serviço de Sistemas Web.

---

## 2. Decisões Técnicas e Arquiteturais

### Por que uma Arquitetura Modular Nativa (Zero-Build / Pure ESM)?
Durante a fase de planejamento e entrevista técnica (`/grill-me`), avaliou-se a introdução de ferramentas de build como Vite ou bundlers complexos. Optou-se pela **Arquitetura Modular Nativa (Opção A)** pelos seguintes motivos:
- **Deploy Sem Atrito**: O GitHub Pages continua sendo servido diretamente a partir do `git push` na branch `main`, sem risco de falha em pipelines de CI/CD ou necessidade de gerar e rastrear pastas `dist/`.
- **Clean Code e Princípio da Responsabilidade Única (SRP)**:
  - O CSS foi particionado em **tokens** (`colors.css`, `typography.css`, `elevation.css`), **base** (`reset.css`, `global.css`), **componentes** (`buttons.css`, `cards.css`, `screens.css`, `timeline.css`, `forms.css`, `topbar.css`, `footer.css`) e **seções** (`hero.css`, `pilares.css`, `servicos.css`, `processo.css`, `sobre.css`, `faq.css`, `contato.css`), unificados via `@import` no `assets/css/styles.css`.
  - O JavaScript deixou de ser um IIFE monolítico e passou a adotar **ES Modules nativos do navegador** (`<script type="module" src="assets/js/main.js">`). Cada funcionalidade reside em seu próprio módulo em `assets/js/modules/` (`theme.js`, `navigation.js`, `showcase-tabs.js`, `pillars-toggle.js`, `scroll-reveal.js`, `contact-form.js`).
- **Performance e Manutenibilidade**: Manutenção cirúrgica — quem for alterar a timeline ou as cores edita apenas o arquivo responsável, sem efeitos colaterais.

Para consultar o detalhamento completo da arquitetura, leia [`docs/arquitetura.md`](docs/arquitetura.md). Para tokens de cores e contrastes, consulte [`docs/guia-de-estilo.md`](docs/guia-de-estilo.md).

---

## 3. Estrutura do Repositório

```
index.html                  Página única semântica e acessível (V2)
404.html                    Página de erro do GitHub Pages
CNAME                       Domínio customizado (gems.tec.br) — não remover
robots.txt                  Permissões de rastreamento e link para o sitemap
sitemap.xml                 Mapa XML para indexação no Google
site.webmanifest            Manifesto web / PWA
docs/
  arquitetura.md            Documentação técnica da arquitetura modular e Clean Code
  guia-de-estilo.md         Tokens de design, regras de contraste e acessibilidade
assets/
  css/
    styles.css              Entrypoint agregador que importa os submódulos
    tokens/                 Cores, tipografia e elevação/sombras
    base/                   Reset e estilos globais
    components/             Botões, cards, telas, timeline, forms, topbar e footer
    sections/               Estilos específicos de cada seção da landing page
  js/
    config.js               Telefone, e-mail e chave do formulário Web3Forms
    main.js                 Orquestrador principal da aplicação (ES Module)
    modules/                Módulos de tema, navegação, abas, pilares e formulário
  img/                      Favicon e imagem de compartilhamento Open Graph (og-cover)
  logos/                    Arquivos originais e vetores da marca
```

---

## 4. Como Rodar Localmente

Para rodar localmente com suporte a ES Modules e envio do formulário:

```powershell
python -m http.server 8099
```

Depois abra no navegador: **<http://127.0.0.1:8099>**.

> **Nota:** Servidor HTTP local é necessário porque módulos JavaScript (`type="module"`), `manifest` e requisições `fetch` são bloqueados por segurança em URLs do tipo `file://`.

---

## 5. Como Configurar e Manter

| O quê | Onde alterar |
|---|---|
| Telefone, e-mail e chave do formulário | `assets/js/config.js` |
| Cores dos dois temas | `assets/css/tokens/colors.css` |
| Tipografia e escalas | `assets/css/tokens/typography.css` |
| Conteúdo dos serviços e textos | `index.html` |
| Estilos de componentes específicos | `assets/css/components/` |
| Comportamento de scripts | `assets/js/modules/` |

### Ativar o Formulário de Contato
1. Crie uma chave gratuita em <https://web3forms.com> vinculada ao e-mail **gemstecnologia@gmail.com**.
2. Cole a chave em `web3formsKey` no arquivo `assets/js/config.js`.
3. Faça commit e push. Enquanto a chave não estiver preenchida, o formulário orientará o visitante a utilizar o WhatsApp ou o e-mail direto.

---

## 6. Publicação e Infraestrutura

### 1. GitHub Pages
- **Source**: `Deploy from a branch`
- **Branch**: `main` / `/ (root)`
- **Custom domain**: `gems.tec.br`
- **Enforce HTTPS**: Ativo após propagação de DNS.

### 2. Apontamento DNS no Registro.br
No painel do domínio `gems.tec.br` → **DNS / Editar zona**:

| Nome | Tipo | Valor |
|---|---|---|
| `@` | A | `185.199.108.153` |
| `@` | A | `185.199.109.153` |
| `@` | A | `185.199.110.153` |
| `@` | A | `185.199.111.153` |
| `@` | AAAA | `2606:50c0:8000::153` |
| `@` | AAAA | `2606:50c0:8001::153` |
| `@` | AAAA | `2606:50c0:8002::153` |
| `@` | AAAA | `2606:50c0:8003::153` |
| `www` | CNAME | `gabriel-mdias.github.io.` |

O redirecionamento de `www` para o domínio raiz é feito automaticamente pelo GitHub Pages.
