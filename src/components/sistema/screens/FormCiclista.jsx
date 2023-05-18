'use client'

import DateInput from '@/components/sistema/inputs/DateInput'
import FileInput from '@/components/sistema/inputs/FileInput'
import NumberInput from '@/components/sistema/inputs/NumberInput'
import RadioInput from '@/components/sistema/inputs/RadioInput'
import TextInput from '@/components/sistema/inputs/TextInput'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'

const FormCiclista = (props) => {

    const data = props.data
    console.log(data)

    let hidePass, submit
    if (props.register) {
        hidePass = 'flex'
        submit = 'Criar Conta'
    } else {
        hidePass = 'hidden'
        submit = 'Atualizar'
    }

    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [confirmaSenha, setConfirmaSenha] = useState()
    const [date, setDate] = useState()
    const [cpf, setCpf] = useState()
    const [rg, setRg] = useState()
    const [sangue, setSangue] = useState()
    const [celular, setCelular] = useState()
    const [sexo, setSexo] = useState()
    const [cep, setCep] = useState()
    const [bairro, setBairro] = useState()
    const [numero, setNumero] = useState()
    const [rua, setRua] = useState()
    const [cidade, setCidade] = useState()
    const [estado, setEstado] = useState()

    const [photo, setPhoto] = useState()

    const handlePhoto = (file) => {
        setPhoto(file)
        console.log("photo: ",photo)
    }

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

    const handleNome = (e) => setNome(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handleSenha = (e) => setSenha(e.target.value)
    const handleConfirmaSenha = (e) => setConfirmaSenha(e.target.value)
    const handleDate = (e) => setDate(e.target.value)
    const handleCpf = (e) => setCpf(e.target.value)
    const handleRg = (e) => setRg(e.target.value)
    const handleSangue = (e) => setSangue(e.target.value)
    const handleCelular = (e) => setCelular(e.target.value)
    const handleSexo = (e) => setSexo(e.target.value)
    const handleCep = (e) => setCep(e.target.value)
    const handleBairro = (e) => setBairro(e.target.value)
    const handleNumero = (e) => setNumero(e.target.value)
    const handleRua = (e) => setRua(e.target.value)
    const handleCidade = (e) => setCidade(e.target.value)
    const handleEstado = (e) => setEstado(e.target.value)

    let newData = {
        name: nome,
        email: email,
        password: senha,
        password_confirmation: confirmaSenha,
        cpf: cpf,
        rg: rg,
        birthday: date,
        phone: celular,
        blood: sangue,
        sexo: sexo,
        type: 'Cyclist',
        address: {
            street: rua,
            number: numero,
            neighborhood: bairro,
            city: cidade,
            state: estado,
            cep: cep
        }
    }

    return (
        <div className='mx-auto xl:px-28 p-10 xl:py-10 xl:my-10 xl:border-cinzaClaro xl:border-2 rounded-lg w-fit'>
            <div  className='flex md:flex-row flex-col'>
                <div className='grid items-center'>
                    <EmailInput name="E-mail"
                        required
                        width="w-80 md:w-[520px]"
                        value={data?.email}
                        onChange={handleEmail}
                    />
                    <div className={`${hidePass} flex-col md:flex-row gap-8 mt-8 justify-between`}>
                        <PasswordInput name="Senha"
                            required
                            width="w-60"
                            onChange={handleSenha}
                        />
                        <PasswordInput name="Confirme sua Senha"
                            required
                            width="w-60"
                            onChange={handleConfirmaSenha}
                        />
                    </div>
                </div>
                <div className='md:ml-auto mr-auto md:mr-0 mt-4 md:mt-0'>
                    <FileInput name="Foto de Perfil"
                        text="Upload"
                        description="SVG, PNG ou JPG "
                        onChange={handlePhoto}
                    />
                </div>
            </div>
            <div className='divider'></div>
            <div className='flex flex-col md:flex-row gap-8 md:gap-16'>
                <div className='w-fit'>
                    <TextInput name="Nome"
                        required
                        width="w-80 md:w-[520px]"
                        onChange={handleNome}
                        value={data?.name}
                    />

                    <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                        <DateInput name="Nascimento"
                            onChange={handleDate}
                            className="w-60"
                            value={data?.birthday}
                        />
                        <TextInput name="Celular"
                            mask="(99) 99999-9999"
                            required
                            width="w-60"
                            onChange={handleCelular}
                            value={data?.phone}
                        />
                        
                    </div>
                    
                    <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                        <TextInput name="RG"
                            mask="9.999.999"
                            required
                            width="w-60"
                            value={data?.rg}
                            onChange={handleRg}
                        />
                        <TextInput name="CPF"
                            mask="999.999.999-99"
                            required
                            width="w-60"
                            onChange={handleCpf}
                            value={data?.cpf}
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                        <RadioInput name="Sexo"
                            onChange={handleSexo}
                            items={[
                                { name: 'Masculino' },
                                { name: 'Feminino' }
                            ]}
                            value={data?.sexo}
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
                            value={data?.blood}
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
                        value={data?.address.cep}
                    />
                    <TextInput name="Bairro"
                        width="w-60"
                        value={bairro ? bairro : data?.address.neighborhood}
                        onChange={handleBairro}
                    />
                    <NumberInput name="Número"
                        width="w-40"
                        onChange={handleNumero}
                        value={data?.address.number}
                    />
                </div>

                <div className='flex flex-col md:flex-row gap-10 justify-between mt-8'>
                    <TextInput name="Rua"
                        width="w-80 md:w-[520px]"
                        value={rua ? rua : data?.address.street}
                        onChange={handleRua}
                    />
                    
                    <TextInput name="Estado"
                        mask="aa"
                        required
                        width="w-40"
                        value={estado ? estado : data?.address.state}
                        onChange={handleEstado}
                    />
                </div>

                <div className='justify-between mt-8'>
                    <TextInput name="Cidade"
                        width="w-60"
                        required
                        value={cidade ? cidade : data?.address.city}
                        onChange={handleCidade}
                    />
                </div>
            </div>
            <button className='btn mt-11' onClick={() => props.onClick(newData)}>{submit}</button>
        </div>
    )
}

export default FormCiclista