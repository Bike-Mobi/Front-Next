import React from 'react'

const CardFeedback = (props) => {
    return (
        <div className='border-2 border-cinzaClaro rounded-2xl font-dmsans w-[340px] md:w-[370px] h-[320px] md:h-[350px] px-7 py-10 flex flex-col justify-between mb-6'>
            <div className='font-bold text-tomEscuro text-lg md:text-xl'>
                {props.title}
            </div>
            <div className='font-normal text-cinza text-base md:text-lg'>
                {props.description}
            </div>
            <div className='flex'>
                <img src={props.photo} alt="Foto do usuario" className='w-12 md:w-14 rounded-full'/>
                <div className='text-base md:text-lg justify-between ml-4'>
                    <div className='font-bold text-tomEscuro'>
                        {props.name}
                    </div>
                    <div className='font-normal text-cinza'>
                        {props.type}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardFeedback