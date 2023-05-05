'use client'

import DateInput from '@/components/sistema/inputs/DateInput'
import NumberInput from '@/components/sistema/inputs/NumberInput'
import RadioInput from '@/components/sistema/inputs/RadioInput'
import TextInput from '@/components/sistema/inputs/TextInput'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const configCiclista = () => {
    
    const [date, setDate] = useState()
    const [name, setName] = useState()
    const [cpf, setCpf] = useState()
    const [sangue, setSangue] = useState()
    const [celular, setCelular] = useState()
    const [sexo, setSexo] = useState()
    const [cep, setCep] = useState()
    const [bairro, setBairro] = useState()
    const [numero, setNumero] = useState()
    const [rua, setRua] = useState()
    const [cidade, setCidade] = useState()
    const [estado, setEstado] = useState()

    useEffect(() => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(resp => {
                setBairro(resp.data.bairro)
                setRua(resp.data.logradouro)
                setCidade(resp.data.localidade)
                setEstado(resp.data.uf)
            })
            .catch(error => console.log(error))
    }, [cep])

    const handleDate = (e) => setDate(e.target.value)
    const handleName = (e) => setName(e.target.value)
    const handleCpf = (e) => setCpf(e.target.value)
    const handleSangue = (e) => setSangue(e.target.value)
    const handleCelular = (e) => setCelular(e.target.value)
    const handleSexo = (e) => setSexo(e.target.value)
    const handleCep = (e) => setCep(e.target.value)
    const handleBairro = (e) => setBairro(e.target.value)
    const handleNumero = (e) => setNumero(e.target.value)
    const handleRua = (e) => setRua(e.target.value)
    const handleCidade = (e) => setCidade(e.target.value)
    const handleEstado = (e) => setEstado(e.target.value)

    return (
        <form className='mx-auto xl:px-28 p-10 xl:py-10 xl:my-10 xl:border-cinzaClaro xl:border-2 rounded-lg w-fit'>
            <div className='flex flex-col md:flex-row gap-8 md:gap-16'>
                <div className='w-fit'>
                    <TextInput name="Nome"
                        required
                        width="w-80 md:w-[520px]"
                        onChange={handleName}
                    />

                    <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                        <DateInput name="Nascimento"
                            onChange={handleDate}
                            className="w-60"
                        />
                        <TextInput name="CPF"
                            mask="999.999.999-99"
                            required
                            width="w-60"
                            onChange={handleCpf} />
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                        <RadioInput name="Sexo"
                            onChange={handleSexo}
                            items={[
                                { name: 'Masculino' },
                                { name: 'Feminino' }
                            ]}
                        />
                        <TextInput name="Celular"
                            mask="(99) 99999-9999"
                            required
                            width="w-60"
                            onChange={handleCelular}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <RadioInput name="Tipo Sanguíneo"
                            onChange={handleSangue}
                            items={[
                                { name: 'A+' },
                                { name: 'A-' },
                                { name: 'B+' },
                                { name: 'B-' },
                                { name: 'AB+' },
                                { name: 'AB-' },
                                { name: 'O+' },
                                { name: 'O-' },
                            ]}
                        />
                    </div>
                </div>
            </div>
            <div className='divider'></div>
            <div>
                <div className='flex flex-col md:flex-row gap-8 justify-between'>
                    <TextInput name="CEP"
                        mask="99999-999"
                        required
                        width="w-60"
                        onChange={handleCep}
                    />
                    <TextInput name="Bairro"
                        width="w-60"
                        value={bairro}
                        onChange={handleBairro}
                    />
                    <NumberInput name="Número"
                        width="w-40"
                        onChange={handleNumero}
                    />
                </div>

                <div className='flex flex-col md:flex-row gap-10 justify-between mt-8'>
                    <TextInput name="Rua"
                        width="w-80 md:w-[520px]"
                        value={rua}
                        onChange={handleRua}
                    />
                    
                    <TextInput name="Estado"
                        mask="aa"
                        required
                        width="w-40"
                        value={estado}
                        onChange={handleEstado}
                    />
                </div>

                <div className='justify-between mt-8'>
                    <TextInput name="Cidade"
                        width="w-60"
                        required
                        value={cidade}
                        onChange={handleCidade}
                    />
                </div>
            </div>
            <button className='btn mt-11'>Submit</button>
        </form>
    )
}

export default configCiclista