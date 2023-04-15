'use client'

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useState } from 'react'

const Nav = () => {

    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    var transition
    nav ? transition = 'left-0' :  transition = 'left-[-100%]'

    return (
        <div className='flex font-dmsans fixed'>
            <div className='bg-white h-20 w-screen shadow-lg flex justify-end '>
                <Link className='md:block hidden text-tomEscuro font-bold px-8 py-2 h-fit my-auto mr-14' href='/classificados'>
                    Classificados
                </Link>
                <Link className='md:block hidden bg-azul text-white font-bold rounded-lg px-8 py-2 h-fit my-auto mr-24' href='/login'>
                    Login
                </Link>
                <div className={`fixed top-0 bg-azul w-[60%] h-full border-r border-white text-white font-semibold ease-in-out duration-500 ${transition} z-40 flex flex-col`}>
                    <div className='flex justify-center pt-4 pb-14 border-b border-white'>Bike Mobi</div>
                    <Link className='p-4 border-b border-white' href='/classificados'>Classificados</Link>
                    <Link className='p-4 border-b border-white' href='/login'>Login</Link>
                </div>
                <button className='md:hidden' onClick={handleNav}>
                    {nav ?
                        <XMarkIcon className='my-auto h-8 text-tomEscuro mr-6' />
                        :
                        <Bars3Icon className='my-auto h-8 text-tomEscuro mr-6' />
                    }
                </button>
            </div>
            <div className='bg-azul md:p-4 p-3 md:w-36 w-24 md:rounded-br-[72px] rounded-r-[48px]  md:rounded-r-[0px] absolute left-0'>
                <img src="bikemobi-logo.png" alt="Logo Bike Mobi"/>
            </div>
        </div>
    )
}

export default Nav