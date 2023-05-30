'use client'

import FormLojista from '@/components/sistema/screens/FormLojista'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const PerfilLojista = () => {

    const { authData } = useContext(AuthContext)
    console.log(authData)
    
    return (
        <div>
            <FormLojista register={false} data={authData} onClick={console.log} />
        </div>
    )
}

export default PerfilLojista