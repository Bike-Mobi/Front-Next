'use client'
import CardBicicleta from '@/components/sistema/modals/CardBicicleta'
import ModalBicicleta from '@/components/sistema/modals/ModalBicicleta'
import { AuthContext } from '@/contexts/Auth';
import { fakeApi } from "@/service/fakeApi";
import React, { useContext, useState } from "react";

const BikesScreen = (props) => {

  const { authData } = useContext(AuthContext)

    const data = props.produtos
    console.log(data)

      return (
        <div className={`m-10 my-10`}>
          
            <div className={`my-16 ml-0 md:ml-[13px]  px-0 flex justify-center md:justify-start`}>
              <ModalBicicleta
                action="create"
                data={data}
                cyclistId = {authData.type.id}
              />
            </div>
    
            <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 xl:gap-8 justify-items-center`}>
              {data?.map((produto) => (
                <CardBicicleta
                key={produto.id}
                data={produto}
                />
              ))}
            </div>
        </div>
      )
    }

export default BikesScreen