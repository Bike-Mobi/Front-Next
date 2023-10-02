'use client'

import ManutencoesScreen from '@/components/sistema/screens/ManutencoesScreen'
import { AuthContext } from '@/contexts/Auth'
import React, { useContext } from 'react'

const page = () => {

  const { authData } = useContext(AuthContext)

  return (
    <div className=''>
      <ManutencoesScreen create={authData?.user?.type == 'Cyclist' ? false : true} />
    </div>
  )
}

export default page
