'use client'

import { AuthContext } from '@/contexts/Auth'
import { ArrowRightOnRectangleIcon, BanknotesIcon, Bars3Icon, BuildingStorefrontIcon, ChartBarSquareIcon, ClipboardDocumentListIcon, GlobeAltIcon, HeartIcon, NewspaperIcon, UserIcon, WrenchScrewdriverIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { IconBike } from './utils/icons'

const Sidebar = (props) => {

    const {signOut, directory, valid} = useContext(AuthContext)

    let items = []
    if (valid) {   
        if (directory == 'admin') {
            items.push(
                { link: `/sistema/${directory}/admindash`, name: 'Admin', icon: <GlobeAltIcon /> },
                { link: `/sistema/${directory}/premiumdash`, name: 'Premium', icon: <BanknotesIcon /> }
            ) 
        }
        items.push(
            { link: `/sistema/${directory}/dashboard`, name: 'Dashboard', icon: <ChartBarSquareIcon /> },
            { link: `/sistema/${directory}/lojas`, name: 'Lojas', icon: <BuildingStorefrontIcon /> },
            { link: `/sistema/${directory}/anuncios`, name: 'Anúncios', icon: <NewspaperIcon /> },
            { link: `/sistema/${directory}/meusanuncios`, name: 'Meus Anúncios', icon: <ClipboardDocumentListIcon /> },
            { link: `/sistema/${directory}/manutencoes`, name: 'Manutenções', icon: <WrenchScrewdriverIcon /> },
            { link: `/sistema/${directory}/bikes`, name: 'Bikes', icon: <IconBike/> },
            { link: `/sistema/${directory}/perfil`, name: 'Perfil', icon: <UserIcon /> },
            // { link: `/sistema/${directory}/sejapremium`, name: 'Seja Premium', icon: <StarIcon/> }
        )
    }

    const [nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }

    var transition
    nav ? transition = 'left-0' :  transition = 'left-[-100%]'

    const route = usePathname()
    let selected, yellow

    let shortName
    shortName = props.name?.split(" ")[0] + ' ' + props.name?.split(" ")[1]
    if (props.name?.split(" ")[1] == undefined) {
        shortName = props.name?.split(" ")[0]
    }

    return (
        <div className=''>
            <div className='flex bg-azul h-screen w-fit font-dmsans sticky top-0 max-h-screen'>
                <div className='hidden md:flex flex-col'>
                    <Link href={'/'} className='font-bold text-white text-3xl my-4 mb-2 flex justify-center'>Bike Mobi</Link>
                    <div>
                        {items.map((item, index) => {
                            route == item.link ? selected = "bg-white text-azul" : selected = "text-white"
                            item.name == 'Seja Premium' ? yellow = 'text-[#E7EA58]' : null
            
                            return(
                                <Link key={index} href={item.link} prefetch={false}>
                                    <div className={`w-52 flex ${selected} gap-2 items-center mx-4 p-2 rounded-md my-5`}>
                                        <div className={`${yellow} w-7`}>{item.icon}</div>
                                        <div className='text-base font-medium'>{item.name}</div>
                                    </div>
                                </Link>
                            )
                        })}
                        <button onClick={signOut} className={`w-52 flex text-white gap-2 items-center mx-4 p-2 rounded-md my-5`}>
                            <div className={`w-7`}><ArrowRightOnRectangleIcon/></div>
                            <div className='text-base font-medium'>Logout</div>
                        </button>
                    </div>
                </div>
                <div className='hidden md:block bg-white w-4 h-full rounded-l-2xl'></div>
            </div>
            <div className={`w-full h-screen fixed top-0 bg-[#25252525] z-10 ${transition}`}>
                <div className={`fixed top-0 bg-azul w-[60%] h-full border-r border-white text-white font-semibold text-2xl ease-in-out duration-500 ${transition} z-40 flex flex-col`}>
                    <div className='bg-white flex p-4 rounded-lg mt-4 mb-8 mx-auto'>
                        <img src={props.imgPerfil} alt="Icone de Usuario" className='h-12 w-12 mr-3 rounded-full'/>
                        <div className='font-dmsans text-base'>
                            <div className='font-bold text-azul'>{shortName}</div>
                            <div className='font-normal text-cinza'>{props.type}</div>
                        </div>
                    </div>
                        {items.map((item, index) => {
                            route == item.link ? selected = "bg-white text-azul" : selected = "text-white"
                            item.name == 'Seja Premium' ? yellow = 'text-[#E7EA58]' : yellow = null
                            return(
                                <Link key={index} href={item.link}>
                                    <div className={`w-40 sm:w-52 flex ${selected} gap-2 items-center mx-4 p-2 rounded-md my-3`}>
                                        <div className={`${yellow} w-7`}>{item.icon}</div>
                                        <div className='text-base font-medium'>{item.name}</div>
                                    </div>
                                </Link>
                            )
                        })}
                        <button onClick={signOut} className={`w-52 flex text-white gap-2 items-center mx-4 p-2 rounded-md my-5`}>
                            <div className={`w-7`}><ArrowRightOnRectangleIcon/></div>
                            <div className='text-base font-medium'>Logout</div>
                        </button>
                </div>
            </div>
            <button className='block md:hidden absolute right-4 top-4' onClick={handleNav}>
                {nav ?
                    <XMarkIcon className='my-auto h-8 text-tomEscuro fixed z-20 right-4' />
                    :
                    <Bars3Icon className='my-auto h-8 text-tomEscuro' />
                }
            </button>
        </div>
    )
}

export default Sidebar