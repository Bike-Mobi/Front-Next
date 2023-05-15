import React from 'react'

const TitleModalComponent = (props) => {
    function title(title){
        if(title == "delete"){
            return "Deletar Anúncio"
        }
        else if(title == "edit"){
            return "Editar Anúncio"
        }
        else{
            return "Adicionar Anúncio"
        }
    }

    return (
        <h1 className='font-bold text-xl'>{title(props.title)}</h1>
    )
}

export default TitleModalComponent