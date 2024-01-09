'use client'

import nookies from "nookies"
import { usePathname, useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "./Api";
import { fakeApi } from "@/service/fakeApi";
import axios from "axios";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const { instance } = useContext(ApiContext)

    const [authData, setAuthData] = useState({
        user: undefined, 
        type: undefined,
        bikes: undefined,
        manutencoes: undefined
    })
    // para setar infos globais (do header component)

    const [error, setError] = useState()
    // para mostrar error no alerta

    const [isLoading, setIsLoading] = useState()
    // para gerar loading do LoginButton

    const [directory, setDirectory] = useState()
    // para definir o diretorio das rotas da sidebar

    const [valid, setValid] = useState(false)
    // para não exibir contedos antes de verificar se a rota é valida para tal usuario

    const [stravaStatusUser, setStravaStatusUser] = useState()

    const [typeRegister, setTypeRegister] = useState()

    const router = useRouter() 
    const path = usePathname()

    async function getUserDatas(authUserData, authTypeData){

        const bikes = await instance(`/bicicletas/${authTypeData.id}`)

        let url
        authUserData.type == 'Cyclist' ? url = 'Cyclist' : url = 'Loja'
        const manutencoes = await instance(`/manutencaoFrom${url}/${authTypeData.id}`)

        const meusclassificados = await instance(`/classificadoFromUser/${authUserData.id}`)
        const classificados = await instance(`/allClassificados`)
        
        const messages = await instance(`/messagesFromReceiver/${authUserData.id}`)

        let manutencoespadroes = {data: []}
        if(url == 'Loja'){
            manutencoespadroes = await instance(`/manutencaopadraoFromLoja/${authTypeData.id}`)
        }

        setAuthData({
            user: authUserData, 
            type: authTypeData,
            bikes: bikes.data,
            manutencoes: manutencoes.data,
            manutencoespadroes: manutencoespadroes.data,
            meusclassificados: meusclassificados.data,
            classificados: classificados.data,
            messages: messages.data
        })
    }
    setTimeout(() => console.log('Bazinga',authData), 10000)

    async function verifyToken(token, typePage) {
        setIsLoading(false)

        const { ['bikeMobiToken']: tokenInCookie } = nookies.get()
        if (tokenInCookie == token && authData.user) {
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            console.log('it comes')
            setValid(true)
            return
        }

        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
        // if (token) {
            try {
    
                // -------------------------- Utilizando API Oficial --------------------
                const user = await instance.get(`/user`)
                console.log('user: ', user)
                let type
                if (user.data.type == 'Cyclist') {
                    type = await instance.get(`/ciclistaFromUser/${user.data.id}`)
                } else {
                    type = await instance.get(`/lojaFromUser/${user.data.id}`)
                }
                console.log('type: ', type)
                userMenagement(token, user.data, type.data[0], typePage)
                // -----------------------------------------------------------------------
    
                // --------------------------- Utilizando fake API -----------------------
                // await fakeApi.getInfos(token).then(resp => {
                //     setAuthData({user: resp.data, type: authData.type})
                //     userMenagement(token, resp.data, typePage)
                // })
                // -----------------------------------------------------------------------
    
            } catch (error) {
                return userMenagement(token, false, false, typePage)
            }
        // }
    }

    async function userMenagement(token, authUserData, authTypeData, typePage) {
        
        await getUserDatas(authUserData, authTypeData)
        console.log('authData',authData)
        const type = authUserData.type
        let routeDestiny

        if (!token) {
            router.push('/autenticacao/login')
        } else {
            if (authUserData.is_admin) {
                setDirectory('admin')
            } else if (type == 'Shopkeeper') {
                setDirectory('lojista')
            } else if (type == 'Cyclist') {
                setDirectory('ciclista')
            }

            if (type == 'Shopkeeper') {
                routeDestiny = '/sistema/lojista/dashboard' // rota inicial Lojista
            } else if (type == 'Cyclist') {
                routeDestiny = '/sistema/ciclista/dashboard' // rota inicial Ciclista
            }

            if (path.includes('/autenticacao/login')) {
                router.push(routeDestiny)
            } else {
                // if (path.includes('/sistema/admin') && directory != 'admin') {
                //     router.push(routeDestiny)
                // } else if (path.includes('/sistema/lojista') && directory != 'lojista') {
                //     router.push(routeDestiny)
                // } else if (path.includes('/sistema/ciclista') && directory != 'ciclista') {
                //     router.push(routeDestiny)
                // }
            }
        }
        console.log('type: ',type)
        console.log('routeDestiny: ', routeDestiny)
        console.log('path: ',path)
        if (routeDestiny == path || typePage == type) {
            setValid(true)
        }
        console.log('valid: ', valid)
    }

    async function signIn(email, password) {
        
        setIsLoading(true)

        try {

            // -------------------------- Utilizando API Oficial --------------------
            const auth = await instance.post(`/login`, {
                email: email,
                password: password
            })
            // -----------------------------------------------------------------------

            // --------------------------- Utilizando fake API -----------------------
            // const auth = await fakeApi.logIn(email, password)
            // -----------------------------------------------------------------------
            
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

    function signOut() {
        router.push('autenticacao/login')
        setTimeout(() => {
            destroyCookie(null, 'bikeMobiToken', {
                path: '/'
            })
            setAuthData({ user: undefined, type: undefined })
        }, 1000)
    }

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

    const clientId = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID
    const clientSecret = process.env.NEXT_PUBLIC_STRAVA_SECRET

    const handlerStravaUser = async () => {
        await axios.get(`https://www.strava.com/api/v3/athletes/${authData.user.strava_athlete_id}/stats?`, {
            params: {
                access_token: authData.user.strava_access_token
            }
        }).then(resp => setStravaStatusUser(resp.data))
    }

    const refreshStravaToken = async (refreshToken) => {
        const response = await axios.post('https://www.strava.com/oauth/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken, // salvo no DB em user
                grant_type: 'refresh_token'
            }
        });

        const accessToken = response.data.access_token
        const newRefreshToken = response.data.refresh_token
        const expiresAt = response.data.expires_at;

        saveStravaCredentials(accessToken, newRefreshToken, expiresAt)
    }

    const saveStravaCredentials = async (token, refresh, expiresAt) => {
        // pega o token de acesso e passa na rota para pegar o ID do strava do usuario
        const athleteData = await axios.get('https://www.strava.com/api/v3/athlete', {
            params: {
                access_token: token
            }
        })
        console.log('athleteData', athleteData)

        // salva o id de usuario do strava do usuario no DB como strava_athlete_id, esse ID é importante para passar em outras rotas, como para pegar os dados do atleta
        const formDataUser = new FormData();
        formDataUser.append('strava_athlete_id', athleteData?.data?.id);
        formDataUser.append('strava_access_token', token);
        formDataUser.append('strava_refresh_token', refresh);
        formDataUser.append('strava_expires_at', expiresAt);
        try {
            await instance.postForm(`/users/${authData.user?.id}?_method=PUT`, formDataUser).then(resp => console.log(resp))
            setTimeout(() => {
                router.push(`/sistema/ciclista/dashboard`)
                document.location.reload()
            }, 800);
        } catch (error) {
            console.error(error)
        }
    }

    const verifyStravaToken = async (authData) => {
        console.log(authData)
        const todayUTC = Date.parse(new Date) / 1000
        console.log(todayUTC)
        console.log(authData.user?.strava_expires_at)

        if (authData.user?.strava_expires_at != undefined && authData.user?.strava_expires_at < todayUTC) {
            await refreshStravaToken(authData.user?.strava_refresh_token)
            console.log('fez um refresh do token do strava')
            setTimeout(() => {
                router.push(`/sistema/ciclista/dashboard`)
                document.location.reload()
            }, 800);
        } else {
            console.log('não fez um refresh do token do strava')
        }
    }

    const obterParametroCode = async () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get('code');
      
        try {
            // const code = obterParametroCode();
        
            if (!code) {
                console.error('Não foi possível obter o código da URL.');
                return;
            }
        
            const response = await axios.post('https://www.strava.com/oauth/token', null, {
                params: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: code,
                    grant_type: 'authorization_code'
                }
            });
            console.log(response)
        
            const accessToken = response.data.access_token
            const refreshToken = response.data.refresh_token
            const expiresAt = response.data.expires_at;
            console.log('Access Token:', accessToken);

            saveStravaCredentials(accessToken, refreshToken, expiresAt)

        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    }

    // useEffect(() => {
    //     obterParametroCode()
    // }, [])

    const getStravaToken = async () => {

        const redirectUri = `https://bikemobi.vercel.app/sistema/ciclista/dashboard`; // Substitua pelo seu URI de redirecionamento
        const authUrl = `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=read_all`;
    
        // Redireciona o usuário para a rota de autorização
        window.location.href = authUrl;

        // try {
        //     const code = obterParametroCode();
        
        //     if (!code) {
        //     console.error('Não foi possível obter o código da URL.');
        //     return;
        //     }
        
        //     const response = await axios.post('https://www.strava.com/oauth/token', null, {
        //     params: {
        //         client_id: clientId,
        //         client_secret: clientSecret,
        //         code: code,
        //         grant_type: 'authorization_code'
        //     }
        //     });
        
        //     const accessToken = response.data.access_token;
        //     console.log('Access Token:', accessToken);
        // } catch (error) {
        //     console.error('Error fetching access token:', error);
        // }
    };

    return (
        <AuthContext.Provider value={{ authData, error, isLoading, directory, valid, typeRegister, stravaStatusUser, setError,setIsLoading, signIn, signOut, verifyToken, userMenagement, getUserDatas, defineType, getStravaToken, obterParametroCode, verifyStravaToken, handlerStravaUser }}>
            {children}
        </AuthContext.Provider>
    )
}