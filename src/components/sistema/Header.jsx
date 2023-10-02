
import { BellIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Header = (props) => {

    let shortName
    shortName = props.name?.split(" ")[0] + ' ' + props.name?.split(" ")[1]
    if (props.name?.split(" ")[1] == undefined) {
        shortName = props.name?.split(" ")[0]
    }

    return (
        <div className='flex'>
            <div className='absolute right-20 md:right-8 -top-1 flex'>
                {/* <div>
                    <div className='font-dmsans relative top-4 left-3 rounded-full bg-[#FE6C1A] text-white font-medium text-center w-6 h-6'>{props.nNotificacoes}</div>
                    <BellIcon className='text-tomEscuro w-8'/>
                </div> */}
                <div className='hidden md:flex ml-14 relative top-3'>
                    <div className='font-dmsans text-base text-end'>
                        <div className='font-bold text-azul'>{shortName}</div>
                        <div className='font-normal text-cinza'>{props.type}</div>
                    </div>
                    <img src={props.imgPerfil} alt="Icone de Usuario" className='h-12 w-12 ml-3 rounded-full object-cover'/>
                </div>
            </div>
            <div className='w-screen md:w-[calc(100vw-276px)]'>
                <div className='bg-transparent md:bg-cinza h-[1px] mt-16 mx-5'></div>
            </div>
        </div>
    )
}

export default Header