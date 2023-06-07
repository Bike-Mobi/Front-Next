'use client'
import { ApiContext } from '@/contexts/Api'
import React, { useContext, useState } from 'react'

const ButtonModalComponent = (props) => {

    const {instance} = useContext(ApiContext)
    const [confirmation, setConfirmation] = useState(false)
    const url = props.url

    function name(){
        if(props.title == "delete"){
            return "Deletar"
        }
        else if(props.title == "edit"){
            return "Editar"
        }
        else{
            return "Adicionar"
        }
    }

    if(confirmation){
        if(props.title == "delete"){
            instance.delete(`/${url}/${props.data.id}`)
            .then(() => document.location.reload())
        }
        else if(props.title == "edit"){
            instance.put(`/${url}/${props.data.id}`,
                props.newData
            )
            .then(() => document.location.reload())
        }
        else{
            instance.post(`/${url}`,
                props.newData
            )
            .then(() => document.location.reload())
        }
    }

    function style(){
        if(props.title == "delete"){
            return "bg-error text-white hover:opacity-60 p-1 rounded-md"
        }
        else if(props.title == "edit"){
            return "bg-azul text-white hover:opacity-60 p-1 rounded-md"
        }
        else{
            return "bg-success text-white hover:opacity-60 p-1 rounded-md"
        }
    }

    return (
        <button onClick={() => setConfirmation(true)} className={`${style()} absolute right-0 bottom-0 p-2 text-lg leading-none`}>
            {name()}
        </button>
    )
}

export default ButtonModalComponent