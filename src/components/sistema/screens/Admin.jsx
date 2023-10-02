'use client'

import { ApiContext } from '@/contexts/Api';
import React, { useContext, useEffect, useState } from 'react';

function Admin() {

    const { instance } = useContext(ApiContext)
    

    /// ---------------------------------------------- ctrl + m ///
    const [isButtonVisible, setIsButtonVisible] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'm') {
                setIsButtonVisible(prev => !prev);
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    /// ------------------------------------------------------- ///

    // Users
    const [users, setUsers] = useState()
    const [searchUsersName, setSearchUsersName] = useState()
    const [currentUsersPage, setCurrentUsersPage] = useState(1)
    const [loadingUsers, setLoadingUsers] = useState(0)

    const query = async (currentPage, searchName) => {
        await instance.get(`http://localhost:8000/api/allUsers?page=${currentPage}&name=${searchName}`)
        .then(response => {
            setUsers(response.data.data);
            console.log(response)
            setLoadingUsers(0)
        })
        .catch(error => console.error(error));
    }

    // useEffect(() => {
    //     query(currentPage, searchName)
    // }, [currentPage, loading]);
    // console.log(users)

    const getUser = async (id, premium) => {
        
        const formDataUser = new FormData();
        formDataUser.append('premium', premium);
        try {
            await instance.postForm(`/users/${id}?_method=PUT`, formDataUser).then(resp => console.log(resp))
            setLoadingUsers(id)
        } catch (error) {
            console.error(error)
        }
    }

    const changePage = (page) => {
        setCurrentUsersPage(page)
        query(page, searchUsersName)
    }
    
    return (
        <div>
            {isButtonVisible && <button className='btn my-4' onClick={() => query(currentUsersPage, searchUsersName)}>Users</button>}
            {users ? (
                <div className='p-10'>
                    <div className="join">
                        <div>
                            <div>
                                <input className="input input-bordered join-item" placeholder="Pesquisar"  onChange={(e) => setSearchUsersName(e.target.value)}/>
                            </div>
                        </div>
        
                        <div className="indicator">
                            <button className="btn join-item" onClick={() => query(currentUsersPage, searchUsersName)}>Pesquisar</button>
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
                                        <button className={`btn bg-transparent border-none ${user.premium == 1 ? 'text-primary' : null}`} onClick={() => getUser(user.id, user.premium == 1 ? 0 : 1)}>
                                            {user.premium == 1 ? 'Valido' : 'Invalido'}
                                            {loadingUsers == user.id ? (
                                                <span className="btn btn-success">Sucesso</span>
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
                        <button className="join-item btn btn-outline" onClick={() => changePage(currentUsersPage - 1)} disabled={currentUsersPage === 1}>Previous page</button>
                        <button className="join-item btn btn-outline" onClick={() => changePage(currentUsersPage + 1)} disabled={users?.length < 50}>Next</button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default Admin;
