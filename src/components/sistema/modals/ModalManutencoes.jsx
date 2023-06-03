'use client'
import React, { useEffect, useState, useRef } from 'react'
import NumberInput from '../inputs/NumberInput';
import RadioInput from '../inputs/RadioInput';
import TextInput from '../inputs/TextInput';
import ButtonModalComponent from '../utils/ButtonModalComponent';
import TitleModalComponent from '../utils/TitleModalComponent';

const ModalManutencoes = (props) => {
    const data = props.data

    const [value, setValue] = useState(data?.value)
    const [type, setType] = useState(data?.type)
    const [description, setDescription] = useState(data?.description)
    const [search, setSearch] = useState('')
    const [content, setContent] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const inputSearch = useRef(null);

    const handleContent = (e) => {
        setContent(e.target.textContent)

        setTimeout(() => {
            handleDropdown()
            setSearch('')
        }, 100);
    }

    const handleValue = (e) => setValue(e.target.value)
    const handleType = (e) => setType(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleSearch = (e) => setSearch(e.target.value)
    const handleDropdown = () => {
        setIsOpen(!isOpen)
        setTimeout(() => {
            inputSearch.current.focus()
        }, 200);
    }

    const ciclistasFiltrados = props.ciclistas?.filter((ciclista) => {
        return ciclista.cpf.toLowerCase().includes(search.toLowerCase())
    })

    
    let editOn , deleteOn, createOn, submit, styleButton, des;
    if(data?.id+'e' == props?.idModal){
        editOn = 'hidden'
        submit = 'edit'
        styleButton = 'bg-azul'
    }
    else if(data?.id+'D' == props?.idModal){
        deleteOn = 'hidden'
        submit = 'delete'
        styleButton = 'bg-error'
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
        content: content
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

                            <div className="dropdown-menu relative">

                                <TextInput name="Ciclista"
                                    width={`w-full`}
                                    defaultValue={data?.title ? data?.title: null}
                                    value={(content && !des) ? content : data?.title}
                                    required
                                    onClick={handleDropdown}
                                    placeholder={'cpf'}
                                />
                                {isOpen && (
                                    <ul className={`absolute p-2 shadow rounded-box w-full bg-cinzaClaro block max-h-[250px] overflow-auto`}>
                                        <li><input ref={inputSearch} className='w-full border rounded-md cursor-text p-1' type="text" placeholder="Digite um cpf" id="myInput" onChange={handleSearch}/></li>

                                        {ciclistasFiltrados?.map((ciclista, index) => (
                                            <li key={index} value={ciclista.name} className={`text-neutral-800 p-2 cursor-pointer`} onClick={handleContent}><a>{ciclista.name} - {ciclista.cpf}</a></li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <NumberInput name="Valor MDO"
                                width={`w-full`}
                                defaultValue={data?.value}
                                onChange={handleValue}
                            />
                            <TextInput name="Descrição"
                                width={`w-full`}
                                defaultValue={data?.description}
                                onChange={handleDescription}
                                required
                            />
                            <RadioInput name="Buscar e entregar a bicicleta?"
                                items={[
                                    { name: 'sim'},
                                    { name: 'não'},
                                ]}
                                value={data?.type}
                                onChange={handleType}
                                required
                            />

                        </div>

                        {/* Deletar */}
                        <div className={`${editOn} ${createOn} flex flex-col items-center`}>
                            <span className={`mt-6 font-bold text-lg text-neutral-600`}>Tem certeza que deseja deletar essa manutenção?</span>
                        </div>

                        <div className={`relative w-full mt-16 ${styleButton}`}>
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