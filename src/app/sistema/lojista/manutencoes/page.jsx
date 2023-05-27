
import ManutencaoScreen from '@/components/sistema/screens/ManutencaoScreen'
import React from "react";



const page = () => {


  const produtos = [
    {
        id: 1,
        title: 'Bike Audax ADX 300',
        serie: 'AB12345678',
        type: 'Urbana',
        name: 'Bicicleta de montanha',
        brand: 'Caloi',
        color: 'Vermelho',
        frontDerailleur: 'Shimano',
        rearDerailleur: 'Shimano',
        rearSuspensionType: 'Hardtail',
        wheelSize: '29',
        brakesType: 'Disco',
        frameType: 'Alumínio',
        frontTire: '29x2.10',
        rearTire: '29x2.10',
        Comments: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
        photo: 'https://www.flashbike.com.br/site/carrega?_tp=img5&_img=008326001.jpg'
      },
      {
        id: 2,
        title: 'Bike Audax ADX 300',
        serie: 'AB12345678',
        type: 'DownHill',
        name: 'Bicicleta de montanha',
        brand: 'Caloi',
        color: 'Vermelho',
        frontDerailleur: 'Shimano',
        rearDerailleur: 'Shimano',
        rearSuspensionType: 'Hardtail',
        wheelSize: '29',
        brakesType: 'Disco',
        frameType: 'Alumínio',
        frontTire: '29x2.10',
        rearTire: '29x2.10',
        Comments: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
        photo: 'https://www.flashbike.com.br/site/carrega?_tp=img5&_img=008326001.jpg'
      },
      {
        id: 3,
        title: 'Bike Audax ADX 300',
        serie: 'AB12345678',
        type: 'Speed',
        name: 'Bicicleta de montanha',
        brand: 'Caloi',
        color: 'Vermelho',
        frontDerailleur: 'Shimano',
        rearDerailleur: 'Shimano',
        rearSuspensionType: 'Hardtail',
        wheelSize: '29',
        brakesType: 'Disco',
        frameType: 'Alumínio',
        frontTire: '29x2.10',
        rearTire: '29x2.10',
        Comments: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
        photo: 'https://www.flashbike.com.br/site/carrega?_tp=img5&_img=008326001.jpg'
      },
      {
        id: 4,
        title: 'Bike Audax ADX 300',
        serie: 'AB12345678',
        type: 'MTB',
        name: 'Bicicleta de montanha',
        brand: 'Caloi2',
        color: 'Vermelho',
        frontDerailleur: 'Shimano',
        rearDerailleur: 'Shimano',
        rearSuspensionType: 'Hardtail',
        wheelSize: '29',
        brakesType: 'Disco',
        frameType: 'Alumínio',
        frontTire: '29x2.10',
        rearTire: '29x2.10',
        Comments: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmerenim ad minim veniam, quis nostrud exercitation ullamco colmerenim ad minim veniam, quis nostrud exercitation ullamco colmerenim ad minim veniam, quis nostrud exercitation ullamco colmerenim ad minim veniam, quis nostrud exercitation ullamco colmerenim ad minim veniam, quis nostrud exercitation ullamco colmerenim ad minim veniam, quis nostrud exercitation ullamco colmerenim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
        photo: ''
      },
]

  return (
        <ManutencaoScreen produtos={produtos}/>
  )
}

export default page