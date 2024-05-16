'use client'

import TableComponent from '@/components/sistema/TableComponent'
import TextareaInput from '@/components/sistema/inputs/TextareaInput'
import FormLojista from '@/components/sistema/screens/FormLojista'
import ManutencoesScreen from '@/components/sistema/screens/ManutencoesScreen'
import { ApiContext } from '@/contexts/Api'
import { PencilSquareIcon, TrashIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import React, { useContext, useState } from 'react'

const CiclistaManager = () => {

    const {instance} = useContext(ApiContext)
    const [loading, setLoading] = useState(0)

    const ButtonUpdatePremium = ({item}) => {

        const updatePremiumStatus = async (id, premium) => {
            setLoading(id)
            
            const formDataUser = new FormData();
            formDataUser.append('premium', premium);
            console.log('user-id', id)
            try {
                await instance.postForm(`/users/${id}?_method=PUT`, formDataUser).then(resp => console.log(resp))
            } catch (error) {
                console.error(error)
            }
        }

        return(
            <button 
                className={`btn bg-transparent border-none ${item.user?.premium == 1 ? 'text-primary' : null}`} 
                onClick={() => updatePremiumStatus(item.user?.id, item.user?.premium == 1 ? 0 : 1)}
            >
                {}
                {loading == item.user?.id ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    item.user?.premium == 1 ? 'Valido' : 'Invalido'
                )}
            </button>
        )
    }

    const ConvertDate = ({item}) => {
        var dataOriginal = new Date(item.user.dateExpiracao)

        function adicionarZero(numero) {
            return numero < 10 ? "0" + numero : numero;
        }

        var dia = adicionarZero(dataOriginal.getDate())
        var mes = adicionarZero(dataOriginal.getMonth() + 1)
        var ano = dataOriginal.getFullYear()

        var dataFormatada = dia + '/' + mes + '/' + ano

        return dataFormatada
    }

    const TextArea = ({item}) => {
        return  (
            <TextareaInput value={item.observer} disabled/>
        )
    }

    const UserDetails = ({item}) => {

        const fakeAuthData = {user: item.user, type: item}

        const updateAccount = async (data) => {
        
            const formDataUser = new FormData();
            for (const key in data.user) {
                if (data.user[key] != undefined) {
                    formDataUser.append(key, data.user[key]);
                }
            }
            try {
                await instance.postForm(`/users/${fakeAuthData.user.id}?_method=PUT`, formDataUser).then(resp => console.log(resp))
            } catch (error) {
                console.error(error)
            }
    
            const formDataType = new FormData();
            for (const key in data.type) {
                if (data.type[key] != undefined) {
                    formDataType.append(key, data.type[key]);
                }
            }
            try {
                await instance.postForm(`/lojaUpdate/${fakeAuthData.type.id}?_method=PUT`, formDataType).then(resp => console.log(resp))
            } catch (error) {
            }
            setTimeout(() => {
                document.location.reload()
            }, 800);
        }

        return(
            <div>
                <button className="btn bg-transparent border-none" onClick={()=>document.getElementById(`details_${item.id}`).showModal()}><PencilSquareIcon className='h-6 text-azul'/></button>
                <dialog id={`details_${item.id}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-xl text-tomEscuro mx-auto w-fit">Editar Ciclista</h3>
                    <FormLojista register={false} data={fakeAuthData} onClick={updateAccount}/>
                </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        )
    }

    const Manutencoes = ({item}) => {
        const [manutencoes, setManutencoes] = useState()
        
        const fakeAuthData = {user: item.user, type: item, manutencoes: manutencoes}
        
        const getManutencoesToModal = async () => {
            await instance(`/manutencaoFromLoja/${item.id}`).then(resp => setManutencoes(resp.data))
            document.getElementById(`manutencoes_${item.id}`).showModal()
        }
        
        return(
            <div>
                <button className="btn bg-transparent border-none text-azul" onClick={getManutencoesToModal}><WrenchScrewdriverIcon className='h-6 text-azul'/></button>
                <dialog id={`manutencoes_${item.id}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl min-h-[90vh]">
                    <h3 className="font-bold text-xl text-tomEscuro mx-auto w-fit">Manutenções</h3>
                    <ManutencoesScreen authData={fakeAuthData} create={false}/>
                </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        )
    }

    const DeleteUserAndType  = ({item}) => {

        const deleteAccount = async () => {
        
            try {
                await instance.postForm(`/lojaDelete/${item.id}?_method=DELETE`).then(resp => console.log(resp))
            } catch (error) {
                console.error(error)
            }
            
            try {
                await instance.postForm(`/users/${item.user.id}?_method=DELETE`).then(resp => console.log(resp))
            } catch (error) {
            }
            setTimeout(() => {
                document.location.reload()
            }, 800);
        }

        return(
            <div>
                <button className="btn bg-transparent border-none" onClick={()=>document.getElementById(`delete_${item.id}`).showModal()}><TrashIcon className='h-6 text-error'/></button>
                <dialog id={`delete_${item.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-tomEscuro mx-auto w-fit">Deletar Loja</h3>
                    <p className='text-lg text-tomEscuro text-center mt-4'>Tem certeza de que deseja deletar esta loja?</p>
                    <p className='text-tomEscuro text-center  my-4'>Esta ação não poderá ser revertida, dados relacionados a este usuario como suas bicicletas, manutenções e outros podem serem apagados ou corrompidos, é sempre indicado inativar o usuario ao invez de deleta-lo</p>
                    <button className='btn btn-error text-white ml-auto flex' onClick={deleteAccount}>Deletar</button>
                </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        )
    }

    const ButtonInactivate = ({item}) => {

        const updateInactive = async (id, inactivated) => {
            setLoading(id)
            
            const formDataUser = new FormData();
            formDataUser.append('inactivated_at', inactivated);
            console.log('inactivated_at', inactivated)
            try {
                await instance.postForm(`/users/${id}?_method=PUT`, formDataUser).then(resp => console.log(resp))
            } catch (error) {
                console.error(error)
            }
        }

        const now = new Date().toJSON()

        return(
            <button 
                className={`btn bg-transparent border-none `} 
                onClick={() => updateInactive(item.user?.id, item.user?.inactivated_at?.length <= 1 ? now : '0')}
            >
                {item.user?.inactivated_at?.length > 1 ? item.user?.inactivated_at.slice(0, 10) : 'Ativo'}
                {loading == item.user?.id ? (
                    <span className="loading loading-spinner"></span>
                ) : null}
            </button>
        )
    }

    return (
        <TableComponent route='allLojas' 
        fields={[
            {component: false, indexes:['user', 'name']},
            {component: false, indexes:['user', 'email']},
            {component: false, indexes:['user', 'city']},
            {component: false, indexes:['user', 'state']},
            {component: TextArea},
            {component: ButtonUpdatePremium, indexes: null},
            {component: ConvertDate},
            {component: UserDetails},
            {component: Manutencoes},
            {component: DeleteUserAndType},
            {component: ButtonInactivate},
        ]}
        cols={['Nome', 'Email', 'Cidade', 'Estado', 'Serviços', 'Premium', 'Data de Expiração', 'Detalhes', 'Manutenções', 'Apagar', 'Inativado']}
        loading={loading} 
        setLoading={setLoading}
        />
    )
}

export default CiclistaManager