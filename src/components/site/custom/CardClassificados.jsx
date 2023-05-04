import ModalCardClassificados from './ModalCardClassificados'


const CardClassificados = (props) => {

    return (
        <div className='border border-cinza rounded-2xl font-dmsans w-[250px] md:w-[450px] xl:w-[550px] h-[450px] md:h-[220px] p-3 flex-col flex md:flex-row justify-between mb-6'>
            <div className='flex w-56 md:w-[176px] xl:w-56'>
                <img src={props.photo} alt="Foto da mercadoria" className=' rounded-2xl object-cover'/>
            </div>
            <div className='flex flex-col justify-between w-56 md:w-[240px] xl:w-72 h-full'>
                <div className='flex justify-center font-bold text-tomEscuro text-lg max-h-14 break-all overflow-hidden'>
                    {props.title}
                </div>
                <div className='font-normal text-cinza text-xs xl:text-sm break-all overflow-hidden max-h-[109px] xl:max-h-[100px]'>
                    {props.description}
                </div>
                <div className='flex text-base md:text-lg justify-between items-center pr-3'>
                    <span className='text-sm xl:text-base max-w-[140px] break-words overflow-hidden font-bold text-tomEscuro'>Valor: {props.price}</span>
                    <button className='btn btn-primary text-white btn-xs xl:btn-sm'>Detalhes</button>
                </div>
            </div>
        </div>
    )
}

export default CardClassificados