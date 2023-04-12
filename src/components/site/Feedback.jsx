import React from 'react'
import CardFeedback from './custom/CardFeedback'

const Feedback = () => {
    return (
        <div className='md:mx-24 mx-6 mt-24 flex flex-col gap-5'>
            <div className='text-azul text-md md:text-lg font-bold uppercase w-fit mx-auto'>
                Feedbacks
            </div>
            <div className='text-tomEscuro text-2xl md:text-4xl font-bold flex flex-col text-center justify-center'>
                <div>O que outras pessoas</div>
                <div>tem a dizer do Bike Mobi?</div>
            </div>
            <div className='flex flex-col md:flex-row md:flex-wrap justify-between mx-auto md:mx-0 my-10'>
                <CardFeedback
                    title='“Me ajudou a comprar minha nova bicicleta”'
                    description='Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.'
                    photo='perfilSquere.png'
                    name='Sophie Moore'
                    type='Ciclista'
                />
                <CardFeedback
                    title='“Diferencial do meu negocio”'
                    description='Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.'
                    photo='perfilSquere.png'
                    name='Adam Smith'
                    type='Lojista'
                />
                <CardFeedback
                    title='“Muito útil e fácil de usar”'
                    description='Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.'
                    photo='perfilSquere.png'
                    name='Ruan Azeredo'
                    type='Ciclista'
                />
            </div>
        </div>
    )
}

export default Feedback