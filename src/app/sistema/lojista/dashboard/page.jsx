'use client'

import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import { FireIcon, StarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Dashboard = () => {

    const { authData, obterParametroCode, handlerStravaUser, getStravaToken, verifyStravaToken, stravaStatusUser } = useContext(AuthContext)
    const { instance } = useContext(ApiContext)

    const [manutencoesCount, setManutencoesCount] = useState('-')
    const [bikes, setBikes] = useState([])

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get('code');
        if (code) {
            obterParametroCode()
        }
        if (authData.user != undefined) {
            verifyStravaToken(authData)
        }
        handlerStravaUser()

        instance.get(`/manutencaoFromCyclist/${authData.type.id}`)
            .then((resp) => setManutencoesCount(resp.data.length))
        
        instance.get(`/bicicletas/${authData.type.id}`)
            .then((resp) => setBikes(resp.data))
        
    }, [authData])

    console.log(bikes)

    const router = useRouter()

    return (
        <div className='p-2 bg-slate-600'>
            <div className='shadow-lg p-4 rounded-lg flex align-top justify-between'>
                <div className='flex'>
                    <FireIcon className='text-tomEscuro w-6 h-6 m-[2px] mr-2'/>
                    <div className='card'>
                        <h2 className="card-title text-tomEscuro">Distância percorrida</h2>
                        <div className='card-body p-3'>
                            <div className='text-lg'>
                                <span className='text-cinza'>Esse Mes: </span>
                                <span className='font-semibold text-azul'>
                                    {stravaStatusUser?.recent_ride_totals ? (stravaStatusUser?.recent_ride_totals.distance / 1000).toFixed(0) + ' Km' : '-'}
                                </span>
                            </div>
                            <div className='text-lg'>
                                <span className='text-cinza'>Essa Ano: </span>
                                <span className='font-semibold text-azul'>
                                    {stravaStatusUser?.ytd_ride_totals ? (stravaStatusUser?.ytd_ride_totals.distance / 1000).toFixed(0) + ' Km' : '-'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='indicator'>
                    <span className="indicator-item p-1 rounded-full badge-secondary">
                        <StarIcon className='w-4 h-4 text-white'/>
                    </span>
                    <div className='card bg-azul rounded-xl p-3'>
                        <div className='text-white text-bold font-bold text-4xl m-auto'>
                            {stravaStatusUser?.all_ride_totals ? (stravaStatusUser?.all_ride_totals.distance / 1000).toFixed(0) + ' Km' : '-'}
                        </div>
                        <div className='text-white font-medium'>Distancia total Percorrida</div>
                    </div>
                </div>
                <div className='flex gap-6 border-2 border-tomEscuro rounded-xl px-4 py-1'>
                    <WrenchScrewdriverIcon className='w-10 h-10 text-tomEscuro my-auto'/>
                    <div className='text-end'>
                        <div className='text-tomEscuro font-medium text-lg text-start'>Total de</div>
                        <div className='text-azul font-bold text-2xl justify-center text-center'>{manutencoesCount}</div>
                        <div className='text-tomEscuro font-medium text-lg text-end'>Manutenções</div>
                        <div className='text-tomEscuro font-medium text-lg text-end'>Realizadas</div>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/2 mt-10 justify-center flex flex-col'>
                    {bikes.map(item => (
                        <div className="card card-side bg-base-100 shadow-xl mb-6" key={item.id}>
                            <figure className='w-52'>
                                <img className='object-cover h-full' src={item.photo_1 ? `${'https://bikemobi.com.br/api'}/bicicletaFoto/${item.photo_1}` : '/Bike.jpg'} />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{item.nameBike}</h2>
                                <p>{item.brand}</p>
                                <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={() => router.push('/sistema/ciclista/manutencoes')}>Realizar Manutenção</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button className='btn btn-secondary mx-auto text-white' onClick={() => router.push('/sistema/ciclista/bikes')}>Minhas Bicicletas</button>
                </div>
                <div>
                    {!stravaStatusUser ? (
                        <button onClick={getStravaToken} className='btn bg-strava text-white border-strava hover:opacity-80 hover:bg-strava hover:border-strava m-10'>Sincronize com o Strava</button>
                    ) : null}
                    {/* <div className='fixed bottom-6 right-6'>
                        <div className='mt-auto flex flex-col gap-2 py-2 bg-azul w-[400px] rounded-xl'>
                            <div className='text-center w-full text-white font-bold'>Promoções</div>
                            <div className='rounded-md bg-white flex mx-2 h-32'>
                                <div className='w-1/2'>
                                    <div className='text-[60px] font-bold mx-4 text-warning'>20%</div>
                                    <div className='text-lg font-bold mx-4 text-warning text-center'>de Desconto</div>
                                </div>
                                <div>
                                    <div className='mt-5 mb-2 font-medium text-cinza'>Em manutenções</div>
                                    <div className='badge badge-secondary text-white'>Loja Camaleão</div>
                                    <div className='mt-2 ml-2 text-xs text-cinza'>*Regras da promoção de acordo com a Loja</div>
                                </div>
                            </div>
                            <div className='rounded-md bg-white flex mx-2 h-32'>
                                <div className='w-1/2'>
                                    <div className='flex font-bold mx-4 text-warning'>
                                        <span className='text-2xl mt-auto mb-5'>R$ </span><span className='text-[60px]'>130</span>
                                    </div>
                                    <div className='text-lg font-bold mx-4 text-warning text-center'>de Desconto</div>
                                </div>
                                <div>
                                    <div className='mt-5 mb-2 font-medium text-cinza'>Em reposição de peças</div>
                                    <div className='badge badge-secondary text-white'>Loja Camaleão</div>
                                    <div className='mt-2 ml-2 text-xs text-cinza'>*Regras da promoção de acordo com a Loja</div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard