'use client'

import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '@/contexts/Api';
import { AuthContext } from '@/contexts/Auth';

const PremiumDash = () => {

    const { instance } = useContext(ApiContext)
    const {authData} = useContext(AuthContext)

    const [users, setUsers] = useState()
    const [searchName, setSearchName] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(0)

    const query = async (currentPage, searchName) => {
        await instance.get(`http://localhost:8000/api/allUsers?page=${currentPage}&name=${searchName}`)
        .then(response => {
            setUsers(response.data.data);
            console.log(response)
            setLoading(0)
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        query(currentPage, searchName)
    }, [currentPage, loading]);
    console.log(users)

    const updatePremiumStatus = async (id, premium) => {
        setLoading(id)
        
        const formDataUser = new FormData();
        formDataUser.append('premium', premium);
        try {
            await instance.postForm(`/users/${id}?_method=PUT`, formDataUser).then(resp => console.log(resp))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='p-10'>
            <div className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="Pesquisar"  onChange={(e) => setSearchName(e.target.value)}/>
                    </div>
                </div>

                <div className="indicator">
                    <button className="btn join-item" onClick={() => query(currentPage, searchName)}>Pesquisar</button>
                </div>
            </div>
            <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th></th>
                        <th>Usuario</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => (
                        <tr key={user.id}>
                            <th>{user.id}</th>
                            <td>{user.name}</td>
                            <td>
                                <button className={`btn bg-transparent border-none ${user.premium == 1 ? 'text-primary' : null}`} onClick={() => updatePremiumStatus(user.id, user.premium == 1 ? 0 : 1)}>
                                    {user.premium == 1 ? 'Valido' : 'Invalido'}
                                    {loading == user.id ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : null}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {!users ? (
                <div className='flex justify-center my-20'>
                    <div className="loading loading-spinner loading-lg text-primary mx-auto"></div>
                </div>
            ) : null}

            <div className="join grid grid-cols-2 my-10 w-64 mx-auto">
                <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous page</button>
                <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={users?.length < 50}>Next</button>
            </div>
        </div>
    );
};

export default PremiumDash;
