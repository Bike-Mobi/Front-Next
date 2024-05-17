'use client'

import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect, useState } from 'react'

const Meusanuncios = () => {

    const { authData, routeAccess } = useContext(AuthContext)

    return (
        <div className=''>
            <ClassificadosScreen produtos={ routeAccess == 'admin' ? authData.classificados : authData.meusclassificados } canEdit/>
        </div>
    )
}

export default Meusanuncios