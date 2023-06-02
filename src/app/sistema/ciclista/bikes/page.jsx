
import BikesScreen from '@/components/sistema/screens/BikesScreen'
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
        photo: 'https://pplware.sapo.pt/wp-content/uploads/2022/04/Gogobest-GF600.jpg'
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
        photo: 'https://semexe.com/blog/wp-content/uploads/2022/03/Scalpel-personalizada-por-Black-tiger-74.jpg'
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
        photo: 'https://static3.tcdn.com.br/img/img_prod/196157/bicicleta_eletrica_brutatec_750w_48v_litio_pneu_fat_4183_25_20201214041332.jpg'
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
        <BikesScreen produtos={produtos}/>
  )
}

export default page