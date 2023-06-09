'use client'
import React, {useEffect, useState, useContext } from 'react'
import { TrashIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ModalManutencoes from '../modals/ModalManutencoes';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from 'axios'
import ModalDetalhesManutencao from '../modals/ModalDetalhesManutencao';
import { ApiContext } from '@/contexts/Api';

const ManutencoesScreen = (props) => {

  const {instance} = useContext(ApiContext)
  const [idModal, setIdModal] = useState('')
  const [search, setSearch] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')

  const handleDateChange1 = (event) => setDate1( event.target.value)
  const handleDateChange2 = (event) => setDate2( event.target.value)
  const handleSearchChange = (event) => setSearch( event.target.value)


  const [buscaCiclista, setBuscaCiclista] = useState()
  const [buscaManutencao, setBuscaManutencao] = useState()

  useEffect(() => {
    instance.get("/users")
    .then((response) => setBuscaCiclista(response.data))

    instance.get("/maintence")
    .then((response) => setBuscaManutencao(response.data.data))
  }, [])

  const ciclistas = buscaCiclista?.data.filter((item) => {
      return item.type == "Cyclist"
  }
  )


  let manutencoesFiltradas = buscaManutencao?.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase())
  })

  manutencoesFiltradas = manutencoesFiltradas?.filter((item) => {
    if(date1 == '' || date2 == ''){
      return item
    }
    else{
      return (item.updated_at >= date1 && item.updated_at <= date2)
    }
  })


  return ( 
    <div className={`mt-16 xl:mt-9 px-5 sm:px-10 lg:px-14 =`}>

      <div className={`w-full flex flex-col-reverse xl:flex-row xl:justify-between xl:items-end`}>
        <label htmlFor={`my-modal-${idModal}`} onClick={() => setIdModal(null)} className="btn bg-tomEscuro hover:opacity-90 hover:bg-tomEscuro text-white w-60">+ Adicionar Manutenção</label>
        {/* <button onClick={() => setIdModal('-1')} className="btn btn-primary text-white right-0 absolute">Adicionar Manutenção</button> */}
        {idModal == null ? (
          <ModalManutencoes
            data={null}
            idModal={idModal}
            ciclistas={ciclistas}
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
        <table className="table table-zebra w-full my-20 text-xs md:text-sm lg:text-base">

          <thead>
            <tr >
              <th className='z-0'>Título</th>
              {/* <th>Ciclista</th> */}
              <th>Data</th>
              <th className='hidden md:table-cell'>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {manutencoesFiltradas?.map((manutencao, index) => {
              return(
              <tr key={index}>
                <td className='max-w-[174px] overflow-hidden'>{manutencao.title}</td>
                {/* <td>Manutencoes ainda nao esta vinculada com um ciclista/bicicleta na api </td> */}
                <td>{manutencao.updated_at.slice(0, 10)}</td>
                <td className='hidden md:table-cell'>R$ { (manutencao.value).toFixed(2).replace(/\./, ',') } </td>
                <td className={`flex text-white flex-col sm:flex-row md:flex-col lg:flex-row`}>
                  {/* <label htmlFor={`my-modal-${manutencao.id}d`} onClick={() => setIdModal(manutencao.id+'d')} className='cursor-pointer'><DocumentTextIcon className={`w-8 h-w-8 hover:opacity-60 p-1 mx-1 rounded-md bg-success`}/></label> */}
                  <ModalDetalhesManutencao data={manutencao}></ModalDetalhesManutencao>
                  <label htmlFor={`my-modal-${manutencao.id}e`} onClick={() => setIdModal(manutencao.id+'e')} className='cursor-pointer mt-1 sm:mt-0 md:mt-1 lg:mt-0'><PencilSquareIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-azul p-1 mx-1 rounded-md'/></label>
                  <label htmlFor={`my-modal-${manutencao.id}D`} onClick={() => setIdModal(manutencao.id+'D')} className='cursor-pointer mt-1 sm:mt-0 md:mt-1 lg:mt-0'><TrashIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-error p-1 mx-1 rounded-md'/></label>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {buscaManutencao?.map((manutencao, index) => (
        manutencao.id == idModal?.replace(/\D/g, '') ?(
          <div key={index}>
            <ModalManutencoes
              data={manutencao}
              idModal={idModal}
              ciclistas={ciclistas}
            />
          </div>
        ):(null)
      ))}


    </div>
  )
}

export default ManutencoesScreen