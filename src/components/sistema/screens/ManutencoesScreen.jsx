'use client'
import React, {useEffect, useState} from 'react'
import { TrashIcon, PencilSquareIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import ModalManutencoes from '../modals/ModalManutencoes';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const usuarios = [
  {
    id: '1',
    name: 'João',
    cpf: '123.456.789-00',
    email: 'João@gmail.com'
  },
  {
    id: '2',
    name: 'Maria',
    cpf: '123.456.789-00',
    email: 'Maria@gmail.com'
  },
  {
    id: '3',
    name: 'José',
    cpf: '123.456.789-00',
    email: 'José@gmail.com'
  },
  {
    id: '4',
    name: 'Pedro',
    cpf: '123.456.789-00',
    email: 'Pedro@gmail.com'
  },
  {
    id: '5',
    name: 'Ana',
    cpf: '123.456.789-00',
    email: 'Ana@gmail.com'
  }
]

const ManutencoesScreen = (props) => {

  const manutencoes = props.manutencoes;

  const [idModal, setIdModal] = useState('')
  const [search, setSearch] = useState('')
  const [date1, setDate1] = useState('')
  const [date2, setDate2] = useState('')
  const [manutencoesFiltradas, setManutencoesFiltradas] = useState(manutencoes)

  const handleDateChange1 = (event) => setDate1( event.target.value)
  const handleDateChange2 = (event) => setDate2( event.target.value)
  const handleSearchChange = (event) => setSearch( event.target.value)


  useEffect(() => {
      setManutencoesFiltradas( manutencoes.filter((item) => {
        if(date1 == '' || date2 == ''){
          return item
        }
        else{
          return (item.date >= date1 && item.date <= date2)
        }
      })
      )
  }, [date1, date2])

  useEffect(() => {
    setManutencoesFiltradas( manutencoes.filter((item) => {
      return item.user.toLowerCase().includes(search.toLowerCase())
    })
    )
  }, [search])


  return ( 
    <div className={`mt-16 px-10 lg:px-20`}>

      <div className={`relative w-full flex flex-col`}>
        <label htmlFor={`my-modal-${idModal}`} onClick={() => setIdModal(null)} className="btn bg-tomEscuro hover:opacity-90 hover:bg-tomEscuro text-white left-0 absolute">Adicionar Manutenção</label>
        
        {/* <button onClick={() => setIdModal('-1')} className="btn btn-primary text-white right-0 absolute">Adicionar Manutenção</button> */}
        {idModal == null ? (
          <ModalManutencoes
            data={null}
            idModal={idModal}
            ciclistas={usuarios}
          />
        ):(null)}

        <div className={`flex ml-0 xl:ml-60 justify-between xl:justify-around mt-24 xl:mt-0`}>
          <input className='border rounded-md border-cinza p-[10px] focus:outline-none' type="date" onChange={handleDateChange1}/>
          <input className='border rounded-md border-cinza p-[10px] focus:outline-none' type="date" onChange={handleDateChange2}/>
          <div className='relative'>
            <input className='bg-cinzaClaro border rounded-md p-[10px] w-64 border-neutral-400 focus:outline-none' type="text" onChange={handleSearchChange} />
            <MagnifyingGlassIcon className='w-8 h-8 text-neutral-700 absolute right-1 top-2'/>
          </div>
        </div>
      </div>


        <div className="overflow-x-auto "> {/* flex justify-center */}
        <table className="table table-zebra w-full my-28">

          <thead>
            <tr>
              <th>Ciclista</th>
              <th>Data</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {manutencoesFiltradas.map((manutencao, index) => {
              return(
              <tr key={index}>
                <td className='max-w-[174px] overflow-hidden'>{manutencao.user}</td>
                <td>{manutencao.date}</td>
                <td>{manutencao.value}</td>
                <td className={`flex text-white`}>
                  <label htmlFor={`my-modal-${manutencao.id}d`} onClick={() => setIdModal(manutencao.id+'d')} className='cursor-pointer'><DocumentTextIcon className={`w-8 h-w-8 hover:opacity-60 p-1 mx-1 rounded-md bg-success`}/></label>
                  <label htmlFor={`my-modal-${manutencao.id}e`} onClick={() => setIdModal(manutencao.id+'e')} className='cursor-pointer'><PencilSquareIcon className='w-8 h-w-8 hover:opacity-60 bg-azul p-1 mx-1 rounded-md'/></label>
                  <label htmlFor={`my-modal-${manutencao.id}D`} onClick={() => setIdModal(manutencao.id+'D')} className='cursor-pointer'><TrashIcon className='w-8 h-w-8 hover:opacity-60 bg-error p-1 mx-1 rounded-md'/></label>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      
      {props.manutencoes.map((manutencao, index) => (
        manutencao.id == idModal?.slice(0, 1) ?(
          <div key={index}>
            <ModalManutencoes
              data={manutencao}
              idModal={idModal}
            />
          </div>
        ):(null)
      ))}


    </div>
  )
}

export default ManutencoesScreen