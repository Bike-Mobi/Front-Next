'use client'

import FileInput from '../inputs/FileInput'
import TextInput from '../inputs/TextInput'
import { useRouter } from "next/navigation";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import NumberInput from '../inputs/NumberInput';
import ButtonModalComponent from '../utils/ButtonModalComponent';
import TitleModalComponent from '../utils/TitleModalComponent';

const ModalClassificados = (props) => {

    const data = props.data

    const router = useRouter()

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

    function preco(){
        const precoString = data?.price.toString().replace(/[.,]/g, "")

        const precoNumero = ((parseInt(precoString)/100).toFixed(2))
        const valorFormatado = precoNumero.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        return valorFormatado
    }

    return (
        <div className="modal-container h-[41px] items-center flex">

            <label htmlFor={`my-modal${props.id}`} className=' text-white p-0 h-full cursor-pointer'>
                {buttonOpenModal()}
            </label>
            <input
                type={`${props.path == "/classificados" ? null : "checkbox"}`}
                id={`my-modal${props.id}`}
                className="modal-toggle"
                onClick={props.path == "/classificados" ? () => router.push('/autenticacao/login') : null}
            />

            <label htmlFor={`my-modal${props.id}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative" htmlFor="">
                    <label htmlFor={`my-modal${props.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col justify-center items-center overflow-auto">

                        <TitleModalComponent title={props.action}/>

                        {props.action != 'delete' ?
                            <div className='w-full'>

                                <TextInput name="Titulo"
                                    defaultValue={data?.title}
                                    width="w-full"
                                    className="disabled disabled:opacity-75"
                                    required
                                />
                                <TextInput name="Descrição"
                                    defaultValue={data?.description}
                                    width="w-full"
                                    required
                                />
                                <NumberInput name="Valor"
                                    defaultValue={preco()}
                                    width="w-full"
                                    required
                                />
                                <FileInput name="Imagem"
                                    defaultValue={data?.photo}
                                    width="w-full"
                                    text="Upload"
                                    description="SVG, PNG ou JPG"
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
                            <ButtonModalComponent title={props.action}/>
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