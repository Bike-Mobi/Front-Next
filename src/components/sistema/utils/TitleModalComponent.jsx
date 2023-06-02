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
    }

    return (
        <h1 className='font-bold text-xl'>{title(props.action, props.title)}</h1>
    )
}

export default TitleModalComponent