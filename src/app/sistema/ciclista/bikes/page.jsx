'use client'

import BikesScreen from '@/components/sistema/screens/BikesScreen'
import { ApiContext } from '@/contexts/Api';
import { AuthContext } from '@/contexts/Auth';
import React, { useContext, useEffect, useState } from "react";



const Bikes = () => {
  const { authData } = useContext(AuthContext)

  return (
    <BikesScreen produtos={authData.bikes}/>
  )
}

export default Bikes