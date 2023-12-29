'use client'

import React, { useContext, useState } from "react"
import TextInput from '@/components/sistema/inputs/TextInput'
import TextareaInput from '@/components/sistema/inputs/TextareaInput'
import ButtonModalComponent from '@/components/sistema/utils/ButtonModalComponent'
import { DocumentTextIcon, PencilSquareIcon, SwatchIcon, TrashIcon } from '@heroicons/react/24/outline'
import { AuthContext } from "@/contexts/Auth"

const ModalManutencoesPadroes = ({type, item}) => {
    const { authData }= useContext(AuthContext)

    const [title, setTitle] = useState(item?.title)
    const [price, setPrice] = useState(item?.price)
    const [description, setDescription] = useState(item?.description)

    let titleModal, button
    if(type == 'edit'){
        titleModal = 'Editar Manutenção Padrão'
        button = <button className='cursor-pointer mt-1 sm:mt-0 md:mt-1 lg:mt-0' onClick={()=>document.getElementById(`modal_edit_mp_${item.id}`).showModal()}><PencilSquareIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-azul p-1 mx-1 rounded-md'/></button>
    } else if(type == 'delete') {
        titleModal = 'Tem certeza que deseja deletar esta Manutenção Padrão?'
        button = <button className='cursor-pointer mt-1 sm:mt-0 md:mt-1 lg:mt-0' onClick={()=>document.getElementById(`modal_delete_mp_${item.id}`).showModal()}><TrashIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-error p-1 mx-1 rounded-md'/></button>
    } else {
        titleModal = 'Adicionar nova Manutenção Padrão'
        button = <button className='cursor-pointer mt-1 md:mt-1 lg:mt-0' onClick={()=>document.getElementById(`modal_edit_mp_${item.id}`).showModal()}><SwatchIcon className='w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 bg-tomEscuro p-1 mx-1 rounded-md'/></button>
    }

    let newData = {
        name: title,
        price: price,
        description: description,
        loja_id: authData.type.id
    }

    return (
        <div>
            {button}
            <dialog id={type == 'edit' || type == 'add' ? `modal_edit_mp_${item.id}` : `modal_delete_mp_${item.id}`} className="modal text-[#000]">
                <div className="modal-box">
                    <h3 className="font-bold text-xl w-fit mx-auto">{titleModal}</h3>
                    {type == 'edit' || type == 'add' ? (
                        <div className='w-full'>
                            <TextInput name="Titulo"
                                required
                                width={`w-full`}
                                onChange={(e) => setTitle(e.target.value)}
                                defaultValue={item?.title}
                            />
                            <TextInput name="Valor"
                                required
                                width={`w-full`}
                                onChange={(e) => setPrice(e.target.value)}
                                price
                                defaultValue={item?.price}
                            />
                            <TextareaInput name="Descrição"
                                required
                                width={`w-full`}
                                onChange={(e) => setDescription(e.target.value)}
                                defaultValue={item?.description}
                                />
                        </div>
                    ) : null}
                    <div className="modal-action">
                    <form method="dialog" className='flex gap-10'>
                        {/* if there is a button in form, it will close the modal */}
                        <button className='btn'>Fechar</button>
                        <ButtonModalComponent 
                            title={type}
                            newData={newData}
                            baseUrl='manutencaopadrao'
                        />
                    </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default ModalManutencoesPadroes