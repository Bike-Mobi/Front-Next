'use client'

import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '@/contexts/Api';

const TableComponent = ({route, fields, cols, loading, setLoading}) => {
    const { instance } = useContext(ApiContext)

    const [data, setData] = useState()
    const [searchName, setSearchName] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const query = async (currentPage, searchName) => {
        await instance.get(`${route}?page=${currentPage}&name=${searchName}`)
        .then(response => {
            setData(response.data.data);
            console.log('table',response)
            setLoading(0)
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        query(currentPage, searchName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, loading]);

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
                        {cols.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index )=> (
                        <tr key={index}>
                            <th>{item.id}</th>
                            {fields?.map((ind, i) => (
                                <td key={i}>
                                    {ind.component ? (
                                        <div>{<ind.component item={item}/>}</div>
                                    ) : 
                                        typeof ind.indexes == 'object' ? (
                                            <div>{item[ind.indexes[0]][ind.indexes[1]]}</div>
                                        ) : (
                                            <div>{item[ind.indexes]}</div>
                                        )
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {!data ? (
                <div className='flex justify-center my-20'>
                    <div className="loading loading-spinner loading-lg text-primary mx-auto"></div>
                </div>
            ) : null}

            <div className="join grid grid-cols-2 my-10 w-64 mx-auto">
                <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous page</button>
                <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={data?.length < 50}>Next</button>
            </div>
        </div>
    );
}

export default TableComponent