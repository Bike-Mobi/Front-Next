'use client'

import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const Meusanuncios = () => {

    const { authData } = useContext(AuthContext)

    return (
        <div className=''>
            <ClassificadosScreen produtos={ authData.meusclassificados } />
        </div>
    )
}

export default Meusanuncios