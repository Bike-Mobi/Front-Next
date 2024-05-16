'use client'

import Alert from '@/components/sistema/Alert'
import EmailInputLogin from '@/components/sistema/inputs/EmailInputLogin'
import LoginButton from '@/components/sistema/inputs/LoginButton'
import PasswordInputLogin from '@/components/sistema/inputs/PasswordInputsLogin'
import { AuthContext } from '@/contexts/Auth'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const Login = () => {

    const { signIn, error, isLoading } = useContext(AuthContext)

    const [name, setName] = useState()
    const [email, setEmail] = useState('ruan@gmail.com')
    const [senha, setSenha] = useState('password')

    const router = useRouter()

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleSenha = (e) => setSenha(e.target.value)

    console.log('api back: ', process.env.NEXT_PUBLIC_API)

    return (
        <div className={`flex h-screen items-center justify-center`}>


            <div className={`hidden md:block md:w-1/2 lg:w-1/2`}>
                <img width={500} height={500} src="./auth-img.png" alt="" className={`h-screen w-full object-cover`} />
            </div>

            <div className='md:hidden absolute -z-20'>
                <img src="./auth-img-mobile.png" alt="" className={`h-screen w-full object-cover`} />
            </div>
            <button onClick={() => router.push('/')} className='absolute top-5 left-5'><ArrowLeftIcon className='text-white h-10 w-10'/></button>
            <div className={`flex flex-col m-auto px-10 md:max-w-lg mb:w-1/2 lg:w-1/2`}>
                <div className={`mb-5`}>
                    <h1 className={`text-4xl md:text-5xl font-bold text-tomEscuro`}>Login</h1>
                    <div className={`text-cinza text-base md:text-xl mt-12 md:mt-5`}> Bem Vindo ao <span className='font-bold'>Bike Mobi</span>, faça login na sua conta abaixo</div>
                </div>

                <Alert error={error} />

                <div className={`flex flex-col mt-6`}>
                    <EmailInputLogin name="E-mail" width="w-full" onChange={handleEmail} />
                    <PasswordInputLogin name="Senha" width="w-full" onChange={handleSenha} />
                </div>    
                
                <LoginButton onClick={() => signIn(email, senha)} isLoading={isLoading} />

                <div className='text-cinza mt-12 md:mt-8'>Ainda não é cadastrado?</div>
                <button className={`w-full bg-tomEscuro font-bold text-white rounded-lg px-4 py-3 mt-4 md:mt-2 flex justify-center`} onClick={() => router.push('/autenticacao/precadastro')}>
                    <div>Cadastre-se</div>
                </button>
            </div>

        </div>
    )
}

export default Login