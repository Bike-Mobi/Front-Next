'use client'

import Alert from '@/components/sistema/Alert'
import FormCiclista from '@/components/sistema/screens/FormCiclista'
import FormLojista from '@/components/sistema/screens/FormLojista'
import { ApiContext } from '@/contexts/Api'
import { AuthContext } from '@/contexts/Auth'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const Cadastro = () => {

    const { typeRegister, signIn, error } = useContext(AuthContext)
    const {instance} = useContext(ApiContext)

    const router = useRouter()

    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState()

    const [idUserCreated, setIdUserCreated] = useState()
    console.log('id user created: ', idUserCreated)
    
    useEffect(() => {
        if (typeRegister == null) {
            router.back()
        }
        console.log('type register: ',typeRegister)
    }, [])

    const openModal = (success) => {
        if (success) {
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

    const createType = async (userId, data) => {
        const loginResp = await instance.post('/login', {
            email: data.user.email,
            password: data.user.password
        })
        console.log('login resp: ', loginResp)
        instance.defaults.headers.common['Authorization'] = `Bearer ${loginResp.data.access_token}`


        const formDataType = new FormData();
        console.log('user_id', userId)
        formDataType.append('user_id', userId);

        for (const key in data.type) {
            if (data.type[key] != undefined) {
                formDataType.append(key, data.type[key]);
            }
        }

        if (typeRegister == 'Cyclist') {
            try {
                await instance.postForm('/ciclista', formDataType)
                .then(openModal(true))
                
            } catch (error) {
                console.error(error)
                openModal(false)
            }
        } else {
            try {
                await instance.postForm('/loja', formDataType)
                .then(openModal(true))
                .catch(error => console.error(error))
                 // esta URL ainda não foi feita
                
            } catch (error) {
                console.error(error)
                openModal(false)
            }
        }
    }

    const createAccount = async (data) => {
        console.log('data: ',data)
        const formDataUser = new FormData();
        formDataUser.append('type', typeRegister);
        formDataUser.append('is_admin', 0);
        for (const key in data.user) {
            if (data.user[key] != undefined) {
                formDataUser.append(key, data.user[key]);
                console.log(key, data.user[key])
            }
        }
        try {
            await instance.postForm('/register', formDataUser).then(resp => {
               createType(resp.data.id, data) 
            })
        } catch (error) {
            console.error(error)
            openModal(false)
        }
    }

    // const createAcount = async (data) => {
    //     // const recive = await newUser(data)
    //     // console.log(recive)
    //     if (typeRegister == 'Cyclist') {
            
    //     } else {
            
    //     }
    //     if (recive) {
    //         setShowModal(true)

    //         setModalContent(
    //             <div className='flex flex-col items-center'>
    //                 <h3 className="font-bold text-lg">Bem Vindo ao <span className='text-azul'>Bike Mobi</span>!</h3>
    //                 <CheckCircleIcon className='text-azul w-32'/>
    //                 <p className='text-center font-medium'>Seu Registro foi um Sucesso! Continue para a realização do Login e apreveite o Bike Mobi</p>
    //                 <div className="modal-action">
    //                     <button className="btn" onClick={() => router.push('/autenticacao/login')}>Login</button>
    //                 </div>
    //             </div>
    //         )
    //     } else {
    //         setShowModal(true)

    //         setModalContent(
    //             <div className='flex flex-col items-center'>
    //                 <h3 className="font-bold text-lg">Erro</h3>
    //                 <XCircleIcon className='text-error w-32'/>
    //                 <p className='text-center font-medium'>Parece que a sua tentativa de Registro não funcionou, confira suas credenciais</p>
    //                 <div className="modal-action">
    //                     <button className="btn" onClick={() => {
    //                         setShowModal(false)
    //                         setModalContent(undefined)
    //                     }}>Tente Novamente</button>
    //                 </div>
    //             </div>
    //         )
    //     }
    // }

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
                <FormCiclista register={true} onClick={createAccount} />
            ): (
                <FormLojista register={true} onClick={createAccount} />
            )}
        </div>
    )
}

export default Cadastro