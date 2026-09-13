# Guia de Estilo e Identidade Visual — G&Ms Soluções Tecnológicas

Este documento resume a identidade visual, tokens de design e diretrizes de acessibilidade aplicadas na landing page.

---

## 1. Paleta de Cores e Temas

A identidade visual da G&Ms é ancorada no **Navy Oficial (`#172C3B`)** e nos tons do **Gradiente Dourado da Marca (`#C19059` → `#9C7449` → `#926E47`)**, com superfícies de papel off-white e vidro acetinado (*glassmorphism*).

### Cores Principais

| Token | Valor (Claro) | Valor (Escuro) | Uso Recomendado |
|---|---|---|---|
| `--paper` | `#F8F7F4` | `#0C1A24` | Fundo principal da página |
| `--surface` | `#EFEDE8` | `#12252F` | Fundo de faixas e containers secundários |
| `--raised` | `#FFFFFF` | `#17303D` | Superfície elevada para cards e painéis |
| `--line` | `#E1DED6` | `#1E3543` | Bordas e divisores sutis |
| `--ink` | `#172C3B` | `#E9F0F5` | Texto principal e títulos com alto contraste |
| `--muted` | `#5C6B78` | `#93A5B3` | Textos de apoio e legendas |
| `--gold` | `#9C7449` | `#C19059` | Destaques gráficos, ícones e filetes |
| `--gold-ink` | `#7E5E3A` | `#D2A874` | Texto e links em dourado com contraste mínimo de 5:1 (WCAG AA/AAA) |
| `--gold-wash` | `#F3EADC` | `#1B3240` | Fundo suave para chips e badges |

### Contraste e Acessibilidade (WCAG)
- O tom médio do dourado (`--gold: #9C7449`) possui contraste de ~3.9:1 sobre o fundo claro, sendo reservado estritamente para **elementos gráficos, ícones e bordas**.
- Todo texto que precise de tonalidade dourada utiliza obrigatoriamente a variável `--gold-ink` (`#7E5E3A`), garantindo contraste superior a **5.0:1** sobre qualquer superfície.

---

## 2. Tipografia

- **Títulos e Display**: `Outfit`, geométrica, moderna e aproximada do desenho técnico do wordmark da G&Ms.
- **Corpo e Leitura**: `IBM Plex Sans`, fonte com excelente legibilidade e padrão de engenharia corporativa.
- **Trechos de Código / Metadados**: Monospace nativo (`ui-monospace`, `Menlo`, `Consolas`).

---

## 3. Glassmorphism e Elevação

Para manter a estética visual sofisticada:
- A classe `.glass` combina gradientes translúcidos com `backdrop-filter: blur(20px) saturate(1.3)` e bordas finas com tint branco (`--glass-line`).
- O gradiente de fundo `--field` é projetado com máscaras graduais para iluminar suavemente o topo da página sem prejudicar a leitura do texto.
- Elementos interativos utilizam a propriedade `box-shadow: var(--lift)` com transições suaves (`var(--t-base)`).

---

## 4. Ícones

Todos os ícones são da biblioteca **Font Awesome Free 6.7.2** (sob licença CC BY 4.0), embutidos diretamente no sprite SVG do `index.html`.
- Herdam a cor do contexto via `currentColor`.
- Não dependem de CDNs externas ou scripts de terceiros, garantindo velocidade máxima e privacidade.
