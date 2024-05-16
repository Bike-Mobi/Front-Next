import React from 'react'

const ManutencoesPadroesLayout = (props) => {
    return (
        <div>
          <div className='font-dmsans text-xl text-tomEscuro font-medium absolute left-5 md:left-[280px] top-5'>Manutenções Padrões</div>
          <div>{props.children}</div>
        </div>
    )
}

export default ManutencoesPadroesLayout