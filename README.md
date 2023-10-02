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
            |- /modals
            |- /screens
            |- /utils
```

- */public* possui as dependencias de imagens estaticas do sistema
- */app* possui e define as rotas
- */components* possui os componentes do sistema, e os divide entre componentes/sections do site e do sistema

### Estrutura de /componentes
Para organizar os diversos arquivos de componentes existentes, utilizou está arquitetura para a pasta de components. Vamos dar maior enfoque no sistema, que demanda organização mais complexa.
```bash
- /components
    |- /site
    |- /sistema
        |- /inputs
        |- /modals
        |- /screens
        |- /utils
```
- */inputs* possui os inputs padrões do sistema, como de File, de texto, tipo radio e etc
- */modals* possui os modais dos CRUDs do sistema, devem seguir determinado padrão
- */screens* possui as telas que existem em mais de uma page (rota), faz sentido uma vez que existem muitas rotas (de ciclista, admin e lojista) que devem ter os mesmos conteúdos
- */utils* possui componentes especificos e utilitarios presentes em outros componentes e que não são principais o suficiente para estarem em */components*

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
#### Context API 
Tendo em vista que a relação do sistema com a API Rest se dá atravez da chamada GET para carregar as informações do usuario na página, e nas chamandas POST, DELETE e UPDATE quando algum tipo de formulario é preeenchido, neste projeto, foi criado o context *Api.jsx* que básicamente configura a chamada API Rest padrão do sistema, ele está em um context para que possa ser acessado em varias partes do sistema. Seu uso e lógica está diretamente relacionada a Autenticação do sistema também
```JavaScript
const instance = axios.create({
    baseURL: 'https://bikemobi.com.br/api',
    headers: {
        Accept : "application/json",
        "Content-Type": "application/json"
    },
});
```
Basicamente aqui, definimos a baseURL, que será concatenada com toda url que for passada no *instance*, que por sinal, será passada da mesma forma com que se passa o axios. Optou-se por utilizar um .env para adicionar a url, e chama-la desta forma, a sintaxe no **.env.local** fica:
```env
https://bikemobi.com.br/api=http://127.0.0.1:8000/api
```
- Vale destacar, que o nome .env.local e a sintaxe *NEXT_PUBLIC* são padrões do Next.js, os quais sem eles não funciona. O NEXT_PUBLIC indica que o sistema consegue ter acesso a informação.

O header definido na instancia também serve para garantir a comunicação adequada com a API, para que ela só procure as dependencias *.json* para fazer as requisições ( indicação do pessoal da Adapti que fez o Back-end ).
</br>
Ainda no *headers*, de inicio ele fica apenas assim como no sódigo acima, porem, depois de conseguir o token, para fazer as requisições JWT precisamos enviar o token no headers também, para isso, inserimos ele quando conseguimos o token da seguinte forma:

- O *Bearer* é o padrão do Bask-end (JWT)

```JavaScript
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
```
### Autenticação
O fluxo de autenticação possui varias partes, suas principais lógicas estão no context **Auth.jsx**.
#### signIn()
Seguindo o fluxo de autenticação, a primeira função é esta.
- A primeria coisa que faz é set isLoading true, que é usado para fazer a animação de loading no botão de login quando o usuario clica nele, pois existe um tempo entre ele clicar e a requisição ser feita, então apra que ele não fique clicando e enviando requisições desnecessarias, quando o usuario clina no boatão ele é desabilitado e exibe a animação de login, que dura alguns segundos.
- É utilizado o **instance**, configurado anteriormente, para passar a requisição, enviando o email e senha e recebendo o token de autenticação.
- O token é setado no sistema e no navegador ( atravez do setCookie(), o nome do cookie no navegador é importante ).
- Em seguida e chama a função verifyToken, passando o token coletado.
- Caso a requisição der errado, é parado o loading do botão de login, esetado um erro que será exibido atravez do componente de alerta.
```JavaScript
async function signIn(email, password) {
    
    setIsLoading(true)

    try {
        const auth = await instance.post(`/login`, {
            email: email,
            password: password
        })

        setToken(auth.data.access_token)
        
        if (auth) {
            setCookie(null, 'bikeMobiToken', auth.data.access_token, {
                maxAge: 60 * 60 * 24 * 30 * 3, // 3 meses
                path: '/'
            })
        }

        verifyToken(auth.data.access_token)
    } catch (error) {
        setError({ message: 'Email ou Senha Incorretos' })
        setIsLoading(false)
    }
}
```

#### verifyToken()
A função verifyToken é chamada quando já possuimos o token, que pode ser o caso de termos acabado de logar o usuario, ou quando entramos na rota com o token já no navegador.
- O primeiro passo vai ser adicionar o token existente ao *headers* do *instance*.
- Em seguida é feita a requisição das informações do usuario, que é um passo importante, pois é delas (authData), que conseguimos saber qual é o tipo que usuarioq ue está logando no sistema, e a quais respectivas rotas ele possui acesso.
- Em seguida, a requisição dando certo ou não, irá chamar a função userManagement, que é repsonsavel por gerneciar onde cada tipode usuario pode ou não ficar.
```JavaScript
async function verifyToken(token, typePage) {

    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

    try {
        await instance.get(`/user`).then(resp => {
            setAuthData(resp.data)
            userMenagement(token, resp.data, typePage)
        })
    } catch (error) {
        userMenagement(token, false, typePage)
    }
}
```

#### userManagement()
Caso tenha dado certo a requisição feita no verifyToken ira gerenciar para onde mandar e manter o usuario, para que um ciclista não consiga acessar as rotas do lojsita por exemplo. Caso a requisição tenha dado errado, o userManagement enviará o usuario de volta para a tela de login.
- A função primeiro vai conferir o token, caso não o encontre, redireciona o usuario para a tela de login.
- Caso encontre o token, agora irá analisar qual tipo de usuario é. Caso, seja um usuario admin ( no back-end o usuario ser admin e seu type não estão relacionados). ele é redirecionado a rota inicial de admin. É importante destacar que esse redirecionamente acontece toda vez que for atualizado o layout, ou seja, apenas caso o usuario coloque uma url que está fora do seu diretorio de acesso ou quando ele faz o login.
- Em seguida, confere o type para ver se é do tipo lógista e depois se é do tipo ciclista. Com raciocino analogo.
- Também seta-se o useState() directory, para utilizar esta variavel na sidebar, para que os ususarios sejam sempre redirecionados para os links dos seus diretorios correspondentes.
- Vale ressaltar que é salvo o *routeDestiny*, que é o destino, para onde o *router* envia o usuario, ele serve para que possa verificar se a rota destino é igual a rota do navegador, para que apenas nesse caso, o *valid* seja verdadeiro e deixe o layput randerizar o conteúdo. Isso serve para que enquanto o usuario está sendo rediereciona, ele não tenha acesso a rota a qual ele não pode ver, mesmo que pr alguns segundos.
```JavaScript
function userMenagement(token, authData, typePage) {

    const type = authData.type
    let routeDestiny

    if (!token) {
        router.push('/autenticacao/login')
    } else {
        if (authData.is_admin) {

            setDirectory('admin')
            routeDestiny = '/sistema/admin/dashboard' // rota inicial Admin
            

        } else if (type == 'Shopkeeper') {

            setDirectory('loja')
            routeDestiny = '/sistema/loja/dashboard' // rota inicial Lojista

        } else if (type == 'Cyclist') {

            setDirectory('ciclista')
            routeDestiny = '/sistema/ciclista/dashboard' // rota inicial Ciclista
            
        }

        if (typePage != type) {
            router.push(routeDestiny)
        }
    }

    if (routeDestiny == path || typePage == type) {
        setValid(true)
    }
}
```

#### signOut()
A função signOut é simples, caso o usuario queira deslogar do sistema, ela apenas reseta as variaveis do sistema e apaga o token do usuario, para em seguida envia-lo para página de login.
```JavaScript
function signOut() {
    destroyCookie(null, 'bikeMobiToken', {
        path: '/'
    })
    setAuthData(undefined)
    router.push('autenticacao/login')
}
```

#### Layout
Como já dito antes, as funções são chamadas nas páginas, e o layout vai sempre que for atualizado( roda o useEffect() ) conferir as rotas do usuario. Aqui possui um exemplo de layout:
- É importante ressaltar o **valid** que só permite mostras as informações de dentro do diretorio quando for validado na função *userManagement*
```JavaScript
const CiclistaLayout = ({ children }) => {

    const { verifyToken, valid } = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()

    useEffect(() => {
        async function verify() {
            await verifyToken(token, 'Cyclist')
        }
        verify()
    }, [])
    
    return (
        <div>
            {valid ? children : <LoadingComponent />}
        </div>
    )
}

