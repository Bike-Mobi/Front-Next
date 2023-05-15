'use client'

import FormInfos from '@/components/sistema/screens/FormInfos'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const PerfilCiclista = () => {

    const { authData } = useContext(AuthContext)
    console.log(authData)
    
    return <FormInfos/>
    return (
        <div>perfil</div>
    )
}

export default PerfilCiclista