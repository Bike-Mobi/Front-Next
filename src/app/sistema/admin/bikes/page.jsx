'use client'

import BikesScreen from '@/components/sistema/screens/BikesScreen'
import { AuthContext } from '@/contexts/Auth';
import React, { useContext } from "react";

const page = () => {

  const { authData } = useContext(AuthContext)

  return (
    <BikesScreen produtos={authData.bikes}/>
  )
}

export default page