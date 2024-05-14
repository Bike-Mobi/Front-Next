'use client'

import ManutencoesScreen from '@/components/sistema/screens/ManutencoesScreen'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const Manutencoes = () => {

  const { authData } = useContext(AuthContext)

  return (
    <div className=''>
      <ManutencoesScreen authData={authData} create={true} />
    </div>
  )
}

export default Manutencoes
