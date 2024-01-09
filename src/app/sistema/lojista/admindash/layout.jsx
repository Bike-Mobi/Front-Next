import React from 'react'

const AdminLayout = (props) => {
    return (
        <div>
          <div className='font-dmsans text-xl text-tomEscuro font-medium absolute left-5 md:left-[280px] top-5'>Administrador</div>
          <div>{props.children}</div>
        </div>
    )
}

export default AdminLayout