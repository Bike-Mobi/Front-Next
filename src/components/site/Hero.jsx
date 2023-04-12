'use client'
import React from 'react'

const Hero = () => {
    return (
        <div className='mb-64 md:mb-0 md:h-screen'>
            <div className='absolute top-0 -z-10 h-screen'>
                <img src="banner.png" alt="Banner de ciclismo" className='md:h-screen h-[90vh] object-cover'/>
                <div className='bg-gradient-to-b from-[rgba(0,0,0,0)] to-white h-24 relative -top-24'></div>
            </div>
            <div className='mx-6 md:mx-auto md:w-8/12 flex flex-col justify-between h-[60vh]'>
                <div className='text-tomEscuro font-bold font-robot text-4xl md:text-6xl leading-10 text-center mt-24 md:mt-32'>
                    A Maneira Mais Fácil de Cuidar da Sua Bicicleta
                </div>
                <div className='text-cinza font-medium font-dmsans text-md md:text-lg leading-7 text-center mb-10 md:mt-10 md:mx-40'>
                    Um aplicativo que vai conectar você com os melhores serviços de manutenção, para que a sua bicicleta esteja nas melhores mãos. 
                </div>
                <div className='bg-white flex flex-row rounded-lg justify-center mx-3 md:mx-auto md:w-[460px]'>
                    <input type="text" placeholder='Digite seu email' className='text-tomEscuro font-dmsans ml-2 w-full focus:outline-none placeholder:text-slate-400 placeholder:font-dmsans'/>
                    <button className='bg-azul text-white font-dmsans font-bold rounded-md px-4 md:px-8 py-2 m-2 h-fit min-w-max'>
                        Cadastre-se
                    </button>
                </div>
            </div>
            <style jsx>{`
                img{
                    object-position: 34% 50%
                }    
            `}</style>
        </div>
    )
}

export default Hero