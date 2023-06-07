import React from 'react'
import ModalDetalhesLojas from './ModalDetalhesLojas'

const CardLoja = (props) => {

    const data = props.data

  return (
    <div className={`border border-cinza rounded-2xl font-dmsans w-[250px] h-[450px] md:w-[450px] md:h-[250px] flex flex-col md:flex-row p-3 justify-between mb-6`}>
            
            <div className={`flex w-56 justify-center mb-1 md:mb-0 md:mr-2 place-items-center`}>
                <img src={data.photo} alt="Foto da loja" className='rounded-2xl object-cover h-[195px]'/>
            </div>
            <div className={`flex flex-col justify-evenly  w-56 h-full`}>
                <div className='flex justify-center font-bold text-tomEscuro text-lg max-h-14 break-all overflow-hidden'>
                    {data.name}
                </div>
                <div className='font-normal text-neutral-600 text-xs xl:text-sm break-all overflow-hidden max-h-16 mb-1'>
                    {data.description}
                </div>
                <div  className='flex flex-col font-normal text-neutral-600 text-xs break-all overflow-hidden max-h-20'>
                    <div>

                    <span className='text-neutral-800 font-bold'>Serviços prestados:</span>
                            {data.services.maintenance ? ' Manunteção, ' : ''}
                            {data.services.bikeSale ? ' Venda de bikes, ' : ''}
                            {data.services.hosting ? ' Hospedagem, ' : ''}
                            {data.services.partsSale ? ' Venda de peças, ' : ''}
                            {data.services.food ? ' Alimentação, ' : ''}
                            {data.services.events ? 'Promotor de eventos esportivos, ' : ''}
                            {data.services.transport ? ' Transporte, ' : ''}
                            {data.services.accessories ? ' Venda de Acessórios, ' : ''}
                            {data.services.guide ? ' Guia turístico, ' : ''}

                    
                    </div>
                </div>
                <div className='flex text-base md:text-lg items-center justify-end'>
                    <ModalDetalhesLojas
                        data={data}
                    ></ModalDetalhesLojas>
                </div>
            </div>
        </div>
  )
}

export default CardLoja