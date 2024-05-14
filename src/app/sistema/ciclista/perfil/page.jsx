'use client'

import updates from '@/components/sistema/functions/updates'
import FormCiclista from '@/components/sistema/screens/FormCiclista'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const PerfilCiclista = () => {

    const { authData } = useContext(AuthContext)
    const { instance } = useContext(ApiContext)
    console.log(authData)

    const updateAccount = async (data) => {
        
        const formDataUser = new FormData();
        for (const key in data.user) {
            if (data.user[key] != undefined) {
                formDataUser.append(key, data.user[key]);
                console.log(key, data.user[key])
            }
        }
        try {
            await instance.postForm(`/users/${authData.user.id}?_method=PUT`, formDataUser).then(resp => console.log(resp))
        } catch (error) {
            console.error(error)
        }

        const formDataType = new FormData();
        for (const key in data.type) {
            if (data.type[key] != undefined) {
                formDataType.append(key, data.type[key]);
                console.log(key, data.type[key])
            }
        }
        try {
            await instance.postForm(`/ciclistaUpdate/${authData.type.id}?_method=PUT`, formDataType).then(resp => console.log(resp))
        } catch (error) {
            console.error(error)
        }
        setTimeout(() => {
            document.location.reload()
        }, 800);
    }

    return <FormCiclista register={false} data={authData} onClick={updateAccount} />
}

export default PerfilCiclista