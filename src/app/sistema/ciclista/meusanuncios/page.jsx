'use client'

import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect, useState } from 'react'

const Meusanuncios = () => {

    const { authData } = useContext(AuthContext)

    return (
        <div className=''>
            <ClassificadosScreen produtos={ authData.meusclassificados } />
        </div>
    )
}

export default Meusanuncios