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
- Daisy UI - v2.51.6 - https://daisyui.com/
- react-input-mask - v3.0 - https://github.com/sanniassin/react-input-mask
- Axios - v1.4.0 - https://axios-http.com/ptbr/docs/intro

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
            |- /inputs
```

- */public* possui as dependencias de imagens estaticas do sistema
- */app* possui e define as rotas
- */components* possui os componentes do sistema, e os divide entre componentes/sections do site e do sistema

### Estilização
Como o padrão de estilização deste projeto é feito com tailwind, os temas de cores do projeto estão no arquivo **tailwind.config.js**.
</br>

Para auxilizar, também é utilizado o a lib **Daisy UI**, que é um pluguin para tailwind. É importante se atentar as dependencias do Daisy UI, que são basicamente as configurações de themas feitas no arquivo *tailwind.config.js* e a adição do: **plugins: [require("daisyui")]**.

#### Inputs
Os inputs utilizados nos Formularios e CRUDs do sistema estão em **/components/sistema/inputs**.
</br>
Estes componentes estão divididos pelos tipos de input, e para utiliza-los é só chama-los. Eles possuiem propriedades que em geral são: className, name, required, onChange...
</br>
Vale ressaltar que ao adicionar um novo input, caso seja de um tipo já existente, utilizar o componente já criado, para seguir o padrão do sistema. Alem disso, cada input deve possuir um estrutura com o *Componente Input*, o *useState()* para guardar o valor e a *function()* que vai pegar o valor atravez do onChange().

```JavaScript
const [cpf, setCpf] = useState()

const handleCpf = (e) => setCpf(e.target.value)

<TextInput name="CPF" mask="999.999.999-99" required width="md" onChange={handleCpf} />
``` 

Outro ponto que vale ressaltar é a extensão instalada do **react-input-mask**, que permite o uso de mascaras para os inputs de texto. Por tanto, o componente de *TextInput* utiliza *<ReactInputMask/>* ao inves de um input convencional.

### Formularios
Para o desenvolvimento de formulario, e para que sejam feitas as requisições das APIs para que se faça as funcionalidades de um CRUD deve-se utilizar o Axios. Um bom exemlo é a página de infos do ciclista.

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
Tendo em vista que a relação do sistema com a API Rest se dá atravez da chamada GET para carregar as informações do usuario na página, e nas chamandas POST, DELETE e UPDATE quando algum tipo de formulario é preeenchido, neste projeto, foi criado o context *Api.jsx* que básicamente configura a chamada API Rest padrão do sistema, ele está em um context para que possa ser acessado em varias partes do sistema. Seu uso e lógica está diretamente relacionada a Autenticação do sistema também
```JavaScript
const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACK_END,
    headers: {
        Accept : "application/json",
        "Content-Type": "application/json"
    },
});
```
Basicamente aqui, definimos a baseURL, que será concatenada com toda url que for passada no *instance*, que por sinal, será passada da mesma forma com que se passa o axios. Optou-se por utilizar um .env para adicionar a url, e chama-la desta forma, a sintaxe no **.env.local** fica:
```env
NEXT_PUBLIC_API_BACK_END=http://127.0.0.1:8000/api
```
- Vale destacar, que o nome .env.local e a sintaxe *NEXT_PUBLIC* são padrões do Next.js, os quais sem eles não funciona. O NEXT_PUBLIC indica que o sistema consegue ter acesso a informação.

O header definido na instancia também serve para garantir a comunicação adequada com a API, para que ela só procure as dependencias *.json* para fazer as requisições ( indicação do pessoal da Adapti que fez o Back-end ).
</br>
Ainda no *headers*, de inicio ele fica apenas assim como no sódigo acima, porem, depois de conseguir o token, para fazer as requisições JWT precisamos enviar o token no headers também, para isso, inserimos ele quando conseguimos o token da seguinte forma:

- O *Bearer* é o padrão do Bask-end (JWT)

```JavaScript
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
```