export default CiclistaLayout
```

### defineType()
Está função segue a seguinte lógica: Ao registrar um novo usuario, este deve preencher um formulario de cadastro, e este respectivo formulario muda dependendo do tipo de conta que se deseja criar, sendo assim, criou-se uma rota de **pre-cadastro** onde o usuario diz qual tipo de conta ele deseja criar. Este *type* é setado globalmente no *Auth.jsx* e é chamado na page de cadastro, e de acordo com o *type* escolhido mostra um formulario diferente para que o usuario o preencha.
```JavaScript
function defineType(selected) {
    if (selected == 'Ciclista') {
        setTypeRegister('Cyclist')
        router.push('/autenticacao/cadastro')
    } else if (selected == 'Lojista') {
        setTypeRegister('Shopkeeper')
        router.push('/autenticacao/cadastro')
    } else {
        setError({ message: 'Selecione um dos Tipos abaixo' })
    }
}
```

### newUser()
A função newUser basicamente vai receber as informações definidas no formulario e vai envia-las para o back-end, caso este fluxo seja efetuado corretamente, será exibido um modal de confirmação de criação da conta, caso contrario um modal de aviso de algum erro na criação desta.
```JavaScript

```

### Utilizando fake API
Para o desenvolvimento sem a utilizaçao do back-end, cria-se respostas "fakes" na pasta */service* em *fakeApi*, sendo assim, no Auth.jsx agora possui seções que indicam o que deve ser comentado para que funcione a API Oficial ou para a API fake.
</br>
Quando estiver utilizando as respostas fakes, o funcionamento funciona normal, porem deve-se olhar em */service* as informações de login e senha respectivas.

### Formulario (Form Perfil)
Referente aos formulario, eles devem seguir a estrutura já explicitada acima referente a parete *inputs*, Porem aqui será axplicado mais detalhadamente algumas lógicas presentes no Formulario De Perfil do Ciclista como um exemplo. Vale lembrar que este e outros tipos de form, neste sistema, foram feitos pensando em sua utilização tanto para os métodos CREATE, quanto para UPDATE e READ (neste exemplo especifico, o READ que deveria implicar no form com os inputs desabilitados não existe, por conta da natureza deste formulario).

```JavaScript
<FormCiclista register={} data={} onClick={} />
```

#### Data
Este compononent deve receber o atravez do *props* o data, que é são as informações do elemento, e que devem serem utilizados para preencher os inputs. Importante tratar nos inputs utilizando o **data?.** para que caso não exista o **data** não dê erro. A estrutura fica desta forma:
```JavaScript
const data = props.data

