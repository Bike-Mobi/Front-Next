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
    const [typeData, setTypeData] = useState()
    const [userBikes, setUserBikes] = useState()
    const [userManutencoes, setUserManutencoes] = useState()
    const [loading, setLoading] = useState(false)

    const query = async (currentPage, searchName) => {
        await instance.get(`http://localhost:8000/api/allUsers?page=${currentPage}&name=${searchName}`)
        .then(response => {
            setUsers(response.data.data);
            console.log(response)
/*             setLoadingUsers(0) */
        })
        .catch(error => console.error(error));
    }

    // useEffect(() => {
    //     query(currentPage, searchName)
    // }, [currentPage, loading]);
    // console.log(users)



    const getUserType = async (user) => {

        document.getElementById(`my_modal_${user.id}`).showModal()

        if (user.type == 'Cyclist') {
            const type = await instance.get(`/ciclistaFromUser/${user.id}`).then(resp => setTypeData(resp.data))
        } else {
            await instance.get(`/lojaFromUser/${user.id}`).then(resp => setTypeData(resp.data))
        }
    }

    const getUserInfos = async (user) => {
        setLoading(true)
        if (user.type == 'Cyclist') {
            await instance.get(`/bicicletas/${typeData?.[0].id}`).then(resp => setUserBikes(resp.data))
            await instance.get(`/manutencaoFromCyclist/${typeData?.[0].id}`).then(resp => setUserManutencoes(resp.data))
            setLoading(false)
        } else {
            await instance.get(`/manutencaoFromLoja/${typeData?.[0].id}`).then(resp => setUserManutencoes(resp.data))
            setLoading(false)
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
                                        <button className="btn bg-transparent border-none text-primary" onClick={()=>getUserType(user)}>Infos</button>
                                        <dialog id={`my_modal_${user.id}`} className="modal">
                                            <div className="modal-box">
                                                <h2 className="font-bold text-lg my-4">{user.name}</h2>
                                                <h3 className="font-bold text-md m-2">User data:</h3>
                                                <div className="mockup-code bg-white border-2 border-tomEscuro text-neutral p-4">
                                                    <pre><code>{JSON.stringify(user, null, '   ')}</code></pre>
                                                </div>
                                                <h3 className="font-bold text-md m-2 mt-8">Type data: {user.type}</h3>
                                                <div className="mockup-code bg-white border-2 border-tomEscuro text-neutral p-4">
                                                    <pre><code>{JSON.stringify(typeData, null, '   ')}</code></pre>
                                                </div>
                                                <button className='btn my-4' onClick={()=>getUserInfos(user)}>load more infos</button>
                                                {loading ? (
                                                    <div><span className="loading loading-dots loading-xs"></span></div>
                                                ) : (
                                                    <div>
                                                        {user?.id == typeData?.[0].user_id ? 
                                                            <div>
                                                                {typeData?.[0].id == userBikes?.[0].cyclist_id ? (
                                                                    <div>
                                                                        <h3 className="font-bold text-md m-2 mt-8">Bikes</h3>
                                                                        <p className='m-2'>cyclist_id: {userBikes?.[0]?.cyclist_id} === id de ciclista: {typeData?.[0].id}</p>
                                                                        <div className="mockup-code bg-white border-2 border-tomEscuro text-neutral p-4">
                                                                            <pre><code>{JSON.stringify(userBikes, null, '   ')}</code></pre>
                                                                        </div>
                                                                        <h3 className="font-bold text-md m-2 mt-8">Manutenções</h3>
                                                                        <p className='m-2'>Manutenções by Ciclista</p>
                                                                        <div className="mockup-code bg-white border-2 border-tomEscuro text-neutral p-4">
                                                                            <pre><code>{JSON.stringify(userManutencoes, null, '   ')}</code></pre>
                                                                        </div>
                                                                
                                                                    </div>
                                                                    

                                                                ) : null}
                                                                {typeData?.[0].id == userManutencoes?.[0]?.loja_id ? (
                                                                    <div>
                                                                        <h3 className="font-bold text-md m-2 mt-8">Manutenções</h3>
                                                                        <p className='m-2'>Manutenções by Loja</p>
                                                                        <div className="mockup-code bg-white border-2 border-tomEscuro text-neutral p-4">
                                                                            <pre><code>{JSON.stringify(userManutencoes, null, '   ')}</code></pre>
                                                                        </div>
                                                                    </div>

                                                                ) : null}
                                                            </div>
                                                        : null}
                                                    </div>
                                                )}
                                            </div>
                                            <form method="dialog" className="modal-backdrop">
                                                <button>close</button>
                                            </form>
                                        </dialog>
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
