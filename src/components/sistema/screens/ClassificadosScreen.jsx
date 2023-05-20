'use client'
import React, { useState } from "react";
import CardClassificados from '@/components/site/custom/CardClassificados'
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import ModalClassificados from "../modals/ModalClassificados";


const ClassificadosScreen = (props) => {

    const [search, setSearch] = useState('')

    const path = usePathname()
    const router = useRouter()

    const produtosFiltrados = props.produtos?.filter((item) => {
        return item.title.toLowerCase().includes(search.toLowerCase())
    })

    function renderCards() {
        if (produtosFiltrados.length > 0) {
            return produtosFiltrados.map((item) => {
                return (
                    <CardClassificados
                        key={item.id}
                        title={item.title}
                        photo={item.photo}
                        description={item.description}
                        price={item.price}
                        id={item.id}
                    ></CardClassificados>
                )
            })
        } else {
            return (
                <div className="flex justify-center items-center flex-col absolute text-center" >
                    <p className="font-dmsans font-bold text-2xl text-tomEscuro">Nenhum anúncio encontrado</p>
                    <p className="font-dmsans font-normal text-lg text-tomEscuro">Tente novamente com outra palavra-chave</p>
                </div>
            )
        }
    }

    return(
        <div id="teste" className=" ">
            <div className="bg-azul rounded-xl p-4 lg:py-8 xl:p-8 my-16 mx-8 lg:mx-32 flex flex-col lg:flex-row">
                <div className="flex mb-3 lg:mb-0 w-full items-center relative">
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar um anúncio" type="text" name="input-search" id="input-search" className="border p-2 pl-3 rounded-md border-white bg-azul placeholder:text-neutral-300 text-white w-full focus:outline-none" />
                    <MagnifyingGlassIcon className="w-6 h-6 absolute right-2 text-white"/>
                </div>
                <ModalClassificados path={path} action="create" id="null"/>
            </div>

            <div className={`grid justify-items-center ${ path == "/classificados" ? "grid-cols-1 lg:grid-cols-2 gap-4" : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}`}>
                {renderCards()}
            </div>

        </div>
    )
}


export default ClassificadosScreen

