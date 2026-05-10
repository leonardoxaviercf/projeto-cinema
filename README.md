# CineReact - Sistema de Filmes e Séries

Sistema web desenvolvido em **React** para consulta de filmes, séries, elenco, imagens, pôsteres, recomendações e informações detalhadas, consumindo dados diretamente da **TMDb API**.

O projeto foi construído com foco em praticar consumo de API, componentização, rotas dinâmicas, organização de páginas, estados de carregamento, tratamento de erros e criação de uma interface responsiva para navegação entre filmes, séries e pessoas do elenco.

---

## Funcionalidades

- Página inicial com destaque cinematográfico
- Listagem de filmes populares
- Listagem de séries populares
- Página de filmes por categoria
- Página de séries por categoria
- Filtros com estado ativo
- Detalhes completos de filmes
- Detalhes completos de séries
- Exibição de elenco principal
- Página individual para pessoas do elenco
- Busca por filmes e séries
- Exibição de pôsteres e imagens
- Recomendações relacionadas
- Paginação nas listagens
- Skeleton loading durante o carregamento
- Cards com selo de mídia e nota visual
- Interface responsiva

---

## Tecnologias utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Axios
- TMDb API
- HTML5
- CSS3

---

## Estrutura do projeto

```txt
src/
├── api/
│   └── tmdb.js
├── components/
│   ├── LoadingGrid.jsx
│   ├── MovieCard.jsx
│   └── NavBar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Movies.jsx
│   ├── Series.jsx
│   ├── MovieDetails.jsx
│   ├── TvDetails.jsx
│   ├── Search.jsx
│   └── PersonDetails.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## Páginas do sistema

| Página | Descrição |
|---|---|
| Home | Exibe um destaque principal, filmes populares e séries populares |
| Filmes | Lista filmes por categorias, com paginação |
| Séries | Lista séries por categorias, com paginação |
| Detalhes do filme | Mostra informações completas, elenco, imagens e recomendações |
| Detalhes da série | Mostra informações completas, temporadas, elenco, imagens e recomendações |
| Buscar | Permite pesquisar filmes e séries |
| Pessoa | Exibe informações sobre atores, atrizes e demais pessoas do elenco |

---

## Categorias de filmes

A página de filmes permite visualizar:

- Filmes populares
- Filmes em cartaz
- Filmes mais bem avaliados
- Próximos lançamentos

---

## Categorias de séries

A página de séries permite visualizar:

- Séries populares
- Séries exibidas hoje
- Séries no ar
- Séries mais bem avaliadas

---

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/leonardoxaviercf/projeto-cinema.git
```

### 2. Acesse a pasta do projeto

```bash
cd projeto-cinema
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure as variáveis de ambiente

Crie um arquivo chamado `.env` na raiz do projeto:

```env
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
VITE_TMDB_TOKEN=SEU_TOKEN_DA_TMDB_AQUI
```

Para obter o token, é necessário criar uma conta no site da TMDb e gerar uma chave de API.

---

## Executando em modo de desenvolvimento

```bash
npm run dev
```

Depois, acesse no navegador:

```txt
http://localhost:5173
```

---

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

---

## Rotas principais

| Rota | Função |
|---|---|
| `/` | Página inicial |
| `/filmes` | Listagem de filmes |
| `/series` | Listagem de séries |
| `/filme/:id` | Detalhes de um filme |
| `/serie/:id` | Detalhes de uma série |
| `/buscar` | Busca de filmes e séries |
| `/pessoa/:id` | Detalhes de uma pessoa do elenco |

---

## Consumo da API

A comunicação com a TMDb API foi centralizada no arquivo:

```txt
src/api/tmdb.js
```

Esse arquivo configura o Axios com a URL base da API e o token de autenticação.

Também foi criada uma função auxiliar para montar URLs de imagens:

```js
export const imageUrl = (path, size = "w500") => {
  if (!path) {
    return "https://via.placeholder.com/500x750?text=Sem+Imagem";
  }

  return `${import.meta.env.VITE_TMDB_IMAGE_URL}/${size}${path}`;
};
```

---

## Principais conceitos praticados

Durante o desenvolvimento deste projeto, foram aplicados conceitos como:

- Componentização em React
- Uso de props
- Hooks `useState` e `useEffect`
- Rotas com React Router DOM
- Rotas dinâmicas com `useParams`
- Requisições HTTP com Axios
- Consumo de API externa
- Renderização condicional
- Tratamento de carregamento e erros
- Skeleton loading
- Organização de pastas
- Uso de variáveis de ambiente
- Estilização com CSS
- Responsividade
- Reutilização de componentes

---

## Segurança

O token da TMDb é utilizado por meio de variáveis de ambiente. Para evitar que informações sensíveis sejam enviadas ao GitHub, o arquivo `.env` deve estar listado no `.gitignore`.

Exemplo:

```gitignore
.env
node_modules
dist
```

---

## Possíveis melhorias futuras

- Adicionar trailers dos filmes e séries
- Criar sistema de favoritos com LocalStorage
- Adicionar filtros por gênero
- Criar página de detalhes de temporadas
- Criar modo claro e escuro
- Adicionar autenticação de usuário
- Criar backend próprio para proteger o token da API
- Melhorar o placeholder de imagens ausentes
- Adicionar testes automatizados

---

## Status do projeto

Projeto funcional com as principais funcionalidades de consulta, listagem, busca, detalhes e recomendações implementadas.

---

## Autor

Desenvolvido por **Leonardo Xavier**.

---

## Créditos

Este produto utiliza a API da TMDb, mas não é certificado nem endossado pela TMDb.

Dados e imagens fornecidos por:

- The Movie Database API
