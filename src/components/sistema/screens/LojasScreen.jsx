'use client'
import { ApiContext } from '@/contexts/Api'
import React, { useContext, useEffect, useState } from 'react'
import CardLoja from '../modals/CardLoja'
import { useRouter } from 'next/navigation'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const LojasScreen = (props) => {

    const [search, setSearch] = useState('')
    const buscaLojas = props.lojas

    const handleSearchChange = (event) => setSearch( event.target.value)

    let lojasFiltradas = buscaLojas?.filter((item) => {
        
        return item?.name?.toLowerCase()?.includes(search?.toLowerCase()) || item?.city?.toLowerCase()?.includes(search?.toLowerCase()) || item?.neighborhood?.toLowerCase()?.includes(search?.toLowerCase())
    })

    return(
        <div>
            <div className='m-14'>
                <div className='relative flex items-end'>
                    <input placeholder='Nome, Cidade ou Bairro' className='bg-cinzaClaro border rounded-md p-[10px] w-80 border-neutral-400 focus:outline-none' type="text" onChange={handleSearchChange} />
                    <MagnifyingGlassIcon className='w-6 h-6 text-neutral-700 absolute left-72 lg:right-2 bottom-3'/>
                </div>
            </div>
            <div className={`mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2`}>
                {lojasFiltradas?.map((item, index) => {
                    return (
                        <div key={index} className={`flex justify-center items-center`}>
                            <CardLoja data={item}/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LojasScreen