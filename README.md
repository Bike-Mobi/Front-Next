This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Documentation

## Dependencias

- Tailwind.css - v3.3.1 - https://tailwindcss.com/
- HeroIcons - v2.0.17 - https://heroicons.com/

## Arquitetura do projeto

```bash
- /public
- /src
    |- /app
        |- /(site)
        |- /sistema
    |- /components   
        |- /site
        |- /sistema
```

- */public* possui as dependencias de imagens estaticas do sistema
- */app* possui e define as rotas
- */components* possui os componentes do sistema, e os divide entre componentes/sections do site e do sistema

### Estilização
Como o padrão de estilização deste projeto é feito com tailwind, os temas de cores do projeto estão no arquivo **tailwind.config.js**

### Esquema de Rotas
Como este é um projeto em Next.js na versão 13, seu esquema de rotas funciona com as rotas sendo as pastas dentro de **/src/app**, sendo assim, para por exemplo termos a rota /dashboard, deve-se criar a rota /dashboard dentro de /app e dentro da pasta dashboard criar o arquivo **page.jsx**, que equivale a rota da pasta.

#### Layout
Dentro da mesma pasta de exemplo que utilizamos como **/dashboard**, temos o Layout, que ao criarmos o arquivo **layout.jsx**, onde este layout criado, que **deve possuir um elemento filho dentro**, temos um Layout que não será renderizado toda vez que for tracado de rota, caso esta rota, esteja utiizando deste mesmo layout(dentro da mesma pasta). Um ponto importante, é que os layouts de uma pasta são concatenados com os Layouts de suas subpastas.
<br>
Exemplo:
```bash
- /app
    |- /sistema
        |- layout.jsx
        |- /dashboard
            |- page.jsx
            |- layout.jsx
```

#### Head
Um raciocino analogo é o do arquivo **head.jsx**, que, permite inclusões de *links*, *title*, *metas* e etcs, dentro de das pastas, rotas e subrotas.

### Chamada da API
#### GET 
Tendo em vista que a relação do sistema com a API Rest se dá atravez da chamada GET para carregar as informações do usuario na página, e nas chamandas POST, DELETE e UPDATE quando algum tipo de formulario é preeenchido, neste projeto, as chamadas GET devem estar, no Layout.jsx da página, dentro de um useEffect(), tal qual no exemplo abaixo:

```js
```