'use client'
import CardBicicleta from '@/components/sistema/modals/CardBicicleta'
import ModalBicicleta from '@/components/sistema/modals/ModalBicicleta'
import { AuthContext } from '@/contexts/Auth';
import { fakeApi } from "@/service/fakeApi";
import { ChevronDoubleRightIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from "react";
import ButtonModalComponent from '../utils/ButtonModalComponent';
import { ApiContext } from '@/contexts/Api';
import TextInput from '../inputs/TextInput';

const PassarBike = () => {

  const { authData } = useContext(AuthContext)
  const { instance } = useContext(ApiContext)

  const [idBike, setIdBike] = useState()
  const [ciclistaUser, setCiclistaUser] = useState([undefined, undefined])
  const [cpfReceiver, setCpfReceiver] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    instance.get(`/getCiclistaByCpf/${cpfReceiver}`).then((resp) => {
      setCiclistaUser(resp.data)
      setLoading(false)
      console.log('rasp.data: ',resp.data, 'ciclistaUser:', ciclistaUser)
    }).catch(() => {
      setCiclistaUser([undefined, undefined])
      setLoading(false)
    })
  }, [cpfReceiver])

  let newData = {
    cyclist_id: ciclistaUser[0]?.[0]?.id
  }

  return (
    <div>
      <button onClick={()=>document.getElementById(`modal_passarbike`).showModal()} className='flex bg-azul text-white rounded-md cursor-pointer btn hover:opacity-90 hover:bg-azul'>
        <ChevronDoubleRightIcon className='w-5 h-5'/>
        <div>Enviar Bicicleta</div>
      </button>
      <dialog className='modal' id='modal_passarbike'>
        <div className='modal-box'>
          <h3 className="font-bold text-xl w-fit mx-auto">Passe a sua Bicicleta para outro Ciclista</h3>
          <div className='my-5'>
            <label className="label">
              <span className={`label-text font-medium`}>Bike</span>
            </label>
            <select className="select select-bordered border-cinza w-full" onChange={(e) => setIdBike(e.target.value)}>
              <option value='selecione' selected>Selecione</option>
              {authData.bikes.map(item => (
                <option key={item.id} value={item.id}>{item.nameBike}</option>
              ))}
            </select>
          </div>
          <div>
            <TextInput name="CPF do recebedor"
                mask="999.999.999-99"
                width={`w-full`}
                onChange={(e) => setCpfReceiver(e.target.value)}
                value={cpfReceiver}
                required
            />
            {loading ? (
                <div className='h-24 w-full flex'>
                  <div className="inline-block h-5 w-5 my-6 mx-auto animate-spin rounded-full border-4 border-solid border-primary border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                </div>
            ) :
                ciclistaUser[0] ? (
                    <div>
                        <div className='flex p-2 m-2 mt-3 bg-cinzaClaro rounded-lg'>
                            <img src={`${process.env.NEXT_PUBLIC_API}/ciclistaFoto/${ciclistaUser[0]?.[0]?.photo}`} className='w-14 h-14 object-cover rounded-lg mr-4' alt="" />
                            <div className='flex flex-col gap-1'>
                                <div className='font-semibold text-tomEscuro text-lg'>{ciclistaUser[1]?.[0]?.name}</div>
                                <div className='text-accent'>{ciclistaUser[1]?.[0]?.city}</div>
                            </div>
                        </div>
                        
                    </div>
                ) : (
                    <div className='p-3 m-2 bg-error rounded-lg flex'>
                        <ExclamationTriangleIcon color='white' className='w-6 h-6 mt-[2px] mr-3 '/>    
                        <div className='text-white font-medium'>Digite um CPF valido de um ciclista cadastrado no nosso sistema.</div>   
                    </div>
                )
            }
          </div>
          <div className="modal-action">
            <form method="dialog" className='flex gap-10'>
                <button className='btn'>Fechar</button>
                <ButtonModalComponent
                    title='sendBike'
                    data={{id: idBike}}
                    newData={newData}
                    baseUrl='bicicleta'
                />
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}

const BikesScreen = (props) => {

  const { authData } = useContext(AuthContext)

    const data = props.produtos
    console.log(data)

      return (
        <div className={`m-10 my-10`}>
          
            <div className={`my-16 ml-0 md:ml-[13px] px-0 flex justify-between`}>
              <ModalBicicleta
                action="create"
                data={data}
                cyclistId = {authData.type.id}
              />

              <PassarBike/>
            </div>
    
            <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 xl:gap-8 justify-items-center`}>
              {data?.map((produto) => (
                <CardBicicleta
                key={produto.id}
                data={produto}
                />
              ))}
            </div>
        </div>
      )
    }

export default BikesScreen