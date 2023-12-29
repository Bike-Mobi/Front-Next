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
import { AuthContext } from '@/contexts/Auth';
import { DocumentTextIcon, PlusIcon, SwatchIcon } from '@heroicons/react/24/outline';

const ModalManutencoes = (props) => {

    const { instance } = useContext(ApiContext)
    const { authData } = useContext(AuthContext)

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
    const [userReceiverId, setUserReceiverId] = useState()

    const [search, setSearch] = useState('')
    const [content, setContent] = useState('')

    const [useMp, setUseMp] =  useState(true)
    const [manutencaopadrao, setManutencaopadrao] =  useState({title: null, price: null, description: null})
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
        setNumberBike(bike.data[0]?.number_check)
        // return bike.data[0].number_check
    }
  
    // const bikeCiclista = buscaBike?.filter((item) => {
    //   return item.cyclist_id == ciclistaID
    // })

    const [disableWarning, setDisableWarning] = useState(false)


    const sendNotification = async  () => {

        const dataMessage = {
            title: 'Encontramos sua bicicleta!',
            message: `A sua bicicleta de número de quadro igual a ${numberBike} foi encontrada por ${authData.user.name}. Entre em contato atravez do número ${authData.user.phone}.`,
            type: 'bike found',
            viewed: 0,
            user_id_sender: authData.user.id,
            cyclist_id_receiver: bike.cyclist_id
        }
        console.log(dataMessage)

        const formData = new FormData();
        for (const key in dataMessage) {
            formData.append(key, dataMessage[key]);
        }

        await instance.postForm('/message', formData).then(resp => {
            console.log(resp)
            setDisableWarning(true)
        })
    }

    function arrayToObject(array) {
        // Inicializa o objeto resultante
        const resultObject = {};
      
        // Itera sobre cada objeto no array
        array.forEach(item => {
            // Obtém o valor da chave 'name'
            const key = item.name;
        
            // Cria um novo objeto usando as propriedades 'price' e 'description'
            const newObj = { price: item.price, description: item.description };
        
            // Atribui o novo objeto ao objeto resultante usando a chave 'name'
            resultObject[key] = newObj;
        });
      
        return resultObject;
    }

    const handleManutencaoPadraoData = (key) => {

/*         const defineManutencaoPadraoObj = {
            selecione: {price: '', description: ''},
            title: {price: '124', description: 'ahdakuskluafasdfkluaklfa'},
            titleteste: {price: '324', description: 'kab29end0n 2934uf 34'}
        } */

        const defineManutencaoPadraoObj = arrayToObject(authData.manutencoespadroes)

        console.log('values: ', key)
        setValue(defineManutencaoPadraoObj[key]?.price)
        setDescription(defineManutencaoPadraoObj[key]?.description)
    }

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
                                <div className='flex justify-between'>
                                    <TextInput name="Número da Bike"
                                        width={`w-full`}
                                        onChange={handleNumberBike}
                                        value={numberBike}
                                        required
                                        disabled={des}
                                    />

                                    <div className='tooltip tooltip-left mt-auto ml-4' data-tip='Utilizar Manutenção Padrão'>
                                        <button disabled={des} onClick={() => setUseMp(!useMp)} className='btn w-20 h-10 p-1'><SwatchIcon className='h-6 w-6'/></button>
                                    </div>
                                </div>
                                {loading ? (
                                    <div className='h-24 w-full flex'>
                                        <div className="inline-block h-5 w-5 my-6 mx-auto animate-spin rounded-full border-4 border-solid border-primary border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                    </div>
                                ) :
                                    bike ? (
                                        <div>
                                            <div className='flex p-2 m-2 mt-3 bg-cinzaClaro rounded-lg'>
                                                <img src={`${process.env.NEXT_PUBLIC_API}/bicicletaFoto/${bike.photo_1}`} className='w-14 h-14 object-cover rounded-lg mr-4' alt="" />
                                                <div className='flex flex-col gap-1'>
                                                    <div className='font-semibold text-tomEscuro text-lg'>{bike.nameBike}</div>
                                                    <div className='text-accent'>{bike.brand}</div>
                                                </div>
                                            </div>
                                            {bike.is_thiefs ? (
                                                <div className='p-3 m-2 bg-warning rounded-lg flex'>
                                                    <ExclamationTriangleIcon color='white' className='w-6 h-6 mt-[2px] mr-3 '/>    
                                                    <div>
                                                        <div className='text-white font-bold'>Atenção</div>  
                                                        <div className='text-white font-medium'>Este número de serie corresponde a uma bicicleta que se encontra em estado de furto, clique no botão abaixo para notificar ao dono.</div>
                                                        <button onClick={sendNotification} disabled={disableWarning} className='btn btn-sm bg-white text-warning ml-auto flex'>Notificar</button>
                                                    </div> 
                                                </div>
                                            ) : null}
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
                                        <img src={`${process.env.NEXT_PUBLIC_API}/lojaFoto/${loja?.photo}`} className='w-36 h-36 object-cover rounded-lg mr-4' alt="" />
                                    </div>
                                    <div className='w-[240px]'>
                                        <div className='text-sm'>{loja?.description?.slice(0, 250)}</div>
                                        <div className='text-sm text-accent w-fit ml-auto mt-2 border-2 border-cinza rounded-md py-1 px-3'>{loja?.tel_fixo}</div>
                                    </div>
                                </div>
                            ) : null}

                            <div hidden={useMp || des}>
                                <label className="label">
                                    <span className={`label-text font-medium`}>Manutenção Padrão</span>
                                </label>
                                <select className="select select-bordered border-cinza w-full" onChange={(e) => handleManutencaoPadraoData(e.target.value)}>
                                    <option value='selecione' selected>Selecione</option>
                                    {authData.manutencoespadroes.map(item => (
                                        <option value={item.name}>{item.name}</option>
                                    ))}
                                </select>
                            </div>

                            <TextInput name="Valor MDO"
                                width={`w-full`}
                                defaultValue={data?.valor_mdo}
                                onChange={handleValue}
                                price
                                disabled={des}
                                value={value}
                            />
                            <TextareaInput name="Descrição"
                                width={`w-full`}
                                defaultValue={data?.description}
                                onChange={handleDescription}
                                required
                                disabled={des}
                                value={description}
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

export default ModalManutencoes