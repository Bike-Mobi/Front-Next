import Link from 'next/link'
import React from 'react'

const Author = () => {
    return (
        <div className='md:mx-24 mx-6 font-dmsans mb-8 md:my-20'>
            <div className='flex flex-col md:flex-row items-center md:w-fit md:mx-auto'>
                <img src="Roberlan.png" alt="Fundador" className='w-52 h-52 md:w-96 md:h-96 rounded-full'/>
                <div className='flex flex-col items-center md:items-start mt-8 md:ml-10'>
                    <div className='text-azul text-md md:text-lg font-bold uppercase'>
                        Idealizador do Projeto
                    </div>
                    <div className='text-tomEscuro text-4xl md:text-5xl font-bold mt-2'>
                        Roberlan Oliveira
                    </div>
                    <div className='text-cinza text-base md:text-lg text-center md:text-start md:w-[440px] mt-6'>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laborisol nisi ut aliquip ex ea commodo colmer consequat aute irure sint amet.
                    </div>
                    <div className='flex gap-5 mt-8'>
                        <Link href=''>
                            <div className='bg-cinzaClaro w-10 h-10 flex justify-center items-center rounded-xl'>
                                <img src="Facebook.png" alt="Icone do Facebook"/>
                            </div>
                        </Link>
                        <Link href=''>
                            <div className='bg-cinzaClaro w-10 h-10 flex justify-center items-center rounded-xl'>
                                <img src="Instagram.png" alt="Icone do Instagram" />
                            </div>
                        </Link>
                        <Link href=''>
                            <div className='bg-cinzaClaro w-10 h-10 flex justify-center items-center rounded-xl'>
                                <img src="LinkedIn.png" alt="Icone do LinkedIn" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Author