'use client'

import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import { ApiContext } from '@/contexts/Api'
import React, { useContext, useEffect, useState } from 'react'

const Anuncios = () => {

    const { instance } = useContext(ApiContext)

    const [anuncios, setAnuncios] = useState([])

    useEffect(() => {    
        instance.get(`/allClassificados`)
        .then((response) => setAnuncios(response.data))
    }, [])

    return (
        <div className=''>
            <ClassificadosScreen produtos={ anuncios } />
        </div>
    )
}

export default Anuncios