'use client'

import Alert from '@/components/sistema/Alert'
import RadioInput from '@/components/sistema/inputs/RadioInput'
import { AuthContext } from '@/contexts/Auth'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

const PreCadastro = () => {

    const { defineType, error } = useContext(AuthContext)

    const [type, setType] = useState()

    const handleType = (e) => {
        setType(e.target.value)
    }

    return (
        <div >
            <div className='bg-azul py-auto sticky top-0'>
                <div className='flex'>
                    <Link href={'/autenticacao/login'} className='ml-10 flex'>
                        <ArrowLeftIcon className='w-8 py-auto text-white'/>
                    </Link>
                    <div className='px-10 py-5 font-robot font-medium text-3xl text-white'>Registre-se</div>
                </div>
                <div className='rounded-t-xl h-4 bg-white'></div>
            </div>
            <div className='flex flex-col h-[80vh] justify-center items-center'>
                <div className='flex mb-10'>
                    <Alert error={error} />
                </div>
                <div className='border-2 border-azul rounded-2xl p-10 md:px-20 md:py-10'>
                    <div className='text-azul font-bold text-2xl mb-5'>Bike Mobi</div>
                    <RadioInput name='Em qual tipo você mais se enquadra?'
                        onChange={handleType}
                        items={[
                            { name: 'Ciclista' },
                            { name: 'Lojista' }
                        ]}
                    />
                    <button className='btn mt-10' onClick={() => defineType(type)}>Confirmar</button>
                </div>
            </div>
        </div>
    )
}

export default PreCadastro