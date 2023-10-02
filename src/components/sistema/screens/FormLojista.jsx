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
import TextareaInput from '../inputs/TextareaInput'

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
    // const [manutencao, setManutencao] = useState(data?.services.maintenance)
    // const [vendabike, setVendabike] = useState(data?.services.bikeSale)
    // const [hospedagem, setHospedagem] = useState(data?.services.hosting)
    // const [vendapeca, setVendapeca] = useState(data?.services.partsSale)
    // const [alimentacao, setAlimentacao] = useState(data?.services.food)
    // const [eventos, setEventos] = useState(data?.services.events)
    // const [transporte, setTransporte] = useState(data?.services.transport)
    // const [acessorios, setAcessorios] = useState(data?.services.accessories)
    // const [guia, setGuia] = useState(data?.services.guide)


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
    // const handleManutencao = (e) => setManutencao( prev => !prev)
    // const handleVendabike = (e) => setVendabike(prev => !prev)
    // const handleHospedagem = (e) => setHospedagem(prev => !prev)
    // const handleVendapeca = (e) => setVendapeca(prev => !prev)
    // const handleAlimentacao = (e) => setAlimentacao(prev => !prev)
    // const handleEventos = (e) => setEventos(prev => !prev)
    // const handleTransporte = (e) => setTransporte(prev => !prev)
    // const handleAcessorios = (e) => setAcessorios(prev => !prev)
    // const handleGuia = (e) => setGuia(prev => !prev)

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
            cnpj: cnpj,
            birthday: null,
            email_verified_at: null,
        },
        type: {
            name: nome,
            photo: photo,
            tel_fixo: telefone,
            cnpj: cnpj,
            cpf: cpf,
            observer: null,
            street: rua,
            number: numero,
            neighborhood: bairro,
            city: cidade,
            state: estado,
            cep: cep,
            description: descricao,
        }
    }

    return (
        <div className={`mx-auto xl:px-28 xl:py-10 xl:my-10 lg:border-cinzaClaro rounded-lg w-fit ${!props.register ? 'p-0 py-10 xl:border-2' : 'p-10 lg:border-2'}`}>
            <div  className='flex flex-col lg:flex-row'>
                <div className='grid items-center'>
                    <EmailInput name="E-mail"
                        required
                        width={` ${!props.register ? 'w-72 sm:w-full lg:w-[500px]' : 'w-full'} `}
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
                {/* md:w-auto md:ml-auto mr-auto mt-4 */}
                <div className='ml-0 mr-auto mt-4 md:mx-auto lg:ml-auto lg:mt-0 lg:mr-0'>
                    <FileInput name="Foto de Perfil"
                        text="Upload"
                        description="SVG, PNG ou JPG "
                        onChange={handlePhoto}
                        size='h-36 w-36'
                        defaultValue={data?.type?.photo}
                        typeImgURL='lojaFoto'
                        
                        // className={`w-[150px] h-[150px] object-cover`}
                    />
                </div>
            </div>
            <div className='divider'></div>
            <div className='flex flex-col md:flex-row gap-8 md:gap-16'>
                <div className='w-full'>
                    <TextInput name="Nome"
                        required
                        width={`w-full`}
                        onChange={handleNome}
                        defaultValue={data?.user?.name}
                    />

                    <div className={`flex flex-col ${!props.register ? 'lg:flex-row' : 'md:flex-row'} justify-between`}>
                        <div className={'flex flex-col md:flex-row gap-8 mt-8 justify-between'}>
                            <TextInput name="Telefone"
                                mask="(99) 99999-9999"
                                required
                                width="w-80"
                                onChange={handleTelefone}
                                defaultValue={data?.type?.tel_fixo}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                            <TextInput name="Celular"
                                mask="(99) 99999-9999"
                                required
                                width="w-80"
                                onChange={handleCelular}
                                defaultValue={data?.user?.phone}
                            />
                        </div>
                    </div>

                    <div className={`flex flex-col ${!props.register ? 'lg:flex-row' : 'md:flex-row'} justify-between`}>
                        <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                            <TextInput name="CNPJ"
                                mask="99.999.999/9999-99"
                                required
                                width="w-80"
                                onChange={handleCnpj}
                                defaultValue={data?.type?.cnpj}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-8 mt-8 justify-between'>
                            <TextInput name="CPF"
                                mask="999.999.999-99"
                                required
                                width="w-80"
                                onChange={handleCpf}
                                defaultValue={data?.type?.cpf}
                            />
                        </div>
                    </div>

                </div>
            </div>
            <div className='divider'></div>
            <div>
                <div className={`flex flex-col lg:flex-row gap-8 ${!props.register ? 'lg:gap-0' : ''} justify-between`}>
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

                <div className={`flex flex-col ${!props.register ? '' : 'md:flex-row'} gap-10 justify-between mt-8`}>
                    <TextInput name="Rua"
                        width="w-full"
                        defaultValue={rua ? rua : data?.type?.street}
                        onChange={handleRua}
                    />
                    <TextInput name="Estado"
                        mask="aa"
                        required
                        width="w-40"
                        defaultValue={estado ? estado : data?.user?.state}
                        onChange={handleEstado}
                    />
                </div>

                <div className='justify-between mt-8'>
                    <TextInput name="Cidade"
                        width="w-60"
                        required
                        defaultValue={cidade ? cidade : data?.user?.city}
                        onChange={handleCidade}
                    />
                </div>

                {/* <div className='mt-8'>

                    <span className={`label-text font-medium mb-2`}>Servisos Prestados</span>

                    <div className='' >
                    <CheckBoxInput
                        className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-start ${!props.register ? '' : 'md:w-[584px] lg:w-[700px]'} `}
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
                </div> */}

                <div className='justify-between mt-8'>
                    <TextareaInput name="Descrição"
                        width={`w-full ${!props.register ? '' : 'md:w-[584px] lg:w-[700px]'} `}
                        required
                        defaultValue={descricao ? descricao : data?.type?.description}
                        onChange={handleDescricao}
                    />
                </div>
            </div>
            <button className='btn mt-11' onClick={() => props.onClick(newData)}>{submit}</button>
        </div>
    )
}

export default FormLojista