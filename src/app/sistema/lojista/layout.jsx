'use client'

import nookies from "nookies"
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect, useState } from 'react'
import LoadingComponent from "@/components/sistema/loadingComponent"

const LojistaLayout = ({ children }) => {

    const { verifyToken, valid } = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()
    
    useEffect(() => {
        async function verify() {
            await verifyToken(token, 'Shopkeeper')
        }
        verify()
    }, [])
    
    return (
        <div>
            {valid ? children : <LoadingComponent />}
        </div>
    )
}

export default LojistaLayout