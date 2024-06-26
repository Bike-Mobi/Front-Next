import React from 'react'
import CardFeedback from './custom/CardFeedback'

const Feedback = ({
    feedback_title_1, feedback_text_1, feedback_author_1, feedback_type_1,
    feedback_title_2, feedback_text_2, feedback_author_2, feedback_type_2,
    feedback_title_3, feedback_text_3, feedback_author_3, feedback_type_3
}) => {
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
                    title={`“${feedback_title_1}”`}
                    description={feedback_text_1}
                    photo='perfil_default.png'
                    name={feedback_author_1}
                    type={feedback_type_1}
                />
                <CardFeedback
                    title={`“${feedback_title_2}”`}
                    description={feedback_text_2}
                    photo='perfil_default.png'
                    name={feedback_author_2}
                    type={feedback_type_2}
                />
                <CardFeedback
                    title={`“${feedback_title_3}”`}
                    description={feedback_text_3}
                    photo='perfil_default.png'
                    name={feedback_author_3}
                    type={feedback_type_3}
                />
            </div>
        </div>
    )
}

export default Feedback