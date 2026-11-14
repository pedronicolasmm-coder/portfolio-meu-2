# Portfólio do Pedro Munareto · versão 2

Site: https://pedronicolasmm-coder.github.io/portfolio-meu-2/

Mesmo conteúdo do [portfólio principal](https://pedronicolasmm-coder.github.io/portfolio-principal/), com outro visual: capa clara com "portfólio" gigante, sumário numerado de 01 a 05, divisores laranja e uma página escura para cada projeto (serviços, segmento, ano, sobre o projeto e resultado).

## Arquivos

- `index.html`: todo o texto do site.
- `estilo.css`: cores e fontes nas variáveis do começo (`--laranja`, `--escuro`, `--fundo`). Fontes: Inter Tight e Newsreader.
- `dados.js`: as artes de cada cliente (`OBRAS`), os carrosséis completos (`PANORAMAS`), a campanha da FASA (`CAMPANHA`) e o perfil do Instagram que aparece em cada celular (`PERFIS`). É o mesmo arquivo do portfólio principal.
- `app.js`: monta os celulares, os posts e stories com a moldura do Instagram, os carrosséis, a campanha e o visualizador.
- `img/`: `t/` miniaturas, `obras/` artes grandes, `perfil/` fotos de perfil, `fundo/` fotos atrás dos celulares, `res/` prints de resultado, `sites/` telas dos sites.

## Como mudar

- **Tirar ou pôr uma arte:** edite `dados.js`. A arte precisa existir em `img/t/<id>.jpg` e `img/obras/<id>.jpg`.
- **Usar uma foto sua no cartão de abertura:** salve como `img/pedro.jpg` e siga o comentário no `index.html` (procure por `foto-pedro`).
- **Depois de mudar CSS ou JS:** suba o número do `?v=` no `index.html` (`estilo.css?v=1`, `app.js?v=1`) para o navegador não usar a versão velha.

O site sempre abre no topo, mesmo se o link tiver `#`.
