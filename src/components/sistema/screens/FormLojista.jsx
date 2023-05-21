'use client'

import DateInput from '@/components/sistema/inputs/DateInput'
import FileInput from '@/components/sistema/inputs/FileInput'
import NumberInput from '@/components/sistema/inputs/NumberInput'
import RadioInput from '@/components/sistema/inputs/RadioInput'
import TextInput from '@/components/sistema/inputs/TextInput'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CheckBoxInput } from '../inputs/CheckBoxInput'
import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'

const FormLojista = (props) => {

    const data = props.data

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
    const [cnpj, setCnpj] = useState()
    const [cpf, setCpf] = useState()
    const [telefone, setTelefone] = useState()
    const [celular, setCelular] = useState()
    const [cep, setCep] = useState()
    const [bairro, setBairro] = useState()
    const [numero, setNumero] = useState()
    const [rua, setRua] = useState()
    const [cidade, setCidade] = useState()
    const [estado, setEstado] = useState()
    const [descricao, setDescricao] = useState()
    const [manutencao, setManutencao] = useState(data?.services.maintenance)
    const [vendabike, setVendabike] = useState(data?.services.bikeSale)
    const [hospedagem, setHospedagem] = useState(data?.services.hosting)
    const [vendapeca, setVendapeca] = useState(data?.services.partsSale)
    const [alimentacao, setAlimentacao] = useState(data?.services.food)
    const [eventos, setEventos] = useState(data?.services.events)
    const [transporte, setTransporte] = useState(data?.services.transport)
    const [acessorios, setAcessorios] = useState(data?.services.accessories)
    const [guia, setGuia] = useState(data?.services.guide)


    const [photo, setPhoto] = useState()

    const handlePhoto = (file) => {
        setPhoto(file)
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
    const handleCnpj = (e) => setCnpj(e.target.value)
    const handleCpf = (e) => setCpf(e.target.value)
    const handleTelefone = (e) => setTelefone(e.target.value)
    const handleCelular = (e) => setCelular(e.target.value)
    const handleCep = (e) => setCep(e.target.value)
    const handleBairro = (e) => setBairro(e.target.value)
    const handleNumero = (e) => setNumero(e.target.value)
    const handleRua = (e) => setRua(e.target.value)
    const handleCidade = (e) => setCidade(e.target.value)
    const handleEstado = (e) => setEstado(e.target.value)
    const handleDescricao = (e) => setDescricao(e.target.value)
    const handleManutencao = (e) => setManutencao( prev => !prev)
    const handleVendabike = (e) => setVendabike(prev => !prev)
    const handleHospedagem = (e) => setHospedagem(prev => !prev)
    const handleVendapeca = (e) => setVendapeca(prev => !prev)
    const handleAlimentacao = (e) => setAlimentacao(prev => !prev)
    const handleEventos = (e) => setEventos(prev => !prev)
    const handleTransporte = (e) => setTransporte(prev => !prev)
    const handleAcessorios = (e) => setAcessorios(prev => !prev)
    const handleGuia = (e) => setGuia(prev => !prev)

    let newData = {
        name: nome,
        email: email,
        password: senha,
        password_confirmation: confirmaSenha,
        cnpj: cnpj,
        cpf: cpf,
        phone: celular,
        telephone: telefone,
        description: descricao,
        type: 'Shopkeeper',
        services: {
            maintenance: manutencao,
            bikeSale: vendabike,
            hosting: hospedagem,
            partsSale: vendapeca,
            food: alimentacao,
            events: eventos,
            transport: transporte,
            accessories: acessorios,
            guide: guia
        },
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
            <div  className='flex flex-col lg:flex-row'>
                <div className='grid items-center'>
                    <EmailInput name="E-mail"
                        required
                        width={`w-full ${!props.register ? 'lg:w-[500px]' : ''} `}
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
                <div className='md:w-auto md:ml-auto mr-auto mt-4'>
                    <FileInput name="Foto de Perfil"
                        text="Upload"
                        description="SVG, PNG ou JPG "
                        onChange={handlePhoto}
                        className={`w-[150px] h-[150px] object-cover`}
                    />
                </div>
            </div>
            <div className='divider'></div>
            <div className='flex flex-col md:flex-row gap-8 md:gap-16'>
                <div className='w-full'>
                    <TextInput name="Nome"
                        required
                        width={`w-full ${!props.register ? '' : 'md:w-[500px]'}`}
                        onChange={handleNome}
                        value={data?.name}
                    />

                    <div className={`flex flex-col ${!props.register ? 'lg:flex-row' : 'md:flex-row'} justify-between`}>
                        <div className={'flex flex-col md:flex-row gap-8 mt-8 justify-between'}>
                            <TextInput name="Telefone"
                                mask="(99) 99999-9999"
                                required
                                width="w-60"
                                onChange={handleTelefone}
                                value={data?.telephone}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                            <TextInput name="Celular"
                                mask="(99) 99999-9999"
                                required
                                width="w-60"
                                onChange={handleCelular}
                                value={data?.phone}
                            />
                        </div>
                    </div>

                    <div className={`flex flex-col ${!props.register ? 'lg:flex-row' : 'md:flex-row'} justify-between`}>
                        <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                            <TextInput name="CNPJ"
                                mask="99.999.999/9999-99"
                                required
                                width="w-60"
                                onChange={handleCnpj}
                                value={data?.cnpj}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                            <TextInput name="CPF"
                                mask="999.999.999-99"
                                required
                                width="w-60"
                                onChange={handleCpf}
                                value={data?.cpf}
                            />
                        </div>
                    </div>

                </div>
                <div>

                </div>
            </div>
            <div className='divider'></div>
            <div>
                <div className={`flex flex-col lg:flex-row ${!props.register ? 'gap-0' : 'gap-8'}  justify-between`}>
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

                <div className={`flex flex-col ${!props.register ? '' : 'md:flex-row'} gap-10 justify-between mt-8`}>
                    <TextInput name="Rua"
                        width="w-full"
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

                <div className='mt-8'>

                    <span className={`label-text font-medium mb-2`}>Servisos Prestados</span>

                    <div className='' >
                    <CheckBoxInput
                        className={`w-full ${!props.register ? '' : 'md:w-[584px] lg:w-[700px]'} `}
                        items={[
                            {name: 'Manutenção', toogle: handleManutencao, value: manutencao},
                            {name: 'Venda de bike', toogle: handleVendabike, value: vendabike},
                            {name: 'Hospedagem', toogle: handleHospedagem, value: hospedagem},
                            {name: 'Transporte', toogle: handleTransporte, value: transporte},
                            {name: 'Venda de peça', toogle: handleVendapeca, value: vendapeca},
                            {name: 'Venda de acessorio', toogle: handleAcessorios, value: acessorios},
                            {name: 'Alimentação', toogle: handleAlimentacao, value: alimentacao},
                            {name: 'Guia Turistico', toogle: handleGuia, value: guia},
                            {name: 'Promotor de Eventos Esportivos', toogle: handleEventos, value: eventos},
                        ]}
                        />
                    </div>
                </div>

                <div className='justify-between mt-8'>
                    <TextInput name="Descrição"
                        width={`w-full ${!props.register ? '' : 'md:w-[584px] lg:w-[700px]'} `}
                        required
                        value={descricao ? descricao : data?.description}
                        onChange={handleDescricao}
                    />
                </div>
            </div>
            <button className='btn mt-11' onClick={() => props.onClick(newData)}>{submit}</button>
        </div>
    )
}

export default FormLojista