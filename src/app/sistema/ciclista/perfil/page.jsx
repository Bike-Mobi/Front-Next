'use client'

import FormCiclista from '@/components/sistema/screens/FormCiclista'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const PerfilCiclista = () => {

    const { authData } = useContext(AuthContext)
    console.log(authData)
    
    return <FormCiclista register={false} data={authData} onClick={console.log} />
    // return (
    //     <div>perfil</div>
    // )
}

export default PerfilCiclista