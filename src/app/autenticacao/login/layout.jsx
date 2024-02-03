'use client'

import nookies from "nookies"
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect, useState } from 'react'

const AutenticacaoLayout = ({children}) => {

    const { verifyToken } = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()
    
    useEffect(() => {
        async function verify() {
            await verifyToken(token, null)
        }
        verify()
    }, [])
    
    return (
        <div>
            {children}
        </div>
    )
}

export default AutenticacaoLayout