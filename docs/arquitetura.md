# Arquitetura

## Forma de publicação

O site é estático e publicado diretamente no GitHub Pages. HTML semântico, CSS e módulos JavaScript são servidos sem ferramenta de build, framework ou etapa de compilação.

## Mapa dos arquivos

- `index.html` contém o conteúdo, metadados, JSON-LD, formulário e três elementos `<template>` com demonstrações locais.
- `assets/css/styles.css` é a entrada da folha de estilos e importa `premium.css`.
- `assets/css/premium.css` contém tokens, tipografia, componentes e regras responsivas do redesign.
- `assets/js/config.js` define `window.GEMS_CONFIG`, fonte única dos contatos e da chave do formulário.
- `assets/js/main.js` inicializa os módulos em `assets/js/modules/`.
- `assets/fonts/` hospeda fontes e licenças localmente.

## Módulos JavaScript

| Módulo | Responsabilidade |
|---|---|
| `theme.js` | Inicializa pelo tema manual guardado; sem escolha, acompanha o sistema. Atualiza o tema manualmente e persiste a escolha. |
| `navigation.js` | Cabeçalho ao rolar e menu móvel com fechamento por Escape, clique em link e clique externo. |
| `scroll-reveal.js` | Revela elementos `.reveal` com IntersectionObserver e mostra todos sob `prefers-reduced-motion`. |
| `contact-form.js` | Preenche canais a partir de `GEMS_CONFIG` e envia o formulário via Web3Forms, com retorno por WhatsApp/e-mail. |
| `audience-dialog.js` | Preenche um `<dialog>` único com os templates setoriais; gerencia tamanho da demonstração, Escape, backdrop e foco. |
| `project-navigation.js` | Avança e retrocede entre estudos de caso e atualiza o indicador de posição. |
| `comparison.js` | Controla o comparador de resultados e suas abas, inclusive setas, Home/End, toque e mouse. |
| `resource-carousel.js` | Navega o corpo clínico com botões, teclado, arraste e paginação reconstruída após filtros. |
| `professional-showcase.js` | Carrega o catálogo local, aplica filtros e abre a modal lateral individual de cada profissional. |

## Contratos de interface

- `[data-audience]` abre uma demonstração e aponta para `#audience-dialog` por `aria-controls`.
- `[data-preview-size="mobile|desktop"]` define a largura da demonstração; `aria-pressed` acompanha a escolha.
- `window.GEMS_CONFIG` é a fonte única de telefone, e-mail e chave Web3Forms.
- Os links de contato têm URLs de fallback no HTML, antes da inicialização JavaScript.
- Os templates setoriais da home são conceituais. Em `/recursos/`, cada recorte real identifica explicitamente o projeto de origem e mantém seus avisos de contexto.

## Tema e movimento

Uma pequena rotina no `<head>` aplica o tema salvo ou a preferência do sistema antes da pintura. `theme.js` mantém o estado do controle. Transições são desativadas sob `prefers-reduced-motion`.

## Dependências de terceiros

Analytics, Web3Forms e os serviços de WhatsApp/e-mail são integrações externas. Fontes, ícones, composições visuais e demonstrações são carregados localmente ou escritos no próprio site. Não há GSAP, Lenis, Google Fonts ou imagens remotas.
## Rota de recursos

O site não requer build. A home (`/`) inicializa `assets/js/main.js`; a vitrine (`/recursos/`) inicializa `assets/js/recursos.js` e usa a folha isolada `assets/css/recursos.css` para preservar a linguagem visual do projeto apresentado sem contaminar os componentes da home.

O comparador é um `role="slider"` com `aria-valuenow`, `aria-valuetext`, abas, setas e Home/End. O carrossel usa controles de pelo menos 44px, indicadores com `aria-current`, arraste e setas. Filtros usam `aria-pressed`; a modal usa o elemento nativo `dialog`, devolve o foco ao cartão de origem e bloqueia a rolagem do documento enquanto aberta.
