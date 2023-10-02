'use client'
import React, { useEffect, useState, useRef, useContext } from 'react'
import NumberInput from '../inputs/NumberInput';
import RadioInput from '../inputs/RadioInput';
import TextInput from '../inputs/TextInput';
import ButtonModalComponent from '../utils/ButtonModalComponent';
import TitleModalComponent from '../utils/TitleModalComponent';
import axios from 'axios'
import LoadingComponent from '../loadingComponent';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import TextareaInput from '../inputs/TextareaInput';
import FileInput from '../inputs/FileInput';
import { ApiContext } from '@/contexts/Api';

const ModalManutencoes = (props) => {

    const { instance } = useContext(ApiContext)

    const data = props.data

    const [value, setValue] = useState(data?.value)
    const [type, setType] = useState(data?.type)
    const [description, setDescription] = useState(data?.description)
    const [bike, setBike] = useState(<div></div>)
    const [loading, setLoading] = useState(false)
    const [photo_1, setPhoto_1] = useState()
    const [photo_2, setPhoto_2] = useState()
    const [photo_3, setPhoto_3] = useState()

    const [loja, setLoja] = useState()
    
    const [bikeDefaultNumber, setBikeDefaultNumber] = useState('')
    const [numberBike, setNumberBike] = useState()

    const [search, setSearch] = useState('')
    const [content, setContent] = useState('')
    // const [isOpen, setIsOpen] = useState(false)
    // const inputSearch = useRef(null);


    // const handleContent = (e) => {
    //     setCiclistaID(e.target.getAttribute('value'))
    //     setContent(e.target.textContent)

    //     setTimeout(() => {
    //         handleDropdown()
    //         setSearch('')
    //     }, 100);
    // }

    useEffect(() => {
        getNumberBike(data?.bike_id)
        
        instance.get(`/loja/${data?.loja_id}`)
            .then((response) => {
                setLoja(response.data[0])
            })
            .catch(() => {
                setLoja(undefined)
            })
        console.log('loja: ', loja)
    }, [data])

    const handleContent = (e) => {
        setContent(e.target.value)
    }

    const handleValue = (e) => setValue(e.target.value)
    const handleNumberBike = (e) => setNumberBike(e.target.value)
    const handleType = (e) => setType(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleSearch = (e) => setSearch(e.target.value)
    // const handleDropdown = () => {
    //     setIsOpen(!isOpen)
    //     setTimeout(() => {
    //         inputSearch.current.focus()
    //     }, 100);
    // }

    // const ciclistasFiltrados = props.ciclistas?.filter((ciclista) => {
    //     return ciclista?.street?.toLowerCase().includes(search.toLowerCase())
    // })

    
    let editOn , deleteOn, createOn, submit, des;
    if(data?.id+'e' == props?.idModal){
        editOn = 'hidden'
        submit = 'edit'
        des = false
        // styleButton = 'bg-azul'
    }
    else if (data?.id + 'D' == props?.idModal) {
        deleteOn = 'hidden'
        submit = 'delete'
        des = false
        // styleButton = 'bg-error'
    } else if(data?.id+'det' == props?.idModal){
        editOn = 'hidden'
        submit = 'close'
        des = true
        // styleButton = 'bg-azul'
    }else{
        createOn = 'hidden'
        submit = 'create'
        des = false
        // styleButton = 'bg-success'
    }

    let newData = {
        description: description,
        valor_mdo: value,
        bike_id: bike?.id,
        loja_id: props.lojaId,
        photo_1: photo_1,
        photo_2: photo_2,
        photo_3: photo_3
    }

    console.log('new data: ',newData)

    // const [buscaBike, setBuscaBike] = useState()
    // const [ciclistaID, setCiclistaID] = useState(null)

    useEffect(() => {
        setLoading(true)
        instance.get(`/getBicicletaByNumber/${numberBike}`)
            .then((response) => {
                setBike(response.data[0])
                setLoading(false)
            })
            .catch(() => {
                setBike(undefined)
                setLoading(false)
            })
    }, [numberBike])

    const getNumberBike = async (id) => {
        const bike = await instance.get(`/bicicleta/${id}`)
        // console.log('bike.number_check: ', bike.number_check)
        // console.log('ahahahahsjasdghasjkdadasjhdfas: ', bike)
        // setBikeDefaultNumber(bike.data[0].number_check)
        setNumberBike(bike.data[0].number_check)
        // return bike.data[0].number_check
    }
  
    // const bikeCiclista = buscaBike?.filter((item) => {
    //   return item.cyclist_id == ciclistaID
    // })

    return (
        <div>
            <input type="checkbox" id={`my-modal-${props?.idModal}`} className="modal-toggle" />
            <label htmlFor={`my-modal-${props?.idModal}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative" htmlFor="">
                    <label htmlFor={`my-modal-${props?.idModal}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    
                    <div className='flex flex-col items-center w-full'>
                        <TitleModalComponent action={submit} title={'Manutenção'}/>

                        {/* Criar/Editar */}
                        <div className={`${deleteOn} flex flex-col w-full`}>

                            <div className='flex flex-col'>
                                <TextInput name="Número da Bike"
                                    width={`w-full`}
                                    onChange={handleNumberBike}
                                    value={numberBike}
                                    required
                                    disabled={des}
                                />
                                {loading ? (
                                    <div className='h-24 w-full flex'>
                                        <div className="inline-block h-5 w-5 my-6 mx-auto animate-spin rounded-full border-4 border-solid border-primary border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                    </div>
                                ) :
                                    bike ? (
                                        <div className='flex p-2 m-2 mt-3 bg-cinzaClaro rounded-lg'>
                                            <img src={`${'https://bikemobi.com.br/api'}/bicicletaFoto/${bike.photo_1}`} className='w-14 h-14 object-cover rounded-lg mr-4' alt="" />
                                            <div className='flex flex-col gap-1'>
                                                <div className='font-semibold text-tomEscuro text-lg'>{bike.nameBike}</div>
                                                <div className='text-accent'>{bike.brand}</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='p-3 m-2 bg-error rounded-lg flex'>
                                            <ExclamationTriangleIcon color='white' className='w-6 h-6 mt-[2px] mr-3 '/>    
                                            <div className='text-white font-medium'>Digite o número de uma bicicleta cadastrada no nosso sistema.</div>   
                                        </div>
                                    )
                                }
                            </div>

                            {loja ? (
                                <div className='flex justify-between p-2 m-2 mt-3 bg-cinzaClaro rounded-lg'>
                                    <div>
                                        <div className='text-sm text-white w-fit mr-auto mb-2 bg-cinza rounded-md py-1 px-3'>Loja</div>
                                        <img src={`${'https://bikemobi.com.br/api'}/lojaFoto/${loja?.photo}`} className='w-36 h-36 object-cover rounded-lg mr-4' alt="" />
                                    </div>
                                    <div className='w-[240px]'>
                                        <div className='text-sm'>{loja?.description.slice(0, 250)}</div>
                                        <div className='text-sm text-accent w-fit ml-auto mt-2 border-2 border-cinza rounded-md py-1 px-3'>{loja?.tel_fixo}</div>
                                    </div>
                                </div>
                            ) : null}

                            <TextInput name="Valor MDO"
                                width={`w-full`}
                                defaultValue={data?.valor_mdo}
                                onChange={handleValue}
                                price
                                disabled={des}
                            />
                            <TextareaInput name="Descrição"
                                width={`w-full`}
                                defaultValue={data?.description}
                                onChange={handleDescription}
                                required
                                disabled={des}
                            />
                            {data?.photo_1 || data == null ? (
                                <FileInput name="Foto 1"
                                    text="Upload"
                                    description="SVG, PNG ou JPG "
                                    onChange={setPhoto_1}
                                    defaultValue={data?.photo_1}
                                    typeImgURL='manutencaoFoto'
                                    disabled={des}
                                />
                            ) : null}
                            {data?.photo_2 || data == null ? (
                                <FileInput name="Foto 2"
                                    text="Upload"
                                    description="SVG, PNG ou JPG "
                                    onChange={setPhoto_2}    
                                    defaultValue={data?.photo_2}
                                    typeImgURL='manutencaoFoto'
                                    disabled={des}
                                />
                            ) : null}
                            {data?.photo_3 || data == null ? (
                                <FileInput name="Foto 3"
                                    text="Upload"
                                    description="SVG, PNG ou JPG "
                                    onChange={setPhoto_3}
                                    defaultValue={data?.photo_3}
                                    typeImgURL='manutencaoFoto'
                                    disabled={des}
                                />
                            ) : null}
                            {/* <RadioInput name="Buscar e entregar a bicicleta?"
                                items={[
                                    { name: 'sim'},
                                    { name: 'não'},
                                ]}
                                value={data?.type}
                                onChange={handleType}
                                required
                            /> */}

                        </div>

                        {/* Deletar */}
                        <div className={`${editOn} ${createOn} flex flex-col items-center`}>
                            <span className={`mt-6 font-bold text-lg text-neutral-600`}>Tem certeza que deseja deletar essa manutenção?</span>
                        </div>

                        <div className={`relative w-full mt-16`}>
                            <ButtonModalComponent
                                title={submit}
                                data={data}
                                newData={newData}
                                url={'maintence'}
                                disabled={bike ? false : true}
                                baseUrl='manutencao'
                            />
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

export default ModalManutencoes