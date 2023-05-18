'use client'

import Alert from '@/components/sistema/Alert'
import FormCiclista from '@/components/sistema/screens/FormCiclista'
import { AuthContext } from '@/contexts/Auth'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Cadastro = () => {

    const { typeRegister, newUser, error } = useContext(AuthContext)

    const router = useRouter()

    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState()
    
    useEffect(() => {
        if (typeRegister == null) {
            router.back()
        }
    }, [])

    const createAcount = async (data) => {
        const recive = await newUser(data)
        console.log(recive)
            if (recive) {
                setShowModal(true)

                setModalContent(
                    <div className='flex flex-col items-center'>
                        <h3 className="font-bold text-lg">Bem Vindo ao <span className='text-azul'>Bike Mobi</span>!</h3>
                        <CheckCircleIcon className='text-azul w-32'/>
                        <p className='text-center font-medium'>Seu Registro foi um Sucesso! Continue para a realização do Login e apreveite o Bike Mobi</p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => router.push('/autenticacao/login')}>Login</button>
                        </div>
                    </div>
                )
            } else {
                setShowModal(true)

                setModalContent(
                    <div className='flex flex-col items-center'>
                        <h3 className="font-bold text-lg">Erro</h3>
                        <XCircleIcon className='text-error w-32'/>
                        <p className='text-center font-medium'>Parece que a sua tentativa de Registro não funcionou, confira suas credenciais</p>
                        <div className="modal-action">
                            <button className="btn" onClick={() => {
                                setShowModal(false)
                                setModalContent(undefined)
                            }}>Tente Novamente</button>
                        </div>
                    </div>
                )
            }
    }

    return (
        <div>
            <div className='bg-azul py-auto sticky top-0'>
                <div className='flex'>
                    <Link href={'/autenticacao/pre-cadastro'} className='ml-10 flex'>
                        <ArrowLeftIcon className='w-8 py-auto text-white'/>
                    </Link>
                    <div className='px-10 py-5 font-robot font-medium text-3xl text-white'>Registre-se</div>
                </div>
                <div className='rounded-t-xl h-4 bg-white'></div>
            </div>
            <div className='mx-10 md:mx-52'>
                <Alert error={error}/>
            </div>

            <input checked={showModal} type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    {modalContent}
                </div>
            </div>

            {typeRegister == 'Cyclist' ? (
                <FormCiclista register={true} onClick={createAcount} />
            ): (
                null
            )}
        </div>
    )
}

export default Cadastro