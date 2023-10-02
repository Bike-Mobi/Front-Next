'use client'

import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect, useState } from 'react'

const Meusanuncios = () => {

    const { instance } = useContext(ApiContext)
    const { authData } = useContext(AuthContext)

    const [anuncios, setAnuncios] = useState([])

    useEffect(() => {    
        instance.get(`/classificadoFromUser/${authData.user.id}`)
        .then((response) => setAnuncios(response.data))
    }, [])

    return (
        <div className=''>
            <ClassificadosScreen produtos={ anuncios } />
        </div>
    )
}

export default Meusanuncios