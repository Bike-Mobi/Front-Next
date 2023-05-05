'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";
import { ApiContext } from "./Api";

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const { instance } = useContext(ApiContext)

    const [authData, setAuthData] = useState(undefined)
    const [token, setToken] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState()

    const router = useRouter()  

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

    function userMenagement(token, authData, typePage) {

        const type = authData.type

        if (!token) {
            router.push('/autenticacao/login')
        } else {
            if (typePage != type) {
                if (authData.is_admin) {
                    router.push('/sistema/admin/dashboard') // rota inicial Admin
                } else if (type == 'Shopkeeper') {
                    router.push('/sistema/loja/dashboard') // rota inicial Lojista
                } else if (type == 'Cyclist') {
                    router.push('/sistema/ciclista/config-ciclista') // rota inicial Ciclista
                }
            }
        }
    }

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

    function signOut() {
        destroyCookie(null, 'bikeMobiToken', {
            path: '/'
        })
        setAuthData(undefined)
        router.push('autenticacao/login')
    }

    return (
        <AuthContext.Provider value={{ authData, error, isLoading, setIsLoading, signIn, signOut, verifyToken, userMenagement }}>
            {children}
        </AuthContext.Provider>
    )
}