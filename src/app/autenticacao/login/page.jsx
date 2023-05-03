'use client'

import EmailInput from '@/components/sistema/inputs/EmailInput'
import PasswordInput from '@/components/sistema/inputs/PasswordInputs'
import TextInput from '@/components/sistema/inputs/TextInput'
import React, { useState } from 'react'

const Login = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleSenha = (e) => setSenha(e.target.value)

    return (
        <div className={`flex h-screen items-center justify-center`}>

            <div className={`hidden md:block md:w-1/2 lg:w-1/2`}>
                <img src="auth-img.png" alt="" className={`h-screen w-full object-cover`} />
            </div>

            <div className='md:hidden absolute -z-20'>
                <img src="auth-img-mobile.png" alt="" className={`h-screen w-full object-cover`} />
            </div>
            <div className={`flex flex-col m-auto px-10 md:max-w-lg mb:w-1/2 lg:w-1/2`}>
                <div className={`mb-5`}>
                    <h1 className={`text-4xl md:text-5xl font-bold text-tomEscuro`}>Login</h1>
                    <div className={`text-cinza text-base md:text-xl mt-12 md:mt-5`}> Bem Vindo ao <span className='font-bold'>Bike Mobi</span>, faça login na sua conta abaixo</div>
                </div>

                <div className={`flex flex-col mt-6`}>
                    <EmailInput name="E-mail" width="w-full" onChange={handleEmail} />
                    <PasswordInput name="Senha" width="w-full" onChange={handleSenha} />
                </div>    
                
                <button  className={`w-full bg-azul font-bold text-white rounded-lg px-4 py-3 mt-10 md:mt-6`}>Login</button>

                <div className='text-cinza mt-12 md:mt-8'>Ainda não é cadastrado?</div>
                <button  className={`w-full bg-tomEscuro font-bold text-white rounded-lg px-4 py-3 mt-4 md:mt-2 flex justify-center`}>
                    <div>Cadastre-se</div>
                </button>
            </div>

        </div>
    )
}

export default Login