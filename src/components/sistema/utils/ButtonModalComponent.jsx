'use client'
import { ApiContext } from '@/contexts/Api'
import React, { useContext, useState } from 'react'
import creates from '../functions/creates'
import { AuthContext } from '@/contexts/Auth'

const ButtonModalComponent = (props) => {

    const {instance} = useContext(ApiContext)
    const { authData, getUserDatas } = useContext(AuthContext)
    const [confirmation, setConfirmation] = useState(false)

    let name, url, btnStyle

    if(props.title == "delete"){
        name = "Deletar"
        url = `/${props.baseUrl}Delete/${props.data?.id}?_method=DELETE`
        btnStyle = 'btn-error'
    } else if(props.title == "protect"){
        name = "Confirmar"
        url = `/${props.baseUrl}Update/${props.data?.id}?_method=PUT`
        btnStyle = 'btn-warning'
        props.newData.is_thiefs = !props.data.is_thiefs
    }
    else if(props.title == "edit"){
        name = "Editar"
        url = `/${props.baseUrl}Update/${props.data?.id}?_method=PUT`
        btnStyle = 'btn-primary'
    }
    else if(props.title == "sendBike"){
        name = "Confirmar"
        url = `/${props.baseUrl}Update/${props.data?.id}?_method=PUT`
        btnStyle = 'btn-primary'
    }
    else{
        name = "Adicionar"
        url = `/${props.baseUrl}`
        btnStyle = 'btn-success'
    }


    // if(confirmation){
    //     if (props.title == "delete") {
    //         console.log(props.data)
    //         // instance.delete(`/${url}/${props.data.id}`)
    //         creates(props.data, url)
    //         .then(() => document.location.reload())
    //     }
    //     else if(props.title == "edit"){
    //         instance.put(`/${url}/${props.data.id}`,
    //             props.newData
    //         )
    //         .then(() => document.location.reload())
    //     }
    //     else{
    //         instance.post(`/${url}`,
    //             props.newData
    //         )
    //         .then(() => document.location.reload())
    //     }
    // }

    // function style(){
    //     if(props.title == "delete"){
    //         return "bg-error text-white hover:opacity-60 p-1 rounded-md"
    //     }
    //     else if(props.title == "edit"){
    //         return "bg-azul text-white hover:opacity-60 p-1 rounded-md"
    //     }
    //     else{
    //         return "bg-success text-white hover:opacity-60 p-1 rounded-md"
    //     }
    // }

    const sendRequest = async () => {
        const formData = new FormData();
        for (const key in props.newData) {
            if (props.newData[key] != undefined) {
                if(props.newData[key] === true){
                    formData.append(key, 1);
                } else if(props.newData[key] === false){
                    formData.append(key, 0);
                } else {
                    formData.append(key, props.newData[key]);
                }
            }
            console.log('anhfcahdnahdmsaxs: ', key, props.newData[key])
        }
        try {
            instance.postForm(url, formData).then(resp => console.log(resp))
            setTimeout(() => {
                //document.location.reload()
/*                 getUserDatas(authData.user, authData.type) */
            }, 800);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <button disabled={props.disabled} onClick={sendRequest} className={`btn ${btnStyle} ml-auto text-white ${props.title == 'close' ? 'hidden' : 'flex'}`}>
                {name}
            </button>
        </div>
    )
}

export default ButtonModalComponent