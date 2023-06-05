import React from 'react'
import creates from '../functions/creates';
import deletes from '../functions/deletes'
import updates from '../functions/updates';

const ButtonModalComponent = (props) => {

    const url = props.url
    let acao, data;

    function name(){
        if(props.title == "delete"){
            acao = deletes
            data = props.data
            return "Deletar"
        }
        else if(props.title == "edit"){
            acao = updates
            data = props.newData
            return "Editar"
        }
        else{
            acao = creates
            data = props.newData
            return "Adicionar"
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
        <button onClick={() => acao(data, url)} className={`${style()} absolute right-0 bottom-0 p-2 text-lg leading-none`}>
            {name()}
        </button>
    )
}

export default ButtonModalComponent