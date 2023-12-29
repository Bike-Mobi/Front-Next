import React from 'react'

const TitleModalComponent = (props) => {
    function title(action, title){
        if(action == "delete"){
            return "Deletar " + title
        }
        else if(action == "edit"){
            return "Editar " + title
        }
        else if(action == "create"){
            return "Adicionar " + title
        }
        else if(action == "protect"){
            return "Alerta de Furto " + title
        }
        else if(action == "detail"){
            return "Detalhes da " + title
        }
    }

    return (
        <h1 className='font-bold text-xl'>{title(props.action, props.title)}</h1>
    )
}

export default TitleModalComponent