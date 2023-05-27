
import React from 'react'
import ModalBicicleta from './ModalBicicleta';

const CardBicicleta = (props) => {
  const data = props.data

  return (
    <div className={`flex flex-col w-[300px] h-[150px] p-4 border border-cinza rounded-lg justify-between`}>
      <div className={`flex`}>
        <img src={data?.photo} alt="image" className={` w-14 h-14 rounded-md mr-4 object-cover`}/>
        <div className={`flex flex-col`}>
          <span className={`font-semibold text-xl text-tomEscuro max-w-[194px] max-h-10 overflow-hidden break-all leading-none mt-[-1px]`}>{data?.name}</span>
          <span className={`text-md text-cinza max-h-6 overflow-hidden break-all mt-1`}>{data?.brand}</span>
        </div>
      </div>
      <hr className='text-neutral-200 border-dashed'/>
      <div className={`flex justify-between`}>
        <div className={`flex cursor-pointer`}>
          <ModalBicicleta
            action="edit"
            data={data}
          />
          <ModalBicicleta
            action="delete"
            data={data}
          />
        </div>
        <div>
          {/* <button className={`bg-info text-white rounded-md p-0.5 px-2 hover:bg-azul`}>Detalhes</button> */}
          <ModalBicicleta
            action="Detalhes"
            data={data}
          />
        </div>
      </div>
    </div>
  )
}

export default CardBicicleta