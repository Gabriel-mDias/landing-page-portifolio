# G&Ms — site institucional

Portfólio estático de G&Ms Soluções Tecnológicas, publicado em [gems.tec.br](https://gems.tec.br) pelo GitHub Pages.

## Sobre o site

A página apresenta três frentes com o mesmo peso: landing pages e presença digital, consultoria em TI e sistemas personalizados. A rota `/recursos/` reúne recortes interativos de projetos identificados, começando pelo comparador de sorrisos e pelo corpo clínico com perfis completos do Centro Odontomédico. A experiência também inclui demonstrações conceituais por segmento, formulário Web3Forms e alternativas de contato por WhatsApp e e-mail.

O site usa HTML semântico, CSS modular e JavaScript ES Modules nativos. Não há etapa de build ou framework. O conteúdo principal permanece legível sem JavaScript; as demonstrações e controles avançados são aprimoramentos interativos.

## Executar localmente

Na pasta deste projeto:

```powershell
python -m http.server 8099
```

Acesse `http://127.0.0.1:8099`. Um servidor HTTP local é necessário para os módulos ES e o envio do formulário.

## Estrutura

- `index.html`: conteúdo, metadados, JSON-LD e templates das demonstrações.
- `assets/css/styles.css`: entrada CSS; importa `premium.css`.
- `assets/js/main.js`: inicializa os módulos independentes.
- `recursos/index.html`, `assets/css/recursos.css` e `assets/js/recursos.js`: rota e direção visual próprias da vitrine de recursos.
- `assets/data/professionals.json`: conteúdo local dos perfis apresentados na vitrine.
- `assets/js/config.js`: fonte única dos dados de contato e chave Web3Forms.
- `assets/fonts/`: fontes locais e suas licenças OFL.
- `docs/arquitetura.md`: módulos, integrações e contratos de interface.
- `docs/guia-de-estilo.md`: paleta, tipografia e diretrizes de acessibilidade.
- `docs/ativos-e-licencas.md`: inventário de ativos e licenças.

## Integrações

Google Analytics mantém o identificador existente. O formulário usa a chave pública Web3Forms definida em `assets/js/config.js`. Se o serviço estiver indisponível, a página mantém acesso direto a WhatsApp e e-mail.

## Publicação

O domínio customizado permanece em `CNAME`; a publicação segue estática no GitHub Pages. Não é necessário compilar ou gerar `dist/`.
