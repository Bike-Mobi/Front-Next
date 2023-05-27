'use client'
import CardBicicleta from '@/components/sistema/modals/CardBicicleta'
import ModalBicicleta from '@/components/sistema/modals/ModalBicicleta'
import { fakeApi } from "@/service/fakeApi";
import React, { useState } from "react";

const ManutencaoScreen = (props) => {

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
        <div className={`m-10 my-20`}>
            
            <div className={`my-20 ml-0 md:ml-[13px] py-2 px-0 flex justify-center md:justify-start`}>
              <ModalBicicleta
                action="create"
                data={data}
              />
            </div>
    
            <div className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-4 justify-items-center`}>
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

export default ManutencaoScreen