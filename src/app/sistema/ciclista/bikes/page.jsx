'use client'

import BikesScreen from '@/components/sistema/screens/BikesScreen'
import { ApiContext } from '@/contexts/Api';
import { AuthContext } from '@/contexts/Auth';
import React, { useContext, useEffect, useState } from "react";



const Bikes = () => {
  const { authData } = useContext(AuthContext)
  const { instance } = useContext(ApiContext)
  
  const [produtos, setProdutos] = useState([])
  
  const getProdutos = async (authData) => {
    const allProdutos = await instance(`/bicicletas/${authData.type.id}`)
    setProdutos(allProdutos.data)
  }
  useEffect(() => {
    getProdutos(authData)
  }, [])

  return (
    <BikesScreen produtos={produtos}/>
  )
}

export default Bikes