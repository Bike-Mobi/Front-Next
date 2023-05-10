'use client'

import { usePathname, useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { ApiContext } from "./Api";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const { instance } = useContext(ApiContext)

    const [authData, setAuthData] = useState(undefined) // para setar infos globais (do header component)
    const [error, setError] = useState() // para mostrar error no alerta
    const [isLoading, setIsLoading] = useState() // para gerar loading do LoginButton
    const [directory, setDirectory] = useState() // para definir o diretorio das rotas da sidebar
    const [valid, setValid] = useState(false) // para não 

    const router = useRouter() 
    const path = usePathname()

    async function verifyToken(token, typePage) {

        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

        try {
            await instance.get(`/user`).then(resp => {
                setAuthData(resp.data)
                userMenagement(token, resp.data, typePage)
            })
        } catch (error) {
            return userMenagement(token, false, typePage)
        }
    }

    function userMenagement(token, authData, typePage) {

        const type = authData.type
        let routeDestiny

        if (!token) {
            router.push('/autenticacao/login')
        } else {
            console.log('oi')
            console.log('chegou no typePage != type')
            if (authData.is_admin) {

                setDirectory('admin')
                routeDestiny = '/sistema/admin/dashboard' // rota inicial Admin
                

            } else if (type == 'Shopkeeper') {

                setDirectory('loja')
                routeDestiny = '/sistema/loja/dashboard' // rota inicial Lojista

            } else if (type == 'Cyclist') {
                console.log('chegou')
                setDirectory('ciclista')
                routeDestiny = '/sistema/ciclista/dashboard' // rota inicial Ciclista
                console.log('routeDestiny: ', routeDestiny)
                
            }

            if (typePage != type) {
                router.push(routeDestiny)
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
            const auth = await instance.post(`/login`, {
                email: email,
                password: password
            })
            
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
        destroyCookie(null, 'bikeMobiToken', {
            path: '/'
        })
        setAuthData(undefined)
        router.push('autenticacao/login')
    }

    return (
        <AuthContext.Provider value={{ authData, error, isLoading, directory, valid, setIsLoading, signIn, signOut, verifyToken, userMenagement }}>
            {children}
        </AuthContext.Provider>
    )
}