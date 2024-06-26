'use client'

import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import { BellIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'

const Header = (props) => {

    const { instance } = useContext(ApiContext)
    const { authData } = useContext(AuthContext)

    let shortName
    shortName = props.name?.split(" ")[0] + ' ' + props.name?.split(" ")[1]
    if (props.name?.split(" ")[1] == undefined) {
        shortName = props.name?.split(" ")[0]
    }

    const [openMessages, setOpenMessages] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        setNotifications(props?.notificacoes)
    }, [props])

    let notViewedMessages = 0
    notifications?.map(item => !item.viewed ? notViewedMessages++ : null)

    const setviewed = async (item) => {
        if(!item.viewed){
            await instance.postForm(`/messageUpdate/${item.id}?_method=PUT`, {viewed: 1}).then(resp => console.log(resp))
            await instance(`/messagesFromReceiver/${authData.user.id}`).then(resp => setNotifications(resp.data))
        }
    }

    return (
        <div className='flex'>
            <div className='absolute right-20 md:right-8 -top-1 flex'>
                <div onClick={() => setOpenMessages(!openMessages)} className='hover:rotate-6 ease-in-out cursor-pointer'>
                    {notViewedMessages > 0 ? (
                        <div className='font-dmsans relative top-4 left-3 rounded-full bg-[#FE6C1A] text-white font-medium text-center w-6 h-6'>{notViewedMessages}</div>
                    ) : (
                        <div  className='font-dmsans relative top-4 left-3 rounded-full text-white font-medium text-center w-6 h-6'></div>
                    )}
                    <BellIcon className='text-tomEscuro w-8'/>
                </div>
                <div className='hidden md:flex ml-14 relative top-3'>
                    <div className='font-dmsans text-base text-end'>
                        <div className='font-bold text-azul'>{shortName}</div>
                        <div className='font-normal text-cinza'>{props.type}</div>
                    </div>
                    <img src={props.imgPerfil ?? 'perfil_default.png'} alt="Icone de Usuário" className='h-12 w-12 ml-3 rounded-full object-cover'/>
                </div>
            </div>
            <div className='w-screen md:w-[calc(100vw-276px)]'>
                <div className='bg-transparent md:bg-cinza h-[1px] mt-16 mx-5'></div>
            </div>
            {openMessages && notifications.length > 0 ? (
                <div className='fixed right-10 top-[72px] border-2 border-tomEscuro rounded-lg bg-white z-30'>
                    {notifications?.map(item => (
                        <div key={item.id} tabIndex={0} className='collapse w-80 bg-base-200 m-2 rounded-md hover:bg-base-300'>
                            <div className='collapse-title p-2' onClick={() => setviewed(item)}>
                                <div className='flex justify-between'>
                                    <h2 className='px-2'>{item.title}</h2>
                                    <div className={`h-3 w-3 mt-1 rounded-full ${item.viewed ? 'bg-transparent' : 'bg-strava'}`}></div>
                                </div>
                                <p className='text-cinza text-sm px-2'>{item.message.slice(0, 42)}</p>
                            </div>
                            <div className='collapse-content text-cinza text-sm p-0 relative -top-2'>
                                <div className='px-4'>{item.message.slice(42)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default Header