'use client'

import { BellIcon } from '@heroicons/react/24/outline'
import React from 'react'

const Header = (props) => {

    const shortName = props.name?.split(" ")[0] + ' ' + props.name?.split(" ")[1]

    return (
        <div className='flex'>
            <div className='absolute right-20 md:right-6 -top-1 flex'>
                <div>
                    <div className='font-dmsans relative top-4 left-3 rounded-full bg-[#FE6C1A] text-white font-medium text-center w-6 h-6'>{props.nNotificacoes}</div>
                    <BellIcon className='text-tomEscuro w-8'/>
                </div>
                <div className='hidden md:flex ml-14 relative top-3'>
                    <div className='font-dmsans text-base text-end'>
                        <div className='font-bold text-azul'>{shortName}</div>
                        <div className='font-normal text-cinza'>{props.type}</div>
                    </div>
                    <img src={props.imgPerfil} alt="Icone de Usuario" className='h-12 w-12 ml-3 rounded-full'/>
                </div>
            </div>
            <div className='tag w-screen'>
                <div className='bg-cinza h-[1px] mt-16 mx-5'></div>
            </div>
            <style jsx>{`
                @media(min-width: 500px){
                    .tag{
                        width: calc(100vw - 256px)
                    }
                }
            `}</style>
        </div>
    )
}

export default Header