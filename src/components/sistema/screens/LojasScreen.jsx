'use client'
import { ApiContext } from '@/contexts/Api'
import React, { useContext, useEffect, useState } from 'react'
import CardLoja from '../modals/CardLoja'
import { useRouter } from 'next/navigation'

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
    
    // useEffect(() => {
    //     axios.get('https://www.strava.com/api/v3/athlete/activities', {
    //         headers: {
    //             Authorization: `Bearer 5cd3226e0459c73d5bdbaac5c05f6e2f6486ddad`
    //         }
    //     }).then(resp => console.log(resp)).catch(error => console.error(error))
    // }, [])

    const router = useRouter()

    return(
        <div className={`mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2`}>
            {/* <button onClick={() => router.push(`${'https://bikemobi.com.br/api'}/auth/strava`)}>Press here</button> */}
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