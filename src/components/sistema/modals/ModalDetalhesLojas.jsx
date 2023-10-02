import React from 'react'

const ModalDetalhesLojas = (props) => {
    const data = props.data
    
    // const itens = [
    //     {title: 'Email: ', value: data.email},
    //     {title: 'Telefone: ', value: data.telephone},
    //     {title: 'Celular: ', value: data.phone},
    //     {title: 'Endereço: ', value: {data.address.city} / {data.address.state}},
    //     {title: 'Cor: ', value: data?.color},
    //     {title: 'Câmbio dianteiro: ', value: data?.frontDerailleur},
    //     {title: 'Câmbio traseiro: ', value: data?.rearDerailleur},
    //     {title: 'Tipo de suspensão traseira: ', value: data?.rearSuspensionType},
    //     {title: 'Tamanho do aro: ', value: data?.wheelSize},
    //     {title: 'Tipo de freio: ', value: data?.brakesType},
    //     {title: 'Tipo de quadro: ', value: data?.frameType},
    //     {title: 'Peneu dianteiro: ', value: data?.frontTire},
    //     {title: 'Peneu traseiro: ', value: data?.rearTire},
    //     {title: 'Observação: ', value: data?.Comments},
    // ]


  return (
    <div className="modal-container">
            <label htmlFor={`my-modal-${data.id}`}  className='btn btn-primary text-white btn-sm xl:btn-sm'>Detalhes</label>
            <input type="checkbox" id={`my-modal-${data.id}`} className="modal-toggle" />
            <label htmlFor={`my-modal-${data.id}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative text-cinza" htmlFor="">
                    <label htmlFor={`my-modal-${data.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col justify-center items-start overflow-auto text-start leading-10">
                        <h3 className="text-3xl flex justify-center font-bold text-tomEscuro mb-6 break-all self-center">{data?.name}</h3>
                        <img src={data?.photo ? `${process.env.NEXT_PUBLIC_API_BACK_END}/lojaFoto/${data?.photo}` : '/manutencaoBg.jpeg'} alt="Foto da mercadoria" className=' rounded-2xl object-cover'/>
                        <span className='font-normal text-lg break-all overflow-hidden my-10'>{data.description}</span>
                        {/* <span>email: {data.email}</span> */}
                        <span className='bg-tomEscuro rounded-md text-white px-3'>Contato: {data.tel_fixo}</span>
                        {/* <span>celular: {data.phone}</span> */}
                        {/* <span className=''>Serviços prestados:
                            {data.services.maintenance ? ' Manunteção, ' : ''}
                            {data.services.bikeSale ? ' Venda de bikes, ' : ''}
                            {data.services.hosting ? ' Hospedagem, ' : ''}
                            {data.services.partsSale ? ' Venda de peças, ' : ''}
                            {data.services.food ? ' Alimentação, ' : ''}
                            {data.services.events ? 'Promotor de eventos esportivos, ' : ''}
                            {data.services.transport ? ' Transporte, ' : ''}
                            {data.services.accessories ? ' Venda de Acessórios, ' : ''}
                            {data.services.guide ? ' Guia turístico, ' : ''}
                        </span> */}
                        <div className={`w-full flex flex-col mt-4`}>
                            {/* <span>Endereço:</span> */}
                            <span>Cidade: {data.city} / {data.state}</span>
                            <span>Rua: {data.street}</span>
                            <span>Numero: {data.number}</span>
                            <span>Bairro: {data.neighborhood}</span>
                            {/* <span>{data.address.complement ?'Complemento:' + data.address.complement : ''}</span> */}
                            <span>CEP: {data.cep}</span>
                        </div>
                    </div>
                </label>
            </label>
            <style jsx>{ `
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #dad7d7;
                    border-radius: 0px 10px 10px 0px;
                }`
            }</style>
        </div>
  )
}

export default ModalDetalhesLojas