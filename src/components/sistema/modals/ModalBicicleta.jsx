'use client'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from "react";
import FileInput from "../inputs/FileInput";
import RadioInput from '../inputs/RadioInput';
import TextInput from "../inputs/TextInput";
import ButtonModalComponent from '../utils/ButtonModalComponent';
import TitleModalComponent from '../utils/TitleModalComponent';

const ModalBicicleta = (props) => {

    const data = props?.data;

    const [showModal, setShowModal] = useState(false);
    const [trasicao, setTransicao] = useState(false);

    const [serie, setSerie] = useState(data?.serie)
    const [tipoBike, setTipoBike] = useState(data?.tipoBike)
    const [nome, setNome] = useState(data?.name)
    const [marca, setMarca] = useState(data?.marca)
    const [cor, setCor] = useState(data?.cor)
    const [cambioDianteiro, setCambioDianteiro] = useState(data?.cambioDianteiro)
    const [cambioTraseiro, setCambioTraseiro] = useState(data?.cambioTraseiro)
    const [suspencaoTraseira, setSuspencaoTraseira] = useState(data?.suspencaoTraseira)
    const [tamanhoAro, setTamanhoAro] = useState(data?.tamanhoAro)
    const [tipoFreio, setTipoFreio] = useState(data?.tipoFreio)
    const [tipoQuadro, setTipoQuadro] = useState(data?.tipoQuadro)
    const [peneuDianteiro, setPeneuDianteiro] = useState(data?.peneuDianteiro)
    const [peneuTraseiro, setPeneuTraseiro] = useState(data?.peneuTraseiro)
    const [observacao, setObservacao] = useState(data?.observacao)
    const [photo, setPhoto] = useState()


    const handleSerie = (e) => setSerie(e.target.value)
    const handleTipoBike = (e) => setTipoBike(e.target.value)
    const handleNome = (e) => setNome(e.target.value)
    const handleMarca = (e) => setMarca(e.target.value)
    const handleCor = (e) => setCor(e.target.value)
    const handleCambioDianteiro = (e) => setCambioDianteiro(e.target.value)
    const handleCambioTraseiro = (e) => setCambioTraseiro(e.target.value)
    const handleSuspencaoTraseira = (e) => setSuspencaoTraseira(e.target.value)
    const handleTamanhoAro = (e) => setTamanhoAro(e.target.value)
    const handleTipoFreio = (e) => setTipoFreio(e.target.value)
    const handleTipoQuadro = (e) => setTipoQuadro(e.target.value)
    const handlePeneuDianteiro = (e) => setPeneuDianteiro(e.target.value)
    const handlePeneuTraseiro = (e) => setPeneuTraseiro(e.target.value)
    const handleObservacao = (e) => setObservacao(e.target.value)
    const handlePhoto = (file) => {
        setPhoto(file)
        console.log("photo: ",photo)
    }

    useEffect(() => {
        setTimeout(() => {
            if (showModal) {
                setTransicao(true)
            } else {
                setTransicao(false)
            }
        }, 100);
    }, [showModal]);

    let hidePassDetalhe, hidePassDelete, hidePassCriar, des, submit
    if (props.action === 'detail') {
        hidePassDetalhe = 'hidden'
        des = true
    }
    else if (props.action === 'delete'){
        hidePassDelete = 'hidden'
    }
    else if (props.action === 'edit' || props.action === 'create'){
        hidePassCriar = 'hidden'
    }

    const itens = [
        {title: 'Numero de série: ', value: data?.serie},
        {title: 'Tipo de bicicleta: ', value: data?.type},
        {title: 'Nome: ', value: data?.name},
        {title: 'Marca: ', value: data?.brand},
        {title: 'Cor: ', value: data?.color},
        {title: 'Câmbio dianteiro: ', value: data?.frontDerailleur},
        {title: 'Câmbio traseiro: ', value: data?.rearDerailleur},
        {title: 'Tipo de suspensão traseira: ', value: data?.rearSuspensionType},
        {title: 'Tamanho do aro: ', value: data?.wheelSize},
        {title: 'Tipo de freio: ', value: data?.brakesType},
        {title: 'Tipo de quadro: ', value: data?.frameType},
        {title: 'Peneu dianteiro: ', value: data?.frontTire},
        {title: 'Peneu traseiro: ', value: data?.rearTire},
        {title: 'Observação: ', value: data?.Comments},
    ]

    let newData = {
        serie: serie,
        type: tipoBike,
        name: nome,
        brand: marca,
        color: cor,
        frontDerailleur: cambioDianteiro,
        rearDerailleur: cambioTraseiro,
        rearSuspensionType: suspencaoTraseira,
        wheelSize: tamanhoAro,
        brakesType: tipoFreio,
        frameType: tipoQuadro,
        frontTire: peneuDianteiro,
        rearTire: peneuTraseiro,
        Comments: observacao,
        photo: photo
    }

    function buttonCard(){
        if(props.action == 'detail'){
            return(
                <button
                    className={`bg-info p-1 rounded-md text-white hover:bg-opacity-80`}
                    type="button"
                >
                    Detalhes
                </button>
            )
        }
        else if(props.action == 'edit'){
            return(
                <PencilSquareIcon className='mr-2 w-8 h-8 hover:opacity-60 bg-azul p-1 rounded-md text-white'/>
            )
        }
        else if(props.action == 'delete'){
            return(
                <TrashIcon className=' w-8 h-8 hover:opacity-60 bg-error p-1 rounded-md text-white'/>
            )
        }
        else if(props.action == 'create'){
            return(
                <span className={`bg-tomEscuro text-white rounded-md cursor-pointer btn hover:opacity-90 hover:bg-tomEscuro`}>+ Adicionar Bicicleta</span>
            )
        }
    }


    return (
        <div>
            <div onClick={() => setShowModal(true)}>{buttonCard()}</div>

            {showModal ? ( <div className="bg-[#25252525] z-10 fixed w-screen h-screen top-0 left-0 duration-200" onClick={()=> setShowModal(false)}></div> ) : null}
            
            {showModal ? (
                
                <div className={`${ trasicao ? 'visible opacity-1 flex' : 'invisible opacity-20'} duration-200
                    bg-white items-center fixed flex flex-col bottom-1/2 right-1/2 translate-y-1/2
                    translate-x-1/2 overflow-auto z-50 w-[85vw] sm:w-[500px] max-h-[80vh] p-5 pt-10 rounded-lg`}>
                        
                        <XCircleIcon className='absolute cursor-pointer top-2 right-2 w-12 h-12 hover:opacity-60 p-1 rounded-md text-neutral-800' onClick={()=> setShowModal(false)}/>
                        
                        <TitleModalComponent action={props.action} title={'Bike'}/>

                        {/* Criar/Editar */}
                        <div className={`w-full mt-8 ${hidePassDelete}`}>
                            <form action="">
                                <TextInput name="Número de série do quadro"
                                    width={`w-full`}
                                    onChange={handleSerie}
                                    defaultValue={data?.serie}
                                    required
                                    disabled={des}
                                    
                                />

                                <RadioInput name="Tipo de bicicleta"
                                    items={[
                                        { name: 'MTB'},
                                        { name: 'Speed'},
                                        { name: 'DownHill'},
                                        { name: 'Urbana'},
                                    ]}
                                    value={data?.type}
                                    required
                                    disabled={des}
                                />

                                <TextInput name="Nome"
                                    width={`w-full`}
                                    onChange={handleNome}
                                    defaultValue={data?.name}
                                    required
                                    disabled={des}
                                />

                                <TextInput name="Marca"
                                    width={`w-full`}
                                    onChange={handleMarca}
                                    defaultValue={data?.brand}
                                    required
                                    disabled={des}
                                />

                                <TextInput name="Cor predominante"
                                    width={`w-full`}
                                    onChange={handleCor}
                                    defaultValue={data?.color}
                                    disabled={des}
                                />

                                <TextInput name="Câmbio dianteiro"
                                    width={`w-full`}
                                    onChange={handleCambioDianteiro}
                                    defaultValue={data?.frontDerailleur}
                                    disabled={des}
                                />

                                <TextInput name="Câmbio traseiro"
                                    width={`w-full`}
                                    onChange={handleCambioTraseiro}
                                    defaultValue={data?.rearDerailleur}
                                    disabled={des}
                                />

                                <TextInput name="Tipo de suspensão traseira"
                                    width={`w-full`}
                                    onChange={handleSuspencaoTraseira}
                                    defaultValue={data?.rearSuspensionType}
                                    disabled={des}
                                />

                                <TextInput name="Tamanho do aro"
                                    width={`w-full`}
                                    onChange={handleTamanhoAro}
                                    defaultValue={data?.wheelSize}
                                    disabled={des}
                                />

                                <TextInput name="Tipo de freios"
                                    width={`w-full`}
                                    onChange={handleTipoFreio}
                                    defaultValue={data?.brakesType}
                                    disabled={des}
                                />

                                <TextInput name="Tipo de quadro"
                                    width={`w-full`}
                                    onChange={handleTipoQuadro}
                                    defaultValue={data?.frameType}
                                    disabled={des}
                                />

                                <TextInput name="Pneu dianteiro"
                                    width={`w-full`}
                                    onChange={handlePeneuDianteiro}
                                    defaultValue={data?.frontTire}
                                    disabled={des}
                                />

                                <TextInput name="Pneu traseiro"
                                    width={`w-full`}
                                    onChange={handlePeneuTraseiro}
                                    defaultValue={data?.rearTire}
                                    disabled={des}
                                />

                                <TextInput name="Observações"
                                    width={`w-full`}
                                    onChange={handleObservacao}
                                    defaultValue={data?.Comments}
                                    disabled={des}
                                />

                                <FileInput name="Imagem"
                                    text="Upload"
                                    description="SVG, PNG ou JPG"
                                    onChange={handlePhoto}
                                    defaultValue={data?.photo}
                                    disabled={des}
                                />
                            </form>

                        </div>

                        {/* Detalhes */}
                        {/* <div className={`${hidePassDelete} ${hidePassCriar} flex flex-col`}>

                            <span className="text-3xl flex justify-center font-bold text-tomEscuro mb-6 break-all">
                                {data?.name}
                            </span>

                            <img src={data?.photo ? data?.photo : '/Bike.jpg'} alt="image" className='rounded-xl'/>

                            <div className='grid grid-cols-1 justify-items-start mt-8 text-cinza text-md font-medium'>
                                <table className='w-full'>
                                    {itens.map((item, index) => (
                                        <tr key={index} className='odd:bg-cinzaClaro'>
                                            <td className='text-neutral-700 w-1/3'>{item.title}</td>
                                            <td className='pl-10'>{item.value}</td>
                                        </tr>
                                ))}
                                </table>
                            </div>

                        </div> */}

                        {/* Delete */}
                        <div className={`Delete ${hidePassDetalhe} ${hidePassCriar}`}>
                            <h2 className='font-bold text-lg text-neutral-600 mt-8'>
                                Tem certeza que deseja deletar essa Bike?
                            </h2>
                        </div>

                        <div className={`relative w-full mt-16 ${hidePassDetalhe}`}>
                            <ButtonModalComponent title={props.action} onClick={() => (null)}/>
                        </div>

                        <style
                            jsx>{`
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
                            `}
                        </style>

                </div>
            ) : null}
        </div>
    )
}

export default ModalBicicleta