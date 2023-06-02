'use client'
import CardBicicleta from '@/components/sistema/modals/CardBicicleta'
import ModalBicicleta from '@/components/sistema/modals/ModalBicicleta'
import { fakeApi } from "@/service/fakeApi";
import React, { useState } from "react";

const BikesScreen = (props) => {

  // const [carlos, setCarlos] = useState({})

  // fakeApi.bicicleta().then(
  //     (response) => {
  //         setCarlos(response)
  //     }
  // ).catch(
  //     (error) => {
  //         console.log("error", error)
  //     }
  // )

  // console.log('tteste1', carlos)

  // const teste = fakeApi.bicicleta();
  // console.log('tteste2', teste)

    const data = props.produtos
    console.log(data)

      return (
        <div className={`m-10 my-10`}>
            
            <div className={`my-10 mb-16 ml-0 md:ml-[13px]  px-0 flex justify-center md:justify-start`}>
              <ModalBicicleta
                action="create"
                data={data}
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