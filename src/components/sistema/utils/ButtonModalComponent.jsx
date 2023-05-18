import React from 'react'

const ButtonModalComponent = (props) => {

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

    function click(){
        // if(props.title == "delete"){
        //     return deletes(data)
        // }
        // else if(props.title == "edit"){
        //     return update(data, Titulo, Descricao, Valor, Imagem)
        // }
        // else{
        //     return create(Titulo, Descricao, Valor, Imagem)
        // }
    }

    return (
        <button onClick={click()} className={`${style()} absolute right-0 bottom-0 p-2 text-lg`}>
            {name()}
        </button>
    )
}

export default ButtonModalComponent