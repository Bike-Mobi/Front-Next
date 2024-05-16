'use client'

import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const Anuncios = () => {

    const { authData } = useContext(AuthContext)

    return (
        <div className=''>
            <ClassificadosScreen produtos={ authData.classificados } />
        </div>
    )
}

export default Anuncios