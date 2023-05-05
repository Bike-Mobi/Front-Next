'use client'

import nookies from "nookies"
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect } from 'react'

const LojistaLayout = ({ children }) => {

    const { verifyToken, authData } = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()
    console.log(token)
    
    useEffect(() => {
        verifyToken(token, authData, 'Shopkeeper')
    }, [])
    
    return (
        <div>{children}</div>
    )
}

export default LojistaLayout