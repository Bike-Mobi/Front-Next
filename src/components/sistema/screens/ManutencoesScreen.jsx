'use client'
import React, {useEffect, useState } from 'react'
import { TrashIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ModalManutencoes from '../modals/ModalManutencoes';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import axios from 'axios'
import ModalDetalhesManutencao from '../modals/ModalDetalhesManutencao';

const ManutencoesScreen = (props) => {

  const [idModal, setIdModal] = useState('')
  const [search, setSearch] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const windowWidth = window.innerWidth;

  const handleDateChange1 = (event) => setDate1( event.target.value)
  const handleDateChange2 = (event) => setDate2( event.target.value)
  const handleSearchChange = (event) => setSearch( event.target.value)


  const [buscaCiclista, setBuscaCiclista] = useState()

  useEffect(() => {
    axios.get("http://localhost:8000/api/users")
    .then((response) => setBuscaCiclista(response.data))
  }, [])

  const ciclistas = buscaCiclista?.data.filter((item) => {
      return item.type == "Cyclist"
  }
  )

  const [buscaManutencao, setBuscaManutencao] = useState()

  useEffect(() => {
    axios.get("http://localhost:8000/api/maintence")
    .then((response) => setBuscaManutencao(response.data.data))
  }, [])

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
    <div className={`mt-16 xl:mt-9 px-10 lg:px-14`}>

      <div className={`relative w-full flex flex-col xl:justify-end`}>
        <label htmlFor={`my-modal-${idModal}`} onClick={() => setIdModal(null)} className="btn bg-tomEscuro hover:opacity-90 hover:bg-tomEscuro text-white left-0 absolute">Adicionar Manutenção</label>
        {/* <button onClick={() => setIdModal('-1')} className="btn btn-primary text-white right-0 absolute">Adicionar Manutenção</button> */}
        {idModal == null ? (
          <ModalManutencoes
            data={null}
            idModal={idModal}
            ciclistas={ciclistas}
          />
        ):(null)}

        <div className={`flex flex-col lg:flex-row ml-0 xl:ml-60 xl:justify-around mt-24 xl:mt-0 `}>
          <div className='flex flex-col mr-4 xl:mr-0 w-40 mb-4 lg:mb-0'>
            <label className='mb-1' htmlFor="initial-date">Data Inicial</label>
            <input id='initial-date' name='initial-date' className='border rounded-md border-cinza p-[10px] focus:outline-none' type="date" onChange={handleDateChange1}/>
          </div>
          <div className='flex flex-col mr-4 xl:mr-0 w-40 mb-4 lg:mb-0'>
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
            <tr className='p-0'>
              <th>Título</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {manutencoesFiltradas?.map((manutencao, index) => {
              return(
              <tr key={index} className='p-0'>
                <td className='max-w-[174px] overflow-hidden'>{manutencao.title}</td>
                <td>{ windowWidth <= 457 ? manutencao.updated_at.slice(0, 10) : manutencao.updated_at}</td>
                <td>{manutencao.value}</td>
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
        manutencao.id == idModal?.slice(0, 1) ?(
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