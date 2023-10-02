'use client'

import Header from '@/components/sistema/Header'
import Sidebar from '@/components/sistema/Sidebar'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useEffect } from 'react'

const SitemaLayout = (props) => {

    /* Aqui nos Layouts devem estar funções de GET da API, e gerar o(s) array(s) como o de "user" */

    const { authData, verifyStravaToken } = useContext(AuthContext)

    useEffect(() => {
        verifyStravaToken(authData)
    }, [])

    let tipo, imgURL = ''
    if (authData.user?.type == 'Cyclist') {
        tipo = 'Ciclista'
        imgURL = 'ciclistaFoto'
    } else if (authData.user?.type == 'Shopkeeper') {
        tipo = 'Loja'
        imgURL = 'lojaFoto'
    }

    const user = {
        name: authData.user?.name,
        type: tipo,
        imgPerfil: `${'//bikemobi.com.br/api'}/${imgURL}/${authData.type?.photo}`,
        nNotificacoes: 4
    }

    return (
        <div className='flex'>
            <Sidebar name={user.name}
                    type={user.type}
                    imgPerfil={user.imgPerfil}
            />
            <div>
                <Header nNotificacoes={user.nNotificacoes}
                    name={user.name}
                    type={user.type}
                    imgPerfil={user.imgPerfil}
                />
                <div>{props.children}</div>
            </div>
        </div>
    )
}

export default SitemaLayout