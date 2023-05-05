'use client'

import nookies from "nookies"
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect } from 'react'

const AutenticacaoLayout = (props) => {

    const { verifyToken, authData } = useContext(AuthContext)

    const { ['bikeMobiToken']: token } = nookies.get()
    console.log(token)
    
    useEffect(() => {
        verifyToken(token, authData, null)
    }, [])

    return (
        <div>
            {props.children}
        </div>
    ) 
}

export default AutenticacaoLayout