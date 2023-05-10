'use client'

import Header from '@/components/sistema/Header'
import Sidebar from '@/components/sistema/Sidebar'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const SitemaLayout = (props) => {

    /* Aqui nos Layouts devem estar funções de GET da API, e gerar o(s) array(s) como o de "user" */

    const { authData } = useContext(AuthContext)

    const user = {
        name: authData?.name,
        type: authData?.type,
        imgPerfil: 'perfilSquere.png',
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