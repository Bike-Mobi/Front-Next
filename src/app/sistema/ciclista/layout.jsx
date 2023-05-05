'use client'

import nookies from "nookies"
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect } from 'react'

const CiclistaLayout = ({ children }) => {

    const { verifyToken, authData } = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()
    console.log(token)
    
    useEffect(() => {
        verifyToken(token, authData, 'Cyclist')
    }, [])
    
    return (
        <div>{children}</div>
    )
}

export default CiclistaLayout