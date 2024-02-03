'use client'

import FileInput from '../inputs/FileInput'
import TextInput from '../inputs/TextInput'
import { useRouter } from "next/navigation";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import NumberInput from '../inputs/NumberInput';
import ButtonModalComponent from '../utils/ButtonModalComponent';
import TitleModalComponent from '../utils/TitleModalComponent';
import React, { useEffect, useState }  from 'react';

const ModalClassificados = (props) => {

    const data = props.data
    console.log('classificados data: ',data)

    const router = useRouter()

    const [price, setPrice] = useState()
    const [title, setTitle] = useState()
    const [descricao, setDescricao] = useState()
    const [contato, setContato] = useState()
    const [vendedor, setVendedor] = useState()

    const handlePrice = (e) => setPrice(e.target.value)
    const handleTitle = (e) => setTitle(e.target.value)
    const handleDescricao = (e) => setDescricao(e.target.value)
    const handleContato = (e) => setContato(e.target.value)
    const handleVendedor = (e) => setVendedor(e.target.value)

    const [photo, setPhoto] = useState()

    const handlePhoto = (file) => {
        setPhoto(file)
        console.log("photo: ",photo)
    }

    function buttonOpenModal(){

        if(props.action == "delete"){
            return <TrashIcon className='12 w-9 h-9 hover:opacity-60 bg-error p-1 rounded-md'/>
        }
        else if(props.action == "edit"){
            return <PencilSquareIcon className='w-9 h-9 hover:opacity-60 bg-azul p-1 rounded-md'/>
        }
        else{
            return <span className="bg-tomEscuro text-white lg:px-4 rounded-md font-medium flex items-center justify-center py-1 lg:py-0 w-[190px] lg:w-[220px] h-full text-sm lg:text-base lg:ml-4">+ Adicionar um Anúncio</span>
        }
    }

    // function preco(e){
    //     const precoString = Price?.toString().replace(/[.,]/g, "")

    //     const precoNumero = ((parseInt(precoString)/100))
    //     const valorFormatado = precoNumero.toLocaleString('pt-BR', {
    //         minimumFractionDigits: 2,
    //         maximumFractionDigits: 2,
    //     });
    //     if(e == 'defaultValue'){
    //         return precoNumero.toFixed(2)
    //     }
    //     else{
    //         return setPrice(valorFormatado)
    //     }
    // }
    console.log('userId: ', props?.userId)

    let newData = {
        name: title,
        description: descricao,
        price: price,
        contact: contato,
        seller: vendedor,
        photo: photo,
        user_id: props.userId,
    }

    return (
        <div className="modal-container h-[41px] items-center flex">

            <label htmlFor={`my-modal${props?.id}`} className=' text-white p-0 h-full cursor-pointer'>
                {buttonOpenModal()}
            </label>
            <input
                type={`${props?.path == "/classificados" ? null : "checkbox"}`}
                id={`my-modal${props?.id}`}
                className="modal-toggle"
                onClick={props.path == "/classificados" ? () => router.push('/autenticacao/login') : null}
            />

            <label htmlFor={`my-modal${props?.id}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative" htmlFor="">
                    <label htmlFor={`my-modal${props?.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col justify-center items-center overflow-auto">

                        <TitleModalComponent action={props?.action} title={'Anúncio'}/>

                        {props?.action != 'delete' ?
                            <div className='w-full'>

                                <TextInput name="Titulo"
                                    defaultValue={data?.name}
                                    width="w-full"
                                    onChange={handleTitle}
                                    className="disabled disabled:opacity-75"
                                    required
                                />

                                <TextInput name="Descrição"
                                    defaultValue={data?.description}
                                    width="w-full"
                                    onChange={handleDescricao}
                                    required
                                />

                                <TextInput name="Valor"
                                    defaultValue={data?.price}
                                    width="w-full"
                                    onChange={handlePrice}
                                    price
                                    required
                                />

                                <TextInput name="Número de Contato"
                                    defaultValue={data?.contact}
                                    mask="(99) 99999-9999"
                                    width="w-full"
                                    onChange={handleContato}
                                    className="disabled disabled:opacity-75"
                                    required
                                />

                                <TextInput name="Vendedor"
                                    defaultValue={data?.seller}
                                    width="w-full"
                                    onChange={handleVendedor}
                                    className="disabled disabled:opacity-75"
                                    required
                                />

                                <FileInput name="Imagem"
                                    defaultValue={data?.photo}
                                    width="w-full"
                                    text="Upload"
                                    description="SVG, PNG ou JPG"
                                    onChange={setPhoto}
                                    typeImgURL='classificadoFoto'
                                    required
                                />
                            </div>
                        :
                            <div>
                                <h2 className='font-bold text-lg text-neutral-600 mt-6'>
                                    Tem certeza que deseja deletar esse anúncio?
                                </h2>
                            </div>
                        }

                        <div className='relative w-full mt-16'>
                            <ButtonModalComponent
                                title={props?.action}
                                data={data}
                                newData={newData}
                                baseUrl='classificado'
                            />
                        </div>

                    </div>
                </label>
            </label>
            <style jsx>{`
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #dad7d7;
                    border-radius: 0px 10px 10px 0px;
                }
                `}</style>
        </div>
    )
}

export default ModalClassificados