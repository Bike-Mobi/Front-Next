'use client'
import React, { useEffect, useState } from 'react'
import NumberInput from '../inputs/NumberInput';
import RadioInput from '../inputs/RadioInput';
import TextInput from '../inputs/TextInput';
import ButtonModalComponent from '../utils/ButtonModalComponent';
import TitleModalComponent from '../utils/TitleModalComponent';

const ModalManutencoes = (props) => {
    const data = props.data

    const [user, setUser] = useState(data?.user)
    const [value, setValue] = useState(data?.value)
    const [type, setType] = useState(data?.type)
    const [description, setDescription] = useState(data?.description)
    const [search, setSearch] = useState('')
    const [content, setContent] = useState('CPF')

    const handleContent = (e) => {
        setContent(e.target.textContent)
        
    
    }
    const handleValue = (e) => setValue(e.target.value)
    const handleType = (e) => setType(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    const ciclistasFiltrados = props.ciclistas?.filter((ciclista) => {
        return ciclista.name.toLowerCase().includes(search.toLowerCase())
    })

    
    let detailsOn, editOn , deleteOn, createOn, submit, styleButton, des;
    if(data?.id+'e' == props?.idModal){
        editOn = 'hidden'
        submit = 'edit'
        styleButton = 'bg-azul'
    }
    else if(data?.id+'D' == props?.idModal){
        deleteOn = 'hidden'
        submit = 'delete'
        styleButton = 'bg-error'
    }
    else if(data?.id+'d' == props?.idModal){
        detailsOn = 'hidden'
        des=true
    }else{
        createOn = 'hidden'
        submit = 'create'
        styleButton = 'bg-success'
    }

    let newData = {
        ciclista: content,
        value: value,
        description: description,
        type: type,
    }

    return (
        <div className="">
            <input type="checkbox" id={`my-modal-${props?.idModal}`} className="modal-toggle" />
            <label htmlFor={`my-modal-${props?.idModal}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative" htmlFor="">
                    <label htmlFor={`my-modal-${props?.idModal}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    
                    <div className='flex flex-col items-center w-full'>
                        <TitleModalComponent action={submit} title={'Manutenção'}/>

                        {/* Criar/Editar */}
                        <div className={`${deleteOn} flex flex-col w-full`}>


                            <span className={`mt-6 label-text font-medium px-1 py-2`}>Ciclista</span>
                            <div className="dropdown">
                                <p tabIndex={0} type="text" className='border rounded-md border-cinza w-full p-[11px] cursor-text text-cinza'>{content}</p>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow rounded-box w-full bg-cinzaClaro block max-h-[250px] overflow-auto">
                                    <li><input className='w-full border rounded-md cursor-text' type="text" placeholder="Search.." id="myInput" onChange={(e) => setSearch(e.target.value)}/></li>

                                    {ciclistasFiltrados?.map((ciclista, index) => (
                                        <li key={index} value={ciclista.name} className={`text-neutral-900`} onClick={handleContent}><a>{ciclista.name}</a></li>
                                    ))}
                                </ul>
                            </div>


                            <NumberInput name="Valor MDO"
                                width={`w-full`}
                                defaultValue={data?.value}
                                disabled={des}
                                onChange={handleValue}
                            />
                            <TextInput name="Descrição"
                                width={`w-full`}
                                defaultValue={data?.description}
                                required
                                disabled={des}
                                onChange={handleDescription}
                            />
                            <RadioInput name="Buscar e entregar a bicicleta?"
                                items={[
                                    { name: 'sim'},
                                    { name: 'não'},
                                ]}
                                value={data?.type}
                                required
                                disabled={des}
                                onChange={handleType}
                            />

                        </div>

                        {/* Deletar */}
                        <div className={`${editOn} ${detailsOn} ${createOn} flex flex-col items-center`}>
                            <span className={`mt-6 font-bold text-lg text-neutral-600`}>Tem certeza que deseja deletar essa manutenção?</span>
                        </div>

                        <div className={`relative w-full mt-16 ${detailsOn} ${styleButton}`}>
                            <ButtonModalComponent title={submit} onClick={() => (null)}/>
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