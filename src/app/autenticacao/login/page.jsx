'use client'

import EmailInputLogin from '@/components/sistema/inputs/EmailInputLogin'
import LoginButton from '@/components/sistema/inputs/LoginButton'
import PasswordInputLogin from '@/components/sistema/inputs/PasswordInputsLogin'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext, useState } from 'react'

const Login = () => {

    const { signIn, error, isLoading } = useContext(AuthContext)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()

    const handleName = (e) => setName(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleSenha = (e) => setSenha(e.target.value)

    let errorMessage
    error ? errorMessage = 'block' : errorMessage = 'hidden'

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

                <div className={`alert alert-warning shadow-lg ${errorMessage}`}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>{error?.message}</span>
                    </div>
                </div>

                <div className={`flex flex-col mt-6`}>
                    <EmailInputLogin name="E-mail" width="w-full" onChange={handleEmail} />
                    <PasswordInputLogin name="Senha" width="w-full" onChange={handleSenha} />
                </div>    
                
                <LoginButton onClick={() => signIn(email, senha)} isLoading={isLoading} />

                <div className='text-cinza mt-12 md:mt-8'>Ainda não é cadastrado?</div>
                <button className={`w-full bg-tomEscuro font-bold text-white rounded-lg px-4 py-3 mt-4 md:mt-2 flex justify-center`}>
                    <div>Cadastre-se</div>
                </button>
            </div>

        </div>
    )
}

export default Login