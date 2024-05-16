'use client'

import React, { useContext, useEffect, useState } from 'react'
import nookies from "nookies"
import AlreadyHasToken from '@/components/sistema/AlreadyHasToken'
import { AuthContext } from '@/contexts/Auth'
import { useRouter } from 'next/navigation'

const Cadastrolayout = ({children}) => {

    const {getMainRouteAndData, getUserDatas, isLoading, setIsLoading} = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()

    useEffect(() => {
        //existe para definir a rota para voltar ao sistema no botão 'voltar ao sistema'
        async function verify() {
            const { authUserData, authTypeData } = await getMainRouteAndData(token)
            await getUserDatas(authUserData, authTypeData)
            setIsLoading(false)
        }
        verify()
    }, [])

    if(token && !isLoading){
        return <AlreadyHasToken/>
    } else{
        return (
            <div>{children}</div>
        )
    }

}

export default Cadastrolayout