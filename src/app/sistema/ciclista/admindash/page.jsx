'use client'

import Admin from '@/components/sistema/screens/Admin'
import { IconBike } from '@/components/sistema/utils/icons'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import { BuildingStorefrontIcon, CogIcon, NewspaperIcon, ShieldCheckIcon, StarIcon, UserIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import React, { useContext, useEffect, useState } from 'react'

const Dashboard = () => {

    const { authData, obterParametroCode, handlerStravaUser, getStravaToken, verifyStravaToken, stravaStatusUser } = useContext(AuthContext)
    const { instance } = useContext(ApiContext)

    // const [manutencoesCount, setManutencoesCount] = useState('-')
    const [infos, setInfos] = useState([])

    useEffect(() => {        
        instance.get(`/adminInfos`)
            .then((resp) => setInfos(resp.data))
        
    }, [])

    console.log(infos)

    return (
        <div className='p-2 bg-slate-600'>
            <div className='flex flex-wrap gap-10 justify-center md:justify-start'>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <UserIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Usuarios</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfUsers}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <StarIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Usuarios Premium</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfpremiumUsers}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <div className='my-auto mr-3'>
                        <IconBike className='w-8 h-8'/>
                    </div>
                    <div>
                        <h2 class="card-title">Bikes</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfBikes}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <BuildingStorefrontIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Lojas</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfShops}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <CogIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Ciclistas</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfCyclists}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <WrenchScrewdriverIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Manutenções</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfManutencoes}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <NewspaperIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Anúncios</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfAnuncios}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <ShieldCheckIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Bikes Encontradas</h2>
                        <p className='font-bold text-azul text-xl'>{infos.numberOfBikeFounded}</p>
                    </div>
                </div>
            </div>
            <div className='text-xl text-tomEscuro font-semibold py-4 px-6 md:px-0'>
                Adições esta semana:
            </div>
            <div className='flex flex-wrap gap-10 justify-center md:justify-start'>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <UserIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Usuarios</h2>
                        <p className='font-bold text-azul text-xl'>{infos.recentUsers}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <WrenchScrewdriverIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Manutencões</h2>
                        <p className='font-bold text-azul text-xl'>{infos.recentManutencoes}</p>
                    </div>
                </div>
                <div className='shadow-xl flex p-4 w-64 rounded-lg text-tomEscuro'>
                    <BuildingStorefrontIcon className='w-8 h-8 my-auto mr-3'/>
                    <div>
                        <h2 class="card-title">Lojas</h2>
                        <p className='font-bold text-azul text-xl'>{infos.recentShops}</p>
                    </div>
                </div>
            </div>
            <Admin/>
        </div>
    )
}

export default Dashboard