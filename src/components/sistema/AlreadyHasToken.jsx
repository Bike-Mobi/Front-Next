import { AuthContext } from '@/contexts/Auth'
import { initialRoute } from '@/router/initialSystemRoute'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const AlreadyHasToken = () => {

    const {routeAccess, signOut} = useContext(AuthContext)

    const router = useRouter()

    return (
        <section class="bg-white">
            <div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
                <div>
                    <p class="text-sm font-medium text-azul dark:text-blue-400">Token encontrado</p>
                    <h1 class="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Você já está logado!</h1>
                    <p class="mt-4 text-gray-500">Parece que já existe um token de usuario neste navegador, caso queira cadastrar um novo usuario ou entrar no sistema atravez de outro usuario, faça o logout do usuario atual.</p>

                    <div class="flex items-center mt-6 gap-x-3">
                        <button class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:rotate-180">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>

                            <span onClick={() => router.push(initialRoute[routeAccess])}>Voltar ao sistema</span>
                        </button>

                        <button onClick={() => signOut()} class="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-azul rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AlreadyHasToken