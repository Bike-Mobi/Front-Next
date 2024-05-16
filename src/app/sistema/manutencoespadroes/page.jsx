'use client'

import ModalManutencoesPadroes from '@/components/sistema/modals/ModalManuntecoesPadroes'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const ManutencoesPadroes = () => {
    const { authData } = useContext(AuthContext)

    return (
        <div className="overflow-x-auto p-10">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nome da Manutenção</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {authData.manutencoespadroes?.map(item => (
                        <tr key={item.id}>
                            <th>{item.id}</th>
                            <td>{item.name}</td>
                            <td>R$ {item.price}</td>
                            <td className='max-w-[174px]'>{item.description?.length > 99 ? item.description.slice(0, 97) + '...' : item.description}</td>
                            <td className={`flex text-white flex-col sm:flex-row md:flex-col lg:flex-row py-8`}>
                                <ModalManutencoesPadroes type='edit' item={item}/>
                                <ModalManutencoesPadroes type='delete' item={item}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ManutencoesPadroes