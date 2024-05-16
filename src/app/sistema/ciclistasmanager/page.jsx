'use client'

import TableComponent from '@/components/sistema/TableComponent'
import BikesScreen from '@/components/sistema/screens/BikesScreen'
import FormCiclista from '@/components/sistema/screens/FormCiclista'
import ManutencoesScreen from '@/components/sistema/screens/ManutencoesScreen'
import { IconBike } from '@/components/sistema/utils/icons'
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
        // Data original
        var dataOriginal = new Date(item.user.dateExpiracao)

        function adicionarZero(numero) {
            return numero < 10 ? "0" + numero : numero;
        }

        // Extrair dia, mês e ano
        var dia = adicionarZero(dataOriginal.getDate())
        var mes = adicionarZero(dataOriginal.getMonth() + 1) // Adicionar 1 pois o mês começa em 0
        var ano = dataOriginal.getFullYear()

        // Formatar para DD/MM/AAAA
        var dataFormatada = dia + '/' + mes + '/' + ano

        return dataFormatada // Saída: 15/01/2018
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
                await instance.postForm(`/ciclistaUpdate/${fakeAuthData.type.id}?_method=PUT`, formDataType).then(resp => console.log(resp))
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
                    <FormCiclista register={false} data={fakeAuthData} onClick={updateAccount}/>
                </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        )
    }

    const Bikes = ({item}) => {
        const [bikes, setBikes] = useState()

        const getBikesToModal = async () => {
            await instance(`/bicicletas/${item.id}`).then(resp => setBikes(resp.data))
            document.getElementById(`bikes_${item.id}`).showModal()
        }

        return(
            <div>
                <button className="btn bg-transparent border-none text-azul" onClick={getBikesToModal}><IconBike/></button>
                <dialog id={`bikes_${item.id}`} className="modal">
                <div className="modal-box w-11/12 max-w-5xl min-h-[90vh]">
                    <h3 className="font-bold text-xl text-tomEscuro mx-auto w-fit">Bikes</h3>
                    <BikesScreen produtos={bikes}/>
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
            await instance(`/manutencaoFromCyclist/${item.id}`).then(resp => setManutencoes(resp.data))
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
                await instance.postForm(`/ciclistaDelete/${item.id}?_method=DELETE`).then(resp => console.log(resp))
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
                    <h3 className="font-bold text-xl text-tomEscuro mx-auto w-fit">Deletar Ciclista</h3>
                    <p className='text-lg text-tomEscuro text-center mt-4'>Tem certeza de que deseja deletar este ciclista?</p>
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
        <TableComponent route='allCiclistas' 
        fields={[
            {component: false, indexes:['user', 'name']},
            {component: false, indexes:['user', 'email']},
            {component: false, indexes:['user', 'city']},
            {component: false, indexes:['user', 'state']},
            {component: ButtonUpdatePremium, indexes: null},
            {component: ConvertDate},
            {component: UserDetails},
            {component: Bikes},
            {component: Manutencoes},
            {component: DeleteUserAndType},
            {component: ButtonInactivate},
        ]}
        cols={['Nome', 'Email', 'Cidade', 'Estado', 'Premium', 'Data de Expiração', 'Detalhes', 'Bikes', 'Manutenções', 'Apagar', 'Inativado']}
        loading={loading} 
        setLoading={setLoading}
        />
    )
}

export default CiclistaManager