
import React from 'react'
import ModalBicicleta from './ModalBicicleta';
import { ShieldExclamationIcon } from '@heroicons/react/24/solid';

const CardBicicleta = (props) => {
  const data = props.data

  var colorThiefs
  data.is_thiefs ? colorThiefs = 'warning' : colorThiefs = 'base-100'

  return (
    <div className={`flex flex-col w-[300px] md:w-[350px] xl:w-[450px] h-[150px] md:h-full xl:h-full p-4 md:p-0 border border-cinza rounded-lg justify-between`}>
      <div className={`flex w-full`}>
        <img src={data?.photo_1 ? `${process.env.NEXT_PUBLIC_API}/bicicletaFoto/${data?.photo_1}` : '/Bike.jpg'} alt="image" className={`w-14 md:w-36 xl:w-40 h-14 md:h-36 xl:h-40 md:rounded-r-none rounded-md mr-4 object-cover hidden md:block`}/>
        <div className={`flex flex-col md:justify-around xl:justify-around justify-between w-full`}>
          <div className='flex mb-4'>
            <img src={data?.photo_1 ? `${process.env.NEXT_PUBLIC_API}/bicicletaFoto/${data?.photo_1}` : '/Bike.jpg'} alt="image" className={`w-14 md:w-28 xl:w-40 h-14 md:h-28 xl:h-40 md:rounded-r-none xl:rounded-r-none rounded-md mr-4 object-cover block md:hidden`}/>
            <div className='flex flex-col'>
              <span className={`font-semibold text-xl text-tomEscuro max-w-[194px] xl:max-w-full max-h-10 overflow-hidden break-all leading-none mt-[-1px]`}>{data?.nameBike}</span>
              <span className={`text-md text-cinza max-h-6 overflow-hidden break-all mt-1`}>{data?.brand}</span>
{/*               <div className='tooltip' data-tip='Clique aqui se a sua bicicleta foi roubada'>
                <label className="cursor-pointer flex gap-1">
                  <span className="label-text"><ShieldExclamationIcon className={`w-6 h-6 text-${colorThiefs}`}/></span> 
                </label>
              </div> */}
            </div>
          </div>
          <div className={`flex justify-between`}>
            <div className={`flex cursor-pointer`}>
              <div className='tooltip' data-tip='Editar'>
                <ModalBicicleta
                  action="edit"
                  data={data}
                />
              </div>
              <div className='tooltip' data-tip='Deletar'>
                <ModalBicicleta
                  action="delete"
                  data={data}
                />
              </div>
              <div className='tooltip' data-tip='Informar Furto'>
                <ModalBicicleta
                  action="protect"
                  data={data}
                />
              </div>
            </div>
            <div className='md:mr-2 xl:mr-4'>
              {/* <button className={`bg-info text-white rounded-md p-0.5 px-2 hover:bg-azul`}>Detalhes</button> */}
              <ModalBicicleta
                action="detail"
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <hr className='text-neutral-200 border-dashed'/> */}
    </div>
  )
}

export default CardBicicleta