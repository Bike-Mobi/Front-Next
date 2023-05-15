import ClassificadosScreen from '@/components/sistema/screens/ClassificadosScreen'
import React from 'react'

const meusanuncios = () => {
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
    }
]

return (
    <div className='pt-0'>
        <ClassificadosScreen produtos={ produtos } />
    </div>
)
}

export default meusanuncios