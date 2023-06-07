'use client'
import { ApiContext } from '@/contexts/Api'
import React, { useContext, useEffect, useState } from 'react'
import CardLoja from '../modals/CardLoja'

const LojasScreen = (props) => {

//   const {instance} = useContext(ApiContext)
//   const [buscaLojas, setBuscaLojas] = useState([])

//   useEffect(() => {
//     instance.get("/users")
//     .then((response) => setBuscaLojas(response.data))
//   }, [])

// const lojas = buscaLojas.data?.filter((item) => {
//     return item.type == "Shopkeeper"
// })

return(
    <div className={`mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2`}>
        {props.lojas.map((item, index) => {
            return (
                <div key={index} className={`flex justify-center items-center`}>
                    <CardLoja data={item}/>
                </div>
            )
        })}
    </div>
)
}

export default LojasScreen