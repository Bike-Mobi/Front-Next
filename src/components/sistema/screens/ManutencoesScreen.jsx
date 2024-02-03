'use client'
import React, {useEffect, useState, useContext } from 'react'
import { TrashIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ModalManutencoes from '../modals/ModalManutencoes';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from 'axios'
import ModalDetalhesManutencao from '../modals/ModalDetalhesManutencao';
import { ApiContext } from '@/contexts/Api';
import LoadingComponent from '../loadingComponent';
import { AuthContext } from '@/contexts/Auth';
import ModalManutencoesPadroes from '../modals/ModalManuntecoesPadroes';

const ManutencoesScreen = (props) => {

  const { authData } = useContext(AuthContext)

  const [idModal, setIdModal] = useState('')
  const [search, setSearch] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')

  const handleDateChange1 = (event) => setDate1( event.target.value)
  const handleDateChange2 = (event) => setDate2( event.target.value)
  const handleSearchChange = (event) => setSearch( event.target.value)


  // const [allBicicletas, setAllBicicletas] = useState()
  const [buscaManutencao, setBuscaManutencao] = useState()

  useEffect(() => {
    setBuscaManutencao(authData.manutencoes)
  }, [])

  // const ciclistas = buscaCiclista?.filter((item) => {
  //     return item.type == "Cyclist"
  // }
  // )

  // console.log('all bicicletas:', allBicicletas)
  let manutencoesFiltradas = buscaManutencao?.filter((item) => {
    console.log(item)
    return item?.description?.toLowerCase()?.includes(search?.toLowerCase())
  })
  // let manutencoesFiltradas = buscaManutencao

  manutencoesFiltradas = manutencoesFiltradas?.filter((item) => {
    if(date1 == '' || date2 == ''){
      return item
    }
    else{
      return (item.updated_at >= date1 && item.updated_at <= date2)
    }
  })

  const dateFormat = (date) => {
    const dia = date.slice(8, 10)
    const mes = date.slice(5, 7)
    const ano = date.slice(0, 4)
    return dia + '/' + mes + '/' + ano
  }

  return ( 
    <div className={`mt-16 xl:mt-9 px-5 sm:px-10 lg:px-14 =`}>

      <div className={`w-full flex flex-col-reverse xl:flex-row xl:justify-between xl:items-end`}>
        {props.create ? (
          <label htmlFor={`my-modal-${idModal}`} onClick={() => setIdModal(null)} className="btn bg-tomEscuro hover:opacity-90 hover:bg-tomEscuro text-white w-60">+ Adicionar Manutenção</label>
        ) : null}
        {/* <button onClick={() => setIdModal('-1')} className="btn btn-primary text-white right-0 absolute">Adicionar Manutenção</button> */}
        {idModal == null && props.create ? (
          <ModalManutencoes
            data={null}
            idModal={idModal}
            lojaId={authData.type.id ? authData.type.id : null}
          />
        ):(null)}

        <div className={`flex flex-col lg:flex-row ml-0 xl:ml-2 mb-10 xl:mb-0 xl:justify-around`}>
          <div className='flex flex-col mr-4 xl:mr-2 w-40 mb-4 lg:mb-0'>
            <label className='mb-1' htmlFor="initial-date">Data Inicial</label>
            <input id='initial-date' name='initial-date' className='border rounded-md border-cinza p-[10px] focus:outline-none' type="date" onChange={handleDateChange1}/>
          </div>
          <div className='flex flex-col mr-4 xl:mr-2 w-40 mb-4 lg:mb-0'>
            <label className='mb-1' htmlFor="initial-date">Data Final</label>
            <input className='border rounded-md border-cinza p-[10px] focus:outline-none' type="date" onChange={handleDateChange2}/>
          </div>
          <div className='relative flex items-end lg:ml-auto xl:ml-0'>
            <input className='bg-cinzaClaro border rounded-md p-[10px] w-64 border-neutral-400 focus:outline-none' type="text" onChange={handleSearchChange} />
            <MagnifyingGlassIcon className='w-6 h-6 text-neutral-700 absolute left-56 lg:right-2 bottom-3'/>
          </div>
        </div>
      </div>


        <div className="overflow-x-auto "> {/* flex justify-center */}
        { !buscaManutencao ?
            <LoadingComponent/>
          :
            <table className="table table-zebra w-full my-20 text-xs md:text-sm lg:text-base">

              <thead>
                <tr >
                  <th className='z-0'>Descrição</th>
                  {/* <th>Ciclista</th> */}
                  <th>Fotos</th>
                  <th>Data</th>
                  <th className='hidden md:table-cell'>Valor</th>
                {props.create ? (
                  <th>Ações</th>
                ) : (
                  <th>Detalhes</th>
                )}
                </tr>
              </thead>

              <tbody>
                {manutencoesFiltradas?.map((manutencao, index) => {
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
                    
                    <td>{dateFormat(manutencao.created_at)}</td>
                    <td className='hidden md:table-cell'>R$ {manutencao.valor_mdo} </td>
                      {props.create ? (
                        <td className={`text-white grid grid-cols-2 lg:flex lg:flex-row py-8`}>
                          {/* <label htmlFor={`my-modal-${manutencao.id}d`} onClick={() => setIdModal(manutencao.id+'d')} className='cursor-pointer'><DocumentTextIcon className={`w-8 h-w-8 hover:opacity-60 p-1 mx-1 rounded-md bg-success`}/></label> */}
                          {/* <ModalDetalhesManutencao data={manutencao}></ModalDetalhesManutencao> */}
                          <label htmlFor={`my-modal-${manutencao.id}det`} onClick={() => setIdModal(manutencao.id+'det')} className='cursor-pointer mt-1 md:mt-1 lg:mt-0'><DocumentTextIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-success p-1 mx-1 rounded-md'/></label>
                          <label htmlFor={`my-modal-${manutencao.id}e`} onClick={() => setIdModal(manutencao.id+'e')} className='cursor-pointer mt-1 md:mt-1 lg:mt-0'><PencilSquareIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-azul p-1 mx-1 rounded-md'/></label>
                          <label htmlFor={`my-modal-${manutencao.id}D`} onClick={() => setIdModal(manutencao.id+'D')} className='cursor-pointer mt-1 md:mt-1 lg:mt-0'><TrashIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-error p-1 mx-1 rounded-md'/></label>
                          <ModalManutencoesPadroes type='add' item={{id: manutencao.id, price: manutencao.valor_mdo, description: manutencao.description }}/>
                        </td>
                      ) : (
                        <td className={`flex text-white flex-col sm:flex-row md:flex-col lg:flex-row py-8`}>
                          <label htmlFor={`my-modal-${manutencao.id}det`} onClick={() => setIdModal(manutencao.id+'det')} className='cursor-pointer mt-1 md:mt-1 lg:mt-0'><DocumentTextIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-success p-1 mx-1 rounded-md'/></label>
                        </td>
                    )}
                  </tr>
                  )
                })}
              </tbody>
            </table>
        }
      </div>

      {buscaManutencao?.map((manutencao, index) => (
        manutencao.id == idModal?.replace(/\D/g, '') ?(
          <div key={index}>
            <ModalManutencoes
              data={manutencao}
              idModal={idModal}
              // ciclistas={ciclistas}
            />
          </div>
        ):(null)
      ))}


    </div>
  )
}

export default ManutencoesScreen