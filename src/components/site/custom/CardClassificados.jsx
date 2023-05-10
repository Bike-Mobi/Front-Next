import ModalCardClassificados from './ModalCardClassificados'
import { usePathname } from "next/navigation";
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

const CardClassificados = (props) => {

    const path = usePathname()

    return (
        <div className={`border border-cinza rounded-2xl font-dmsans ${ path == "/classificados" ? "md:w-[450px] xl:w-[550px] h-[450px] md:h-[220px] md:flex-row" : ""} w-[250px] h-[450px] flex flex-col p-3 justify-between mb-6`}>
            <div className={`${ path == "/classificados" ? "hidden" : "block"}`}>
                <button className='hover:bg-neutral-300 p-1 hover:rounded-full'><TrashIcon className='w-6 h-6 text-[#ff0000]'/></button>
                <button className='hover:bg-neutral-300 p-1 hover:rounded-full ml-1'><PencilSquareIcon className='w-6 h-6 text-[#008800]'/></button>
            </div>
            <div className={`flex w-56 justify-center ${ path == "/classificados" ? " md:w-[176px] xl:w-56" : ""}`}>
                <img src={props.photo} alt="Foto da mercadoria" className='rounded-2xl object-cover h-[195px]'/>
            </div>
            <div className={`flex flex-col justify-between w-56 h-full ${path == "/classificados" ? "md:w-[240px] xl:w-72" : ""}`}>
                <div className='flex justify-center font-bold text-tomEscuro text-lg max-h-14 break-all overflow-hidden'>
                    {props.title}
                </div>
                <div className='font-normal text-cinza text-xs xl:text-sm break-all overflow-hidden max-h-[109px] xl:max-h-[100px]'>
                    {props.description}
                </div>
                <div className='flex text-base md:text-lg justify-between items-center pr-3'>
                    <span className='text-sm xl:text-base break-words overflow-hidden font-bold text-tomEscuro max-h-11'>Valor: {props.price}</span>

                    <ModalCardClassificados
                        title={props.title}
                        photo={props.photo}
                        description={props.description}
                        price={props.price}
                        id={props.id}
                    ></ModalCardClassificados>
                </div>
            </div>
        </div>
    )
}

export default CardClassificados