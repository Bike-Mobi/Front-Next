'use client'
import React, { useState } from "react";
import CardClassificados from '@/components/site/custom/CardClassificados'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


const ViewClassificados = (props) => {

    const [search, setSearch] = useState('')

    const path = usePathname()

    const produtosFiltrados = props.produtos?.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase())
    })


    return(
        <div>
            <div className="bg-azul rounded-xl p-4 md:py-8 lg:p-8 my-16 mx-8 md:mx-32 flex flex-col md:flex-row">
                <div className="flex mb-3 md:mb-0 w-full items-center relative">
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar um anúncio" type="text" name="input-search" id="input-search" className="border p-2 pl-3 rounded-md border-white bg-azul placeholder:text-neutral-300 text-white w-full focus:outline-none" />
                    <MagnifyingGlassIcon className="w-6 h-6 absolute right-2 text-white"/>
                </div>
                <button className="bg-tomEscuro text-white lg:px-4 rounded-md font-medium flex items-center justify-center py-1 md:py-0 w-[190px] md:w-[257px] lg:w-[293px] text-sm lg:text-base md:ml-4" ><Link href={ path == "/classificados" ? "/autenticacao/login" : ''}>+ Adicionar um Anúncio</Link></button>
            </div>

            <div className={`grid justify-items-center ${ path == "/classificados" ? "grid-cols-1 lg:grid-cols-2 gap-4" : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
                {
                    produtosFiltrados?.map((item) => (
                        <CardClassificados
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            description={item.description}
                            photo={item.photo}
                        ></CardClassificados>
                    ))
                }
            </div>

        </div>
    )
}


export default ViewClassificados

