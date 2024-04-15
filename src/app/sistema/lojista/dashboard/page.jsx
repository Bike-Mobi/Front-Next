'use client'

import ModalManutencoesPadroes from '@/components/sistema/modals/ModalManuntecoesPadroes'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import { DocumentTextIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import {  CalendarDaysIcon, CurrencyDollarIcon, StarIcon, SwatchIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Dashboard = () => {

    const { authData, stravaStatusUser } = useContext(AuthContext)

    const router = useRouter()

    const dateFormat = (date) => {
        const dia = date.slice(8, 10)
        const mes = date.slice(5, 7)
        return dia + '/' + mes
    }

    const manutencoesPeriodoTempo = (time, manutencoesArray) => {
        if(manutencoesArray.length < 1){
            return '-'
        }

        const hoje = new Date();
        const periodTime = new Date();
        if(time == 'mes'){
            periodTime.setMonth(periodTime.getMonth() - 1);
        } else {
            periodTime.setFullYear(periodTime.getFullYear() - 1);
        }
        
        const itensRecentes = manutencoesArray.filter(item => {
            const dataCriacao = new Date(item.created_at);
            return dataCriacao > periodTime && dataCriacao <= hoje;
        });

        return itensRecentes
    }

    const calculaTotalArrecadado = (manutencoesArray) => {
        if(manutencoesArray.length < 1){
            return '-'
        }

        let count = 0
        console.log(manutencoesArray)
        manutencoesArray?.map(item => {
            const valor_mdo = item?.valor_mdo.replace(',', '.')
            count = count + parseFloat(valor_mdo)
            console.log('parseFloat(item?.valor_mdo): ', parseFloat(item?.valor_mdo))
        })

        const stringCount = count + ''

        const countVirgula = stringCount.replace('.', ',')
        return countVirgula
    }

    return (
        <div className='p-2 pr-3 bg-slate-600'>
            <div className='shadow-lg p-4 rounded-lg flex align-top justify-between'>
                <div className='flex'>
                    <CalendarDaysIcon className='text-tomEscuro w-6 h-6 m-[2px] mr-2'/>
                    <div className='card'>
                        <h2 className="card-title text-tomEscuro">Manutenções Realizadas</h2>
                        <div className='card-body p-3'>
                            <div className='text-lg'>
                                <span className='text-cinza'>Esse Mes: </span>
                                <span className='font-semibold text-azul'>
                                    {manutencoesPeriodoTempo('mes', authData?.manutencoes).length}
                                </span>
                            </div>
                            <div className='text-lg'>
                                <span className='text-cinza'>Essa Ano: </span>
                                <span className='font-semibold text-azul'>
                                    {manutencoesPeriodoTempo('ano', authData?.manutencoes).length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex shadow-md rounded-xl'>
                    <CurrencyDollarIcon className='text-tomEscuro w-6 h-6 m-[2px] mr-2'/>
                    <div className='card'>
                        <h2 className="card-title text-tomEscuro">Arrecadação</h2>
                        <div className='card-body p-3'>
                            <div className='text-lg'>
                                <span className='text-cinza'>Esse Mes: </span>
                                <span className='font-semibold text-azul'>
{/*                                     R$ {calculaTotalArrecadado(manutencoesPeriodoTempo('mes', authData?.manutencoes))} */} R$ 2 354,00
                                </span>
                            </div>
                            <div className='text-lg'>
                                <span className='text-cinza'>Essa Ano: </span>
                                <span className='font-semibold text-azul'>
{/*                                     R$ {calculaTotalArrecadado(manutencoesPeriodoTempo('ano', authData?.manutencoes))} */} R$ 13 424,34
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
                            R$ {calculaTotalArrecadado(authData?.manutencoes)}
                        </div>
                        <div className='text-white font-medium mx-auto'>Total já Recebido</div>
                    </div>
                </div>
                <div className='flex gap-6 border-2 border-tomEscuro rounded-xl px-4 py-1'>
                    <WrenchScrewdriverIcon className='w-10 h-10 text-tomEscuro my-auto'/>
                    <div className='text-end'>
                        <div className='text-tomEscuro font-medium text-lg text-start'>Total de</div>
                        <div className='text-azul font-bold text-2xl justify-center text-center'>{authData.manutencoes.length}</div>
                        <div className='text-tomEscuro font-medium text-lg text-end'>Manutenções</div>
                        <div className='text-tomEscuro font-medium text-lg text-end'>Realizadas</div>
                    </div>
                </div>
            </div>
            <div className='flex md:flex-row flex-col'>
                <div className='w-full p-10 md:p-0 md:w-1/2 justify-center flex flex-col'>
                <h2 className="card-title text-tomEscuro mt-8 mb-4 ml-1"> <WrenchScrewdriverIcon className='w-5 h-5 text-tomEscuro my-auto'/>Ultimas Manutenções Realizadas</h2>
                <table className="table table-zebra w-full text-xs md:text-sm">

                    <thead>
                    <tr >
{/*                         <th className='z-0'>Descrição</th> */}
                        {/* <th>Ciclista</th> */}
                        <th>Fotos</th>
                        <th className='hidden xl:table-cell'>Data</th>
                        <th>Valor</th>
                        <th>Detalhes</th>
                    </tr>
                    </thead>

                    <tbody>
                    {authData.manutencoes?.reverse().slice(0, 5).map((manutencao, index) => {
                        return(
                        <tr key={index}>
                            {/* <td className='max-w-[174px] overflow-hidden md:text-sm'><p className=''>{manutencao.description?.length > 69 ? manutencao.description.slice(0, 67) + '...' : manutencao.description}</p></td> */}
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
                        
                        <td className='hidden xl:table-cell'>{dateFormat(manutencao.created_at)}</td>
                        <td className='text-nowrap'>R$ {manutencao.valor_mdo} </td>
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
                    <button onClick={() => router.push('/sistema/lojista/manutencoes')} className='btn btn-secondary mt-5 w-fit mx-auto'>Todas as Manutenções</button>
                </div>
                <div className='ml-5 flex flex-col p-10 md:p-0 md:w-1/2'>
                    <h2 className="card-title text-tomEscuro mt-8 mb-4 ml-1"> <SwatchIcon className='w-5 h-5 text-tomEscuro my-auto'/>Manutenções Padrões</h2>
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Nome da Manutenção</th>
                                <th className='hidden xl:table-cell'>Preço</th>
                                <th>Descrição</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {authData.manutencoespadroes?.slice(0, 5).map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className='hidden xl:table-cell'>R$ {item.price}</td>
                                    <td className='max-w-[174px]'>{item.description?.length > 29 ? item.description.slice(0, 27) + '...' : item.description}</td>
                                    <td className={`flex text-white flex-col sm:flex-row md:flex-col lg:flex-row py-8`}>
                                        <ModalManutencoesPadroes type='edit' item={item}/>
                                        <ModalManutencoesPadroes type='delete' item={item}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => router.push('/sistema/lojista/manutencoespadroes')} className='btn btn-secondary mt-5 w-fit mx-auto'>Todas as Manutenções Padrões</button>
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