<TextInput name="Nome"
    value={data?.name}
/>
```

#### HidePass & Submit
Estas variaveis são setadas de acordo com o tipo do formulario, onde o formulario se locatiza(neste caso, ou em *registre-se* ou em *perfil*).
- Caso ese componente de form esteja no **registre-se**, não deve mostrar os campos de senha (hidePass) e o botão deve possuir conteúdos diferentes:
```JavaScript
let hidePass, submit
if (props.register) {
    hidePass = 'flex'
    submit = 'Criar Conta'
} else {
    hidePass = 'hidden'
    submit = 'Atualizar'
}
```

#### AutoComplete via Cep (API)
Neste formulario está presente a feature de auto-completar as informações de endereço do usuario atravez do **cep** digitado. Para tal é utilizado a api **viaCep**, que passa o cep na *url* e responde algumas informações.
</br>
Essas informações são setadas e são passadas como value em alguns inputs. Caso o data seja passado, não tem por que este autocomplete funcionar.

```JavaScript
useEffect(() => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then(resp => {
            setBairro(resp.data.bairro)
            setRua(resp.data.logradouro)
            setCidade(resp.data.localidade)
            setEstado(resp.data.uf)
        })
        .catch(error => console.log(error))
}, [cep])

<TextInput name="Rua"
    value={rua ? rua : data?.address.street}
/>
```

#### Submit
Para o button de submit, é passado a propriedade *onClick* dentro do proprio onClick, passando o array de informações coletadas. Desta forma, a função passada as props da função, que deve receber os dados e fazer a requisição a API é chamada no clique do botão e executa a requisição. No componente de formulario fica desta forma:
```JavaScript
let newData = {
    name: nome,
    email: email,
    password: senha,
    password_confirmation: confirmaSenha,
    cpf: cpf,
    rg: rg,
    birthday: date,
    phone: celular,
    blood: sangue,
    sexo: sexo,
    type: props?.type,
    address: {
        street: rua,
        number: numero,
        neighborhood: bairro,
        city: cidade,
        state: estado,
        cep: cep
    }
}

<button onClick={() => props.onClick(newData)}>{submit}</button>
```