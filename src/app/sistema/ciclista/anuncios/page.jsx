import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import React from 'react'

const anuncios = () => {

    const produtos = [
        {
            id: 1,
            title: 'Bike Audax ADX 300',
            price: '8.299,00',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
            photo: 'https://semexe.com/blog/wp-content/uploads/2022/03/Scalpel-personalizada-por-Black-tiger-74.jpg'
        },
        {
            id: 2,
            title: 'Bike OGGI Hacker tamanho 17',
            price: '6.159,00',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
            photo: 'https://www.flashbike.com.br/site/carrega?_tp=img5&_img=008326001.jpg'
        },
        {
            id: 3,
            title: 'Bicicleta Eletrica Brutatec',
            price: '8.239,00',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
            photo: 'https://static3.tcdn.com.br/img/img_prod/196157/bicicleta_eletrica_brutatec_750w_48v_litio_pneu_fat_4183_25_20201214041332.jpg'
        },
        {
            id: 4,
            title: 'Rich Bit 2017',
            price: '9.159,00',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco colmer consequat aute irure sint amet.',
            photo: 'https://img.olhardigital.com.br/wp-content/uploads/2020/09/20200915035100-1024x651.jpg'
        }
    ]
    
    return (
        <div className='pt-0'>
            <ClassificadosScreen produtos={ produtos } />
        </div>
    )
}


export default anuncios