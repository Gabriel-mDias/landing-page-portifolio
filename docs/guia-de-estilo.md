# Guia de estilo

## Direção visual

Uma identidade editorial e acolhedora: preto profundo, superfícies discretas e dourado como acento, com bastante espaço para texto e composições desenhadas em CSS. As demonstrações de segmentos são protótipos conceituais, claramente contextualizados.

## Cores

| Uso | Tema claro | Tema escuro |
|---|---|---|
| Fundo | `#F6F4EF` | `#0A0A0A` |
| Superfície | `#FFFEFA` | `#151515` |
| Superfície secundária | `#EEECE6` | `#1C1C1C` |
| Texto | `#24231F` | `#F2F0EA` |
| Texto de apoio | `#68665F` | `#B5B1A7` |
| Dourado | `#8A6425` | `#C6A15B` |

O dourado claro é usado como acento no tema escuro. Em superfícies claras, `#8A6425` é utilizado em texto e links; dourados mais luminosos ficam reservados a detalhes não textuais.

## Tipografia

- Títulos: Cormorant Garamond, arquivos locais sob SIL Open Font License.
- Textos e interface: Plus Jakarta Sans, arquivos locais sob SIL Open Font License.
- Fallbacks: Georgia e Arial/sans-serif.

Os arquivos e licenças estão em `assets/fonts/`; detalhes de origem em `ativos-e-licencas.md`.

## Responsividade e interação

- A página começa pelo layout de celular e amplia para tablets e desktop.
- Links e botões têm áreas mínimas de 44 px nas navegações e controles principais.
- `<details>` mantém o FAQ disponível sem JavaScript.
- Demonstrações usam um único `<dialog>` nativo, com conteúdo local em templates.
- Animações respeitam `prefers-reduced-motion`; contraste, foco visível e hierarquia semântica devem ser preservados ao alterar estilos.
## Aplicação

O corpo usa 16px como escala base; textos de leitura contínua não ficam abaixo de 16px, e controles ficam em 14px ou mais. A paleta preserva papel, tinta e dourado da identidade. Foco é indicado por contorno dourado; sob `prefers-reduced-motion`, vídeo e animações são desativados e a hero exibe o pôster local.

Na Clínica Virtual de `/recursos/`, a identificação fictícia deve permanecer visível junto às simulações e aos perfis. Retratos usam enquadramento consistente e fundo escuro; degradês servem apenas ao contraste localizado e não devem apagar rosto, ombros ou bordas da fotografia. Comparadores nunca devem ser descritos como documentação clínica ou promessa de resultado.
