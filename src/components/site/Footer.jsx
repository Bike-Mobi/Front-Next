import Link from 'next/link'
import React from 'react'

const Footer = ({instagram, facebook, youtube, email}) => {
    return (
        <div>
            <div className='md:px-24 px-6 bg-azul w-full text-white text-base md:text-lg font-robot py-12 md:py-20 flex flex-col md:flex-row md:justify-between'>
                <div className='flex flex-col'>
                    <div>
                        Se inscreva na nossa <span className='font-bold'>Newsletter</span>
                    </div>
                    <input type="text" placeholder='Nome' className='text-tomEscuro mt-4 h-10 md:w-96 rounded-md focus:outline-none placeholder:text-slate-400 placeholder:font-dmsans px-4'/>
                    <input type="text" placeholder='E-mail' className='text-tomEscuro mt-4 h-10 md:w-96 rounded-md focus:outline-none placeholder:text-slate-400 placeholder:font-dmsans px-4'/>
                    <button className='bg-tomEscuro text-white md:text-base mt-4 font-bold rounded-lg px-8 py-2 w-fit'>Login</button>
                </div>
                <div className='mt-10 md:mt-0 flex flex-col gap-5'>
                    <div className='font-bold'>Suporte</div>
                    <Link href='/'>Termos de Uso</Link>
                    <Link href='/'>Politica de Privacidade</Link>
                </div>
                <div className='mt-10 md:mt-0 flex flex-col gap-5'>
                    <div className='font-bold'>Contato</div>
                    <div>{email}</div>
                    <div className='flex gap-10'>
                        <Link href={facebook ?? ''}>
                            <div className='bg-cinzaClaro w-10 h-10 flex justify-center items-center rounded-xl'>
                                <img src="Facebook-bk.png" alt="Icone do Facebook"/>
                            </div>
                        </Link>
                        <Link href={instagram ?? ''}>
                            <div className='bg-cinzaClaro w-10 h-10 flex justify-center items-center rounded-xl'>
                                <img src="Instagram-bk.png" alt="Icone do Instagram" />
                            </div>
                        </Link>
                        <Link href={youtube ?? ''}>
                            <div className='bg-cinzaClaro w-10 h-10 flex justify-center items-center rounded-xl'>
                                <img src="YouTube-bk.png" alt="Icone do LinkedIn" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='bg-white flex justify-center my-4'>
                <div className='font-dmsans font-bold text-cinza mt-auto tracking-wider mr-2'>
                    Compatível com
                </div>
                <img src="strava.png" alt="Logo Strava" className='h-6 md:h-auto'/>
            </div>
        </div>
    )
}

export default Footer