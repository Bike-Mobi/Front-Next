import React from 'react'

const AboutUs = ({title, description}) => {
    return (
        <div className='md:mx-24 mx-6 flex'>
            <div className='md:w-1/2 font-dmsans gap-5 flex flex-col mt-20'>
                <div className='text-azul text-md md:text-lg font-bold uppercase'>
                    Quem Somos
                </div>
                <div className='text-tomEscuro text-2xl md:text-4xl font-bold'>
                    {title}
                </div>
                <p className='text-tomEscuro text-sm md:text-base leading-7 md:leading-7'>
                    {description}
                </p>
            </div>
            <div className='w-1/2 md:block hidden -z-10'>
                <img src="bicicleta-listra.png" alt="Bicicleta" className='relative -right-24'/>
            </div>
        </div>
    )
}

export default AboutUs