'use client'
import { TrashIcon, PencilSquareIcon, ShieldExclamationIcon, ExclamationTriangleIcon, DocumentTextIcon, PlusIcon } from '@heroicons/react/24/outline';
import { XCircleIcon } from '@heroicons/react/24/solid';
import React, { useContext, useEffect, useState } from "react";
import FileInput from "../inputs/FileInput";
import RadioInput from '../inputs/RadioInput';
import TextInput from "../inputs/TextInput";
import ButtonModalComponent from '../utils/ButtonModalComponent';
import TitleModalComponent from '../utils/TitleModalComponent';
import { ApiContext } from '@/contexts/Api';

const ModalBicicleta = (props) => {

    const { instance } = useContext(ApiContext)

    const data = props?.data;

    const [showModal, setShowModal] = useState(false);
    const [trasicao, setTransicao] = useState(false);

    const [serie, setSerie] = useState()
    const [tipoBike, setTipoBike] = useState()
    const [nome, setNome] = useState()
    const [marca, setMarca] = useState()
    const [cor, setCor] = useState()
    const [cambioDianteiro, setCambioDianteiro] = useState()
    const [cambioTraseiro, setCambioTraseiro] = useState()
    const [cambioSuperiorDianteiro, setCambioSuperiorDianteiro] = useState()
    const [suspencaoTraseira, setSuspencaoTraseira] = useState()
    const [tamanhoAro, setTamanhoAro] = useState()
    const [tipoFreio, setTipoFreio] = useState()
    const [tipoQuadro, setTipoQuadro] = useState()
    const [peneuDianteiro, setPeneuDianteiro] = useState()
    const [peneuTraseiro, setPeneuTraseiro] = useState()
    const [observacao, setObservacao] = useState()
    const [photo1, setPhoto1] = useState()
    const [photo2, setPhoto2] = useState()
    const [photo3, setPhoto3] = useState()

    // const [filePhoto1, setFilePhoto1] = useState()
    // const [filePhoto2, setFilePhoto2] = useState()
    // const [filePhoto3, setFilePhoto3] = useState()


    const handleTipoBike = (e) => setTipoBike(e.target.value)
    const handleNome = (e) => setNome(e.target.value)
    const handleMarca = (e) => setMarca(e.target.value)
    const handleCor = (e) => setCor(e.target.value)
    const handleCambioDianteiro = (e) => setCambioDianteiro(e.target.value)
    const handleCambioTraseiro = (e) => setCambioTraseiro(e.target.value)
    const handleCambioSuperiorDianteiro = (e) => setCambioSuperiorDianteiro(e.target.value)
    const handleSuspencaoTraseira = (e) => setSuspencaoTraseira(e.target.value)
    const handleTamanhoAro = (e) => setTamanhoAro(e.target.value)
    const handleTipoFreio = (e) => setTipoFreio(e.target.value)
    const handleTipoQuadro = (e) => setTipoQuadro(e.target.value)
    const handlePeneuDianteiro = (e) => setPeneuDianteiro(e.target.value)
    const handlePeneuTraseiro = (e) => setPeneuTraseiro(e.target.value)
    const handleObservacao = (e) => setObservacao(e.target.value)
    // const handlePhoto = (set, value, file) => {
    //     set(file)
    //     console.log("photo: ",value)
    // }

    useEffect(() => {
        setTimeout(() => {
            if (showModal) {
                setTransicao(true)
            } else {
                setTransicao(false)
            }
        }, 100);
    }, [showModal]);

    let hidePassDetalhe, hidePassDelete, hidePassCriar, hidePassProtect, des, submit
    if (props.action === 'detail') {
        hidePassDetalhe = 'hidden'
        des = true
    }
    else if (props.action === 'delete'){
        hidePassDelete = 'hidden'
    }
    else if (props.action === 'protect'){
        hidePassProtect = 'hidden'

        var color, title, text
        if(data.is_thiefs){
            title = 'Deseja retirar a Bicicleta do estado de furto?'
            text = 'Ficamos felizes que tenha recuperado sua bicicleta, ao confirmar, não iremos mais notificar as lojas.'
            color = 'bg-warning'
        } else{
            title = 'Deseja proteger essta Bicicleta?'
            text = 'Ao confirmar você está nos dizendo que sua bicicleta foi furtada e nós iremos avisar a todos os nossos colaboradores para que fiquem atentos caso eles encontrem sua bicicleta.'
            color = 'bg-accent'
        }
    }
    else if (props.action === 'edit' || props.action === 'create'){
        hidePassCriar = 'hidden'
    }


    let newData = {
        nameBike: nome,
        brand: marca,
        color: cor,
        number_check: serie,
        cambio_dianteiro: cambioDianteiro,
        cambio_traseiro: cambioTraseiro,
        tamanho_aro: tamanhoAro,
        type_break: tipoFreio,
        type_quadro: tipoQuadro,
        cambio_superior_dianteiro: cambioSuperiorDianteiro,
        type_suspensao_traseira: suspencaoTraseira,
        pneu_dianteiro: peneuDianteiro,
        pneu_traseiro: peneuTraseiro,
        type: tipoBike,
        photo_1: photo1,
        photo_2: photo2,
        photo_3: photo3,
        distTotal: null,
        distDia: null,
        observer: observacao,
        cyclist_id: props.cyclistId,
    }

    function buttonCard(){

        if(props.action == 'detail'){
            return(
                <div>
                    <button
                    className={`bg-success py-1 px-3 rounded-md text-white hidden xl:block hover:bg-opacity-80`}
                    type="button"
                    >
                        DETALHES
                    </button>
                    <div className='tooltip mr-7 block xl:hidden' data-tip='Detalhes'>
                        <button type='button' className=''>
                            <DocumentTextIcon className='w-8 h-8 hover:opacity-60 bg-success p-1 rounded-md text-white'/>
                        </button>
                    </div>
                </div>
            )
        }
        else if(props.action == 'edit'){
            return(
                <PencilSquareIcon className='mr-2 w-8 h-8 hover:opacity-60 bg-azul p-1 rounded-md text-white'/>
            )
        }
        else if(props.action == 'delete'){
            return(
                <TrashIcon className='mr-2 w-8 h-8 hover:opacity-60 bg-error p-1 rounded-md text-white'/>
            )
        }
        else if(props.action == 'create'){
            return(
                <span className={`bg-tomEscuro text-white rounded-md cursor-pointer btn hover:opacity-90 hover:bg-tomEscuro`}><PlusIcon className='w-5 h-5'/> Adicionar Bicicleta</span>
            )
        } 
        else if(props.action == 'protect'){

            return(
                <ShieldExclamationIcon className={`w-8 h-8 hover:opacity-60 ${color} p-1 rounded-md text-white`}/>
            )
        }
    }

    const [disabled, setDisabled] = useState(false)
    const [bikeExistent, setBikeExistent] = useState()

    const getNumberBike = async (number) => {
        const bike = await instance.get(`/getBicicletaByNumber/${number}`)
        console.log('a boss: ',bike.data[0])
        setBikeExistent(bike.data[0])
        if(bike.data[0]) {
            setDisabled(true)
        }
    }

    const handleSerie = (e) => {
        setSerie(e.target.value)
        getNumberBike(e.target.value)
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
                        <div className={`w-full mt-8 ${hidePassDelete} ${hidePassProtect}`}>
                            <form action="">

                                {/* <RadioInput name="Tipo de bicicleta"
                                    items={[
                                        { name: 'MTB'},
                                        { name: 'Speed'},
                                        { name: 'DownHill'},
                                        { name: 'Urbana'},
                                    ]}
                                    value={data?.type}
                                    required
                                    disabled={des}
                                /> */}

                                <TextInput name="Nome"
                                    width={`w-full`}
                                    onChange={handleNome}
                                    defaultValue={data?.nameBike}
                                    required
                                    disabled={des}
                                />
                                
                                <TextInput name="Tipo de Bicicleta"
                                    width={`w-full`}
                                    onChange={handleTipoBike}
                                    defaultValue={data?.type}
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

                                    <TextInput name="Número de série do quadro"
                                        width={`w-full`}
                                        onChange={handleSerie}
                                        defaultValue={data?.number_check}
                                        required
                                        disabled={des}
                                        
                                    />

                                    {bikeExistent ? (
                                        <div className='p-3 m-2 bg-error rounded-lg flex'>
                                            <ExclamationTriangleIcon color='white' className='w-6 h-6 mt-[2px] mr-3 '/>    
                                            <div className='text-white font-medium'>O Número de serie da sua bicicleta já existe no nosso sistema.</div>   
                                        </div>
                                    ) : null}
                                                
                                <TextInput name="Câmbio dianteiro"
                                    width={`w-full`}
                                    onChange={handleCambioDianteiro}
                                    defaultValue={data?.cambio_dianteiro}
                                    disabled={des}
                                />

                                <TextInput name="Câmbio traseiro"
                                    width={`w-full`}
                                    onChange={handleCambioTraseiro}
                                    defaultValue={data?.cambio_traseiro}
                                    disabled={des}
                                />
                                
                                <TextInput name="Tipo de câmbio superior dianteiro"
                                    width={`w-full`}
                                    onChange={handleCambioSuperiorDianteiro}
                                    defaultValue={data?.cambio_superior_dianteiro}
                                    disabled={des}
                                />

                                <TextInput name="Tipo de suspensão traseira"
                                    width={`w-full`}
                                    onChange={handleSuspencaoTraseira}
                                    defaultValue={data?.type_suspensao_traseira}
                                    disabled={des}
                                />
                                

                                <TextInput name="Tamanho do aro"
                                    width={`w-full`}
                                    onChange={handleTamanhoAro}
                                    defaultValue={data?.tamanho_aro}
                                    disabled={des}
                                />

                                <TextInput name="Tipo de freios"
                                    width={`w-full`}
                                    onChange={handleTipoFreio}
                                    defaultValue={data?.type_break}
                                    disabled={des}
                                />

                                <TextInput name="Tipo de quadro"
                                    width={`w-full`}
                                    onChange={handleTipoQuadro}
                                    defaultValue={data?.type_quadro}
                                    disabled={des}
                                />

                                <TextInput name="Pneu dianteiro"
                                    width={`w-full`}
                                    onChange={handlePeneuDianteiro}
                                    defaultValue={data?.pneu_dianteiro}
                                    disabled={des}
                                />

                                <TextInput name="Pneu traseiro"
                                    width={`w-full`}
                                    onChange={handlePeneuTraseiro}
                                    defaultValue={data?.pneu_traseiro}
                                    disabled={des}
                                />

                                <TextInput name="Observações"
                                    width={`w-full`}
                                    onChange={handleObservacao}
                                    defaultValue={data?.observer}
                                    disabled={des}
                                />

                                <FileInput name="Imagem 1"
                                    text="Upload"
                                    description="SVG, PNG ou JPG"
                                    onChange={setPhoto1}
                                    // file={filePhoto1}
                                    // setFile={setFilePhoto1}
                                    typeImgURL='bicicletaFoto'
                                    defaultValue={data?.photo_1}
                                    disabled={des}
                                />
                            
                                <FileInput name="Imagem 2"
                                    text="Upload"
                                    description="SVG, PNG ou JPG"
                                    onChange={setPhoto2}
                                    // file={filePhoto2}
                                    // setFile={setFilePhoto2}
                                    typeImgURL='bicicletaFoto'
                                    defaultValue={data?.photo_2}
                                    disabled={des}
                                />
                            
                                <FileInput name="Imagem 3"
                                    text="Upload"
                                    description="SVG, PNG ou JPG"
                                    onChange={setPhoto3}
                                    // file={filePhoto3}
                                    // setFile={setFilePhoto3}
                                    typeImgURL='bicicletaFoto'
                                    defaultValue={data?.photo_3}
                                    disabled={des}
                                />
                            
                            </form>

                        </div>

                        {/* Delete */}
                        <div className={`Delete ${hidePassDetalhe} ${hidePassCriar} ${hidePassProtect}`}>
                            <h2 className='font-bold text-lg text-neutral-600 mt-8'>
                                Tem certeza que deseja deletar essa Bike?
                            </h2>
                        </div>

                        {/* Protect */}
                        <div className={`Protect ${hidePassDetalhe} ${hidePassCriar} ${hidePassDelete}`}>
                            <h2 className='font-bold text-lg text-neutral-600 mt-8 text-center'>
                                {title}
                            </h2>
                            <p className='mt-6 text-center'>{text}</p>
                        </div>

                        <div className={`relative w-full mt-16 ${hidePassDetalhe}`}>
                        <ButtonModalComponent
                            title={props.action}
                            data={data}
                            newData={newData}
                            baseUrl='bicicleta'
                            disabled={disabled}
                        />
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