# Arquitetura Técnica e Modular — G&Ms Soluções Tecnológicas

Este documento descreve as decisões de arquitetura, princípios de **Clean Code** e a organização de pastas implementadas na versão 2 (V2) da landing page da **G&Ms Soluções Tecnológicas**.

---

## 1. Princípios Arquiteturais

A refatoração da landing page buscou resolver o acoplamento excessivo do código monolítico original (onde um único arquivo CSS continha mais de 1.100 linhas e um script IIFE continha todas as regras acopladas), mantendo como premissa a **simplicidade operacional** de um site estático de altíssima performance hospedado no GitHub Pages.

### Premissas Adotadas:
- **Zero-Build com Padrões Modernos (Pure ESM & Modular CSS)**: Sem necessidade de dependências pesadas do Node (`node_modules`), mantendo o deploy nativo e instantâneo a partir da branch `main`.
- **Single Responsibility Principle (SRP)**: Cada arquivo CSS e JavaScript possui uma única responsabilidade clara.
- **WAI-ARIA & Acessibilidade Estrita**: Toda a interatividade foi desenhada para funcionar perfeitamente via teclado e leitores de tela.
- **Desempenho & Core Web Vitals**: Zero frameworks pesados em runtime; renderização rápida com carregamento progressivo e SVGs embutidos em sprite para dispensar requisições extras de rede.

---

## 2. Estrutura de Pastas e Módulos

```
├── CNAME                          # Domínio customizado (gems.tec.br)
├── 404.html                       # Página de erro customizada para o GitHub Pages
├── robots.txt                     # Instruções para motores de busca com sitemap
├── sitemap.xml                    # Mapa XML do site para indexação no Google
├── site.webmanifest               # Manifesto de aplicação web / PWA
├── index.html                     # Estrutura semântica principal (V2)
├── README.md                      # Documentação técnica e guia de execução
├── docs/                          # Documentação aprofundada
│   ├── arquitetura.md             # Este documento (visão arquitetural)
│   └── guia-de-estilo.md          # Tokens de design, contrastes e acessibilidade
├── assets/
│   ├── logos/                     # Logomarcas originais (wordmark e símbolo G)
│   ├── img/                       # Favicon e imagem Open Graph (og-cover)
│   ├── css/
│   │   ├── styles.css             # Entrypoint agregador limpo via @import
│   │   ├── tokens/                # Variáveis CSS e Design Tokens
│   │   │   ├── colors.css         # Paleta Navy + Dourado, superfícies e temas
│   │   │   ├── typography.css     # Escalas fluidas, fontes e entrelinhas
│   │   │   └── elevation.css      # Sombras, raios de borda e transições
│   │   ├── base/                  # Regras globais e reset
│   │   │   ├── reset.css          # Reset moderno e acessível
│   │   │   └── global.css         # Tipografia base, tags, badges e vidro
│   │   ├── components/            # Componentes reutilizáveis
│   │   │   ├── buttons.css        # Botões primários, secundários, ghost e ícones
│   │   │   ├── topbar.css         # Header sticky, logotipo e menu responsivo
│   │   │   ├── cards.css          # Cards genéricos e estados de destaque
│   │   │   ├── screens.css        # Telas ilustrativas (ADACI e Meduc) e showcase
│   │   │   ├── timeline.css       # Linha do tempo visual inspirada na Optsolv/Stripe
│   │   │   ├── forms.css          # Formulário de contato acessível
│   │   │   └── footer.css         # Rodapé institucional e links
│   │   └── sections/              # Estilos específicos de cada seção
│   │       ├── hero.css           # Seção Hero com badges e stack de tecnologias
│   │       ├── pilares.css        # Comparativo criativo Antes vs. Depois
│   │       ├── servicos.css       # Landing Pages, Consultoria e ERP Customizado
│   │       ├── processo.css       # Estrutura das 5 etapas
│   │       ├── sobre.css          # Perfil de Gabriel e especificações técnicas
│   │       ├── faq.css            # Acordeões com <details> nativo
│   │       └── contato.css        # Canais de atendimento e nota regional
│   └── js/
│       ├── config.js              # Configurações de contato e chaves públicas
│       ├── main.js                # Entrypoint modular (ES Module)
│       └── modules/               # Módulos JavaScript isolados
│           ├── theme.js           # Alternador de tema claro/escuro com persistência
│           ├── navigation.js      # Menu mobile e cabeçalho sticky
│           ├── showcase-tabs.js   # Abas interativas da vitrine do Hero
│           ├── pillars-toggle.js  # Alternador interativo dos pilares de gestão
│           ├── scroll-reveal.js   # Animações de entrada via IntersectionObserver
│           └── contact-form.js    # Envio de formulário Web3Forms com feedback
```

---

## 3. Módulos JavaScript (ES Modules)

Todos os scripts utilizam padrão ES6 nativo do navegador via `<script type="module" src="assets/js/main.js">`.

### `assets/js/main.js`
Atua como o maestro do ciclo de vida da aplicação. Ele não manipula o DOM diretamente; apenas importa e orquestra a inicialização de cada módulo:
```javascript
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initShowcaseTabs } from './modules/showcase-tabs.js';
import { initPillarsToggle } from './modules/pillars-toggle.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initContactForm } from './modules/contact-form.js';
```

### Detalhamento dos Módulos:

| Módulo | Responsabilidade |
|---|---|
| `theme.js` | Lê o tema ativo (`data-theme`), armazena a preferência em `localStorage` e ouve mudanças no `matchMedia('(prefers-color-scheme: dark)')`. Atualiza o estado acessível `aria-pressed`. |
| `navigation.js` | Detecta rolagem para fixar a barra superior (`.is-stuck`) e controla abertura/fechamento do menu em telas móveis com suporte a tecla `Escape` e clique fora. |
| `showcase-tabs.js` | Controla as abas da vitrine no Hero (`[role="tab"]`), suportando navegação total pelo teclado (`ArrowLeft`, `ArrowRight`, `Home`, `End`). |
| `pillars-toggle.js` | Alterna a exibição entre os cards dos 3 pilares de gestão (**Trabalho**, **Equipe**, **Financeiro**) com transição suave. |
| `scroll-reveal.js` | Aplica o padrão de animação suave quando os elementos `.reveal` entram na viewport, respeitando rigorosamente a preferência `prefers-reduced-motion`. |
| `contact-form.js` | Trata a submissão assíncrona do formulário para a API da **Web3Forms**, lida com honeypot anti-spam (`botcheck`) e provê mensagens amigáveis em `aria-live`. Injeta dados de contato de `config.js`. |

---

## 4. Camada de Estilos (CSS Modular)

O arquivo `assets/css/styles.css` funciona como agregador via `@import`, organizando o carregamento na ordem canônica da cascata:
1. **Tokens**: Definição de variáveis, cores HSL/Hex, contrastes e elevação.
2. **Base**: Reset universal e regras semânticas globais.
3. **Components**: Elementos de interface reutilizáveis independentes de seção (botões, cards, telas de simulação, timeline, forms).
4. **Sections**: Regras estruturais e de espaçamento específicas de cada bloco de conteúdo da página.

### Vantagens Desta Abordagem:
- Qualquer alteração em um componente (ex: botão ou timeline) é feita no arquivo específico daquele componente, sem riscos de efeitos colaterais indesejados no restante da página.
- Leitura imediata por qualquer novo desenvolvedor que precise manter o código.
- Zero ferramentas de compilação obrigatórias para inspecionar e evoluir o projeto.

---

## 5. Como Manter e Estender

- **Alterar dados de contato**: Edite `assets/js/config.js` (WhatsApp, e-mail, chave Web3Forms).
- **Adicionar novo pilar ou serviço**: Adicione a marcação semântica correspondente no `index.html` e utilize as classes prontas `.pillar-card` e `.service-card`.
- **Criar novo módulo interativo**: Crie o arquivo em `assets/js/modules/meu-modulo.js` exportando uma função `initMeuModulo()`, e faça a importação em `assets/js/main.js`.
