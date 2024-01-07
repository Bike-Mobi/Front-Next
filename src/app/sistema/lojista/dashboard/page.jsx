'use client'

import ModalManutencoesPadroes from '@/components/sistema/modals/ModalManuntecoesPadroes'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import { DocumentTextIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import {  CalendarDaysIcon, StarIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
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

    const dateFormat = (date) => {
        const dia = date.slice(8, 10)
        const mes = date.slice(5, 7)
        const ano = date.slice(0, 4)
        return dia + '/' + mes + '/' + ano
      }

    return (
        <div className='p-2 bg-slate-600'>
            <div className='shadow-lg p-4 rounded-lg flex align-top justify-between'>
                <div className='flex'>
                    <CalendarDaysIcon className='text-tomEscuro w-6 h-6 m-[2px] mr-2'/>
                    <div className='card'>
                        <h2 className="card-title text-tomEscuro">Manutenções Realizadas</h2>
                        <div className='card-body p-3'>
                            <div className='text-lg'>
                                <span className='text-cinza'>Esse Mes: </span>
                                <span className='font-semibold text-azul'>
                                    {stravaStatusUser?.recent_ride_totals ? (stravaStatusUser?.recent_ride_totals.distance / 1000).toFixed(0) : '-'}
                                </span>
                            </div>
                            <div className='text-lg'>
                                <span className='text-cinza'>Essa Ano: </span>
                                <span className='font-semibold text-azul'>
                                    {stravaStatusUser?.ytd_ride_totals ? (stravaStatusUser?.ytd_ride_totals.distance / 1000).toFixed(0) : '-'}
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
                            R$ {stravaStatusUser?.all_ride_totals ? (stravaStatusUser?.all_ride_totals.distance / 1000).toFixed(0): '-'}
                        </div>
                        <div className='text-white font-medium'>Total já Recebido</div>
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
                <table className="table table-zebra w-full my-20 text-xs md:text-sm lg:text-base">

                    <thead>
                    <tr >
{/*                         <th className='z-0'>Descrição</th> */}
                        {/* <th>Ciclista</th> */}
                        <th>Fotos</th>
                        <th>Data</th>
                        <th className='hidden lg:table-cell'>Valor</th>
                        <th>Detalhes</th>
                    </tr>
                    </thead>

                    <tbody>
                    {authData.manutencoes?.map((manutencao, index) => {
                        return(
                        <tr key={index}>
                            <td className='max-w-[174px] overflow-hidden md:text-sm'><p className=''>{manutencao.description?.length > 69 ? manutencao.description.slice(0, 67) + '...' : manutencao.description}</p></td>
                            <td>
                            <div className='flex gap-4'>
                            {manutencao.photo_1 ? (
                                <img src={`${process.env.NEXT_PUBLIC_API}/manutencaoFoto/${manutencao.photo_1}`} className='w-12 h-12 object-cover rounded-lg' alt="" />
                                ) : null}
                                {manutencao.photo_2 ? (
                                <img src={`${process.env.NEXT_PUBLIC_API}/manutencaoFoto/${manutencao.photo_2}`} className='w-12 h-12 object-cover rounded-lg' alt="" />
                                ) : null}
                                {manutencao.photo_3 ? (
                                <img src={`${process.env.NEXT_PUBLIC_API}/manutencaoFoto/${manutencao.photo_3}`} className='w-12 h-12 object-cover rounded-lg' alt="" />
                                ) : null}
                            </div>
                            </td>
                        {/* <td>Manutencoes ainda nao esta vinculada com um ciclista/bicicleta na api </td> */}
                        
                        <td >{dateFormat(manutencao.created_at)}</td>
                        <td className='hidden lg:table-cell text-nowrap'>R$ {manutencao.valor_mdo} </td>
                            <td className={`text-white grid grid-cols-2 lg:flex lg:flex-row py-8`}>
                                {/* <label htmlFor={`my-modal-${manutencao.id}d`} onClick={() => setIdModal(manutencao.id+'d')} className='cursor-pointer'><DocumentTextIcon className={`w-8 h-w-8 hover:opacity-60 p-1 mx-1 rounded-md bg-success`}/></label> */}
                                {/* <ModalDetalhesManutencao data={manutencao}></ModalDetalhesManutencao> */}
                                <label htmlFor={`my-modal-${manutencao.id}det`} onClick={() => setIdModal(manutencao.id+'det')} className='cursor-pointer mt-1 md:mt-1 lg:mt-0'><DocumentTextIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-success p-1 mx-1 rounded-md'/></label>
                                <label htmlFor={`my-modal-${manutencao.id}e`} onClick={() => setIdModal(manutencao.id+'e')} className='cursor-pointer mt-1 md:mt-1 lg:mt-0'><PencilSquareIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-azul p-1 mx-1 rounded-md'/></label>
                                <label htmlFor={`my-modal-${manutencao.id}D`} onClick={() => setIdModal(manutencao.id+'D')} className='cursor-pointer mt-1 md:mt-1 lg:mt-0'><TrashIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-error p-1 mx-1 rounded-md'/></label>
                                <ModalManutencoesPadroes type='add' item={{id: manutencao.id, price: manutencao.valor_mdo, description: manutencao.description }}/>
                            </td>
                        </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
                <div>
                    {/* {!stravaStatusUser ? (
                        <button onClick={getStravaToken} className='btn bg-strava text-white border-strava hover:opacity-80 hover:bg-strava hover:border-strava m-10'>Sincronize com o Strava</button>
                    ) : null} */}
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