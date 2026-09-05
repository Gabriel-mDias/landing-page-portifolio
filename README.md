# G&Ms Soluções Tecnológicas — site

Landing page da G&Ms, publicada em **https://gems.tec.br** pelo GitHub Pages.

Site estático: HTML, CSS e JavaScript sem build, dependência ou framework. O deploy é o
próprio `git push` na branch `main`.

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
assets/js/main.js     tema, menu, abas do hero e envio do formulário
assets/img/           favicon e imagem de compartilhamento (Open Graph)
```

## Rodar localmente

```powershell
python -m http.server 8099
```

Depois abra <http://127.0.0.1:8099>. Servidor é necessário porque o `fetch` do formulário e
o `manifest` não funcionam via `file://`.

## Onde mexer

| O quê | Onde |
|---|---|
| Telefone, e-mail, chave do formulário | `assets/js/config.js` |
| Cores dos dois temas | topo de `assets/css/styles.css` (`:root` e os blocos de tema escuro) |
| Campo de gradiente do topo | variável `--field` em `assets/css/styles.css` (uma versão por tema) |
| Textos, serviços, FAQ, projetos | `index.html` |
| Telas do case ADACI | seção `#pratica` do `index.html` (SVG e HTML, sem imagens) |

### A seção "Como fica na prática"

Três telas do sistema desenvolvido para a **ADACI** (assessoria em cidadania e vistos),
desenhadas em HTML, CSS e SVG — sem imagem e sem biblioteca:

1. **Árvore genealógica** com a linha de transmissão da cidadania sendo traçada
2. **Esteira do processo**, com etapa travada por requisito não cumprido
3. **Consulta de consulado competente** por unidade federativa

Os dados são fictícios e a página diz isso explicitamente; o código do cliente é privado.
A animação de entrada roda uma vez, por `IntersectionObserver`, e só nesses três blocos —
sem JavaScript ou com `prefers-reduced-motion`, tudo aparece direto, já no estado final.

Os valores de contato também estão escritos direto no `index.html` como fallback, para que os
links continuem certos mesmo se o JavaScript não carregar. Ao trocar o número ou o e-mail,
atualize os dois lugares (`config.js` e os `href` correspondentes no HTML).

### Ativar o formulário de contato

1. Crie uma access key gratuita em <https://web3forms.com> usando **gemstecnologia@gmail.com**.
2. Cole a chave em `web3formsKey`, no `assets/js/config.js`.
3. Commit e push.

Enquanto a chave estiver vazia, o formulário orienta o visitante a usar o WhatsApp ou o e-mail —
a página nunca fica sem um canal de contato funcionando.

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

- **Acessibilidade e SEO**: Lighthouse em 100 (acessibilidade, boas práticas, SEO). Ao mexer em
  cor, manter contraste mínimo de 4.5:1 para texto — o dourado claro (`--brass`) é só para
  filetes, ícones e numerais; texto e link usam `--brass-ink`.
- **Dados estruturados**: o JSON-LD no fim do `index.html` descreve a empresa, a pessoa e o FAQ.
  Ao editar uma pergunta do FAQ, edite também a entrada correspondente lá.
- **Imagem de compartilhamento**: `assets/img/og-cover.png` (1200×630). Se a headline mudar,
  vale regerar.
