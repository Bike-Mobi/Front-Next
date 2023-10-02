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
        user: {
            name: nome,
            email: email,
            password: senha,
            password_confirmation: confirmaSenha,
            phone: celular,
            city: cidade,
            state: estado,
            premium: null,
            dateExpiracao: null,
            inactivated_at: null,
            store_id: null,
            cpf: cpf,
            rg: rg,
            birthday: date,
            email_verified_at: null,
        },
        type: {
            photo: photo,
            cpf: cpf,
            nascimento: date,
            street: rua,
            number: numero,
            neighborhood: bairro,
            cep: cep,
            sexo: sexo,
            bloodType: sangue,
            cityCT: cidade,
            stateCT: estado,
        }
    }
    console.log(newData)

    return (
        <div className={`mx-auto xl:px-28 ${!props.register ? 'px-0 py-10' : 'p-10'} xl:py-10 xl:my-10 xl:border-cinzaClaro xl:border-2 rounded-lg w-fit`}>
            <div  className={`flex flex-col ${!props.register ? 'xl:flex-row' : 'md:flex-row'}`}>
                <div className='grid items-center'>
                    <EmailInput name="E-mail"
                        required
                        width={`${!props.register ? 'w-72 md:w-[420px] lg:w-[520px]' : 'w-80 md:w-[520px]'}`}
                        defaultValue={data?.user?.email}
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
                <div className={`md:ml-auto mr-auto ${!props.register ? 'xl:mt-0 xl:mr-0' : 'md:mr-0 md:mt-0'} mt-8`}>
                    <FileInput name="Foto de Perfil"
                        text="Upload"
                        description="SVG, PNG ou JPG "
                        onChange={handlePhoto}
                        size='h-36 w-36'
                        defaultValue={data?.type?.photo}
                        typeImgURL='ciclistaFoto'
                    />
                </div>
            </div>
            <div className='divider'></div>
            <div className={`flex flex-col ${!props.register ? 'xl:flex-row' : 'md:flex-row'} gap-8 md:gap-16`}>
                <div className='w-fit'>
                    <TextInput name="Nome"
                        required
                        width={`${!props.register ? 'w-72 md:w-[420px] lg:w-[520px]' : 'w-80 md:w-[520px]'}`}
                        onChange={handleNome}
                        defaultValue={data?.user?.name}
                    />

                    <div className={`flex flex-col ${!props.register ? 'lg:flex-row' : 'md:flex-row'} gap-8 mt-8 justify-between`}>
                        <DateInput name="Nascimento"
                            onChange={handleDate}
                            className="w-60"
                            defaultValue={data?.type?.nascimento}
                        />
                        <TextInput name="Celular"
                            mask="(99) 99999-9999"
                            required
                            width="w-60"
                            onChange={handleCelular}
                            defaultValue={data?.user?.phone}
                        />
                        
                    </div>

                    <div className={`flex flex-col ${!props.register ? 'lg:flex-row' : 'md:flex-row'} gap-8 mt-8 justify-between`}>
                        <TextInput name="RG"
                            mask="9.999.999"
                            required
                            width="w-60"
                            defaultValue={data?.user?.rg}
                            onChange={handleRg}
                        />
                        <TextInput name="CPF"
                            mask="999.999.999-99"
                            required
                            width="w-60"
                            onChange={handleCpf}
                            defaultValue={data?.user?.cpf}
                        />
                    </div>
                    <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                        <RadioInput name="Sexo"
                            onChange={handleSexo}
                            items={[
                                { name: 'Masculino' },
                                { name: 'Feminino' }
                            ]}
                            value={data?.type?.sexo}
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
                            value={data?.type?.bloodType}
                        />
                    </div>
                </div>
            </div>
            <div className='divider'></div>
            <div>
                <div className={`flex flex-col ${!props.register ? 'xl:flex-row' : 'md:flex-row'} gap-8 justify-between`}>
                    <TextInput name="CEP"
                        mask="99999-999"
                        required
                        width="w-60"
                        onChange={handleCep}
                        defaultValue={data?.type?.cep}
                    />
                    <TextInput name="Bairro"
                        width="w-60"
                        defaultValue={bairro ? bairro : data?.type?.neighborhood}
                        onChange={handleBairro}
                    />
                    <NumberInput name="Número"
                        width="w-40"
                        onChange={handleNumero}
                        value={data?.type?.number}
                    />
                </div>

                <div className={`flex flex-col ${!props.register ? 'xl:flex-row' : 'md:flex-row'} gap-10 justify-between mt-8`}>
                    <TextInput name="Rua"
                        width={`${!props.register ? 'w-72 md:w-[420px] lg:w-[520px]' : 'w-80 md:w-[520px]'}`}
                        defaultValue={rua ? rua : data?.type?.street}
                        onChange={handleRua}
                    />
                    <TextInput name="Estado"
                        mask="aa"
                        required
                        width="w-40"
                        defaultValue={estado ? estado : data?.type?.stateCT}
                        onChange={handleEstado}
                    />
                </div>

                <div className='justify-between mt-8'>
                    <TextInput name="Cidade"
                        width="w-60"
                        required
                        defaultValue={cidade ? cidade : data?.type?.cityCT}
                        onChange={handleCidade}
                    />
                </div>
            </div>
            <button className='btn mt-11' onClick={() => props.onClick(newData)}>{submit}</button>
        </div>
    )
}

export default FormCiclista