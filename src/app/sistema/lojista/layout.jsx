'use client'

import nookies from "nookies"
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect, useState } from 'react'
import LoadingComponent from "@/components/sistema/loadingComponent"
import { usePathname } from "next/navigation"

const LojistaLayout = ({ children }) => {

    const { verifyToken, valid, authData } = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()

    const path = usePathname()
    
    useEffect(() => {
        async function verify() {
            await verifyToken(token, 'Shopkeeper')
        }
        verify()
    }, [authData, path])
    
    return (
        <div>
            {valid ? children : <LoadingComponent />}
        </div>
    )
}

export default LojistaLayout