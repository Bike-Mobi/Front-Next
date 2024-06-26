'use client'

import FileInput from '@/components/sistema/inputs/FileInput'
import ButtonModalComponent from '@/components/sistema/utils/ButtonModalComponent'
import { ApiContext } from '@/contexts/Api'
import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'

const Banners = () => {

    const { instance } = useContext(ApiContext)

    const [bannerPhoto, setBannerPhoto] = useState()
    const [banners, setBanners] = useState()
    const [loading, setLoading] = useState()

    useEffect(() => {        
        instance.get('/allBanners').then(resp => setBanners(resp.data))
    }, [loading])

    const updateBannerStatus = async (id, setLoadingParam) => {
        setLoadingParam(id)
        
        try {
            await instance.patch(`/banner/${id}/toggle-active`).then(resp => {
                console.log(resp)
                setLoading(null)
            })
        } catch (error) {
            console.error(error)
        }
    }

    const deleteBanner = async (id) => {
        
        try {
            await instance.delete(`/bannerDelete/${id}`).then(resp => {
                console.log(resp)
                setTimeout(() => {
                    document.location.reload()
                }, 800);
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <FileInput onChange={setBannerPhoto}/>
                <ButtonModalComponent
                    title='Add banner'
                    newData={
                        {
                            title: 'teste',
                            photo: bannerPhoto
                        }
                    }
                    baseUrl='banner'
                />
                <button className='btn'></button>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Título</th>
                                <th>Foto</th>
                                <th>Ativar</th>
                                <th>Deletar</th>
                            </tr>
                        </thead>
                        <tbody>
                        {banners?.map(item => (
                            <tr key={item.id}>
                                <th>{item.id}</th>
                                <td>{item.title}</td>
                                <td>
                                    <div className="rounded-full ">
                                        <img className='object-cover w-44 h-24 rounded-lg m-2' src={`${process.env.NEXT_PUBLIC_API}/bannerFoto/${item.photo}`}/>
                                    </div>
                                </td>
                                <td>
                                <button className={`btn bg-transparent border-none ${item.is_active == true ? 'text-primary' : null}`} onClick={() => updateBannerStatus(item.id, setLoading)}>
                                    
                                    {loading == item.id ? (
                                        <span className="loading loading-spinner"></span>
                                    ) : item.is_active ? 'Ativo' : 'Inativo'}
                                </button>
                                </td>
                                <td>
                                    <TrashIcon className='text-error w-6 h-6 cursor-pointer' onClick={() => deleteBanner(item.id)}/>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
        </div>

    )
}

export default Banners