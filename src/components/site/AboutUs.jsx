import React from 'react'

const AboutUs = () => {
    return (
        <div className='md:mx-24 mx-6 flex'>
            <div className='md:w-1/2 font-dmsans gap-5 flex flex-col mt-20'>
                <div className='text-azul text-md md:text-lg font-bold uppercase'>
                    Quem Somos
                </div>
                <div className='text-tomEscuro text-2xl md:text-4xl font-bold'>
                    Sistema que <span className='text-azul'>Conecta</span> Ciclistas, Lojas e Manutenções
                </div>
                <p className='text-tomEscuro text-sm md:text-base leading-7 md:leading-7'>
                    O Bike Mobi vem como a melhor opção para você e sua bike. Facilitando o acompanhamento das manutenções preventivas e corretivas, dando dicas de manutenção, avisos de furto e rastreamento de sua bike, é o que vai te dar mais tranquilidade na hora da sua pedalada. Buscamos juntar pessoas neste ecossistema de usuários de bikes, seja para esporte, lazer ou uso urbano. Mais saúde, menos stress e um mundo melhor no futuro para as novas gerações.
                </p>
            </div>
            <div className='w-1/2 md:block hidden -z-10'>
                <img src="bicicleta-listra.png" alt="Bicicleta" className='relative -right-24'/>
            </div>
        </div>
    )
}

export default AboutUs