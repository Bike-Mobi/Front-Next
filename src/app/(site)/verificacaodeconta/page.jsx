'use client'

import Loading from '@/app/loading'
import { AuthContext } from '@/contexts/Auth'
import { useRouter } from 'next/navigation'
import nookies from "nookies"
import React, { useContext, useEffect, useState } from 'react'

const VerificacaoDeConta = () => {

    const {getMainRouteAndData, getUserDatas, isLoading, setIsLoading} = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()

    const router = useRouter()

    useEffect(() => {
        async function verify() {
            if(!token) router.push('/autenticacao/login')
            const { mainRoute, authUserData, authTypeData } = await getMainRouteAndData(token)
            await getUserDatas(authUserData, authTypeData)
            router.push(mainRoute)
            setIsLoading(false)
        }
        verify()
    }, [])

    return (
        <div className="container flex flex-col justify-center items-center min-h-screen px-6 py-12 mx-auto">
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Um momento!</h1>
            <p className="mt-4 text-gray-500">Estamos fazendo uma verificação de segurança.</p>
            <Loading/>
        </div>
    )
}

export default VerificacaoDeConta