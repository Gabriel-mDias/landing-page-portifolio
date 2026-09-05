# G&Ms Soluções Tecnológicas — site

Site institucional da G&Ms, publicado em **https://gems.tec.br** pelo GitHub Pages.

Estático: HTML, CSS e JavaScript sem build, dependência ou framework. O deploy é o próprio
`git push` na branch `main`.

## Estrutura

```
index.html            página única, com todas as seções
404.html              página de erro do Pages
CNAME                 domínio custom (gems.tec.br) — não remover
robots.txt            liberado, com referência ao sitemap
sitemap.xml
site.webmanifest
assets/css/styles.css tokens de cor, tipografia, layout e os dois temas
assets/js/config.js   ← telefone, e-mail e chave do formulário
assets/js/main.js     tema, menu, abas do hero, revelação e envio do formulário
assets/img/           favicon e imagem de compartilhamento (Open Graph)
assets/logos/         arquivos originais da marca
```

## Rodar localmente

```powershell
python -m http.server 8099
```

Depois abra <http://127.0.0.1:8099>. Servidor é necessário porque o `fetch` do formulário e
o `manifest` não funcionam via `file://`.

## Marca

A identidade visual do site sai da própria logo: **navy `#172C3B`** e o **dourado do gradiente
da marca** (`#C19059` → `#9C7449` → `#926E47`), sobre papel off-white. A tagline oficial é
**"Tecnologia que gera valor para pessoas"**.

### Os arquivos em `assets/logos/`

| Arquivo | Uso |
|---|---|
| `gems-wordmark.svg` | **Em uso.** Wordmark completo. Os dois paths estão embutidos direto no `index.html` |
| `gems-symbol-g.svg` | **Em uso.** Símbolo reduzido; origem do `assets/img/favicon.svg` |
| `gems-full-logo.png` | Arte original com a assinatura e a tagline. Referência — não é usada no site |

Os dois SVGs têm a mesma estrutura: um path dourado com o gradiente `userSpaceOnUse` da marca
e um path navy sólido `#172C3B`. Sem raster embutido e sem `transform`, o que torna simples
reaproveitá-los.

O wordmark está **inline no `index.html`**, e não como `<img>`, porque as letras precisam
acompanhar o tema: o path navy usa `fill="var(--logo-ink)"` — navy no claro, branco-gelo no
escuro — enquanto o gradiente dourado é idêntico nos dois. Ao trocar o arquivo da logo,
é o bloco `<svg class="wordmark">` do cabeçalho que muda; os paths saem de
`gems-wordmark.svg` (ids `gms-gold` e `gms-navy`).

### Tipografia

Títulos em **Outfit** (geométrica, escolhida por proximidade com o desenho do wordmark);
corpo em **IBM Plex Sans**. Se a fonte original da logo for identificada — Montserrat e
Poppins são as candidatas — vale trocar Outfit por ela em `--display`.

## Onde mexer

| O quê | Onde |
|---|---|
| Telefone, e-mail, chave do formulário | `assets/js/config.js` |
| Cores dos dois temas | topo de `assets/css/styles.css` (`:root` e os blocos de tema escuro) |
| Campo de gradiente do topo | variável `--field` (uma versão por tema) |
| Textos, serviços, processo, FAQ | `index.html` |
| Telas dos casos | seção `#casos` do `index.html` (SVG e HTML, sem imagens) |

Os valores de contato também estão escritos direto no `index.html` como fallback, para que os
links continuem certos mesmo se o JavaScript não carregar. Ao trocar o número ou o e-mail,
atualize os dois lugares (`config.js` e os `href` correspondentes no HTML).

### Ativar o formulário de contato

1. Crie uma access key gratuita em <https://web3forms.com> usando **gemstecnologia@gmail.com**.
2. Cole a chave em `web3formsKey`, no `assets/js/config.js`.
3. Commit e push.

Enquanto a chave estiver vazia, o formulário orienta o visitante a usar o WhatsApp ou o e-mail —
a página nunca fica sem um canal de contato funcionando.

### A seção "Casos reais"

Telas desenhadas em HTML, CSS e SVG — sem imagem e sem biblioteca:

- **ADACI** (cliente, cidadania e vistos): árvore genealógica com a linha de transmissão sendo
  traçada, e esteira de processo com etapa travada por requisito não cumprido.
- **Meduc** (produto próprio, gestão escolar): provisionamento de uma nova instituição, com
  a base de dados isolada por escola.

Os dados são fictícios e a página diz isso explicitamente; o código dos sistemas de cliente é
privado. A animação de entrada roda uma vez, por `IntersectionObserver`, e só nesses blocos —
sem JavaScript ou com `prefers-reduced-motion`, tudo aparece direto, já no estado final.

## Publicação

### 1. GitHub Pages

Em **Settings → Pages** do repositório:

- **Source**: `Deploy from a branch`
- **Branch**: `main` / `/ (root)`
- **Custom domain**: `gems.tec.br` (o arquivo `CNAME` já existe no repo)
- **Enforce HTTPS**: marcar **só depois** que o DNS propagar e o certificado for emitido

### 2. DNS no Registro.br

No painel do domínio → **DNS / Editar zona**, criar:

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

O redirecionamento de `www` para o domínio raiz é feito pelo próprio GitHub Pages.

**Recomendado:** verificar o domínio em <https://github.com/settings/pages> → *Add a domain*.
O GitHub gera um registro TXT `_github-pages-challenge-gabriel-mdias`; criando-o na mesma zona,
nenhuma outra conta do GitHub consegue reivindicar o domínio.

### 3. Conferir

```powershell
Resolve-DnsName gems.tec.br -Type A        # deve retornar os quatro 185.199.10x.153
curl.exe -I https://gems.tec.br            # 200, certificado válido
curl.exe -I https://www.gems.tec.br        # 301 para o domínio raiz
```

## Notas de manutenção

- **Acessibilidade e SEO**: Lighthouse em 100 (acessibilidade, boas práticas, SEO) **nos dois
  temas**. Ao mexer em cor, manter contraste mínimo de 4.5:1 para texto — `--gold` (`#9C7449`,
  o tom médio do gradiente da marca) fica em 3.9:1 e por isso serve só para filetes, ícones e
  numerais; texto e link usam `--gold-ink` (`#86653F`, 5.0:1).
- **Dados estruturados**: o JSON-LD no fim do `index.html` descreve a empresa, a pessoa e o FAQ.
  Ao editar uma pergunta do FAQ, edite também a entrada correspondente lá.
- **Imagem de compartilhamento**: `assets/img/og-cover.png` (1200×630). Se a headline ou a
  identidade mudarem, vale regerar.
