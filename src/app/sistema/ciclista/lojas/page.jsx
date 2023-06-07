import LojasScreen from '@/components/sistema/screens/LojasScreen'
import React from 'react'

const page = () => {

  const lojas = [
      {
        id: 1,
        name: "Ruan Az2",
        photo: "https://source.unsplash.com/random/300x300",
        email: "lojista@adapti.info",
        cnpj: "99999999999999",
        cpf: "21339780119",
        rg: "047894938",
        birthday: "1972-01-16T00:00:00.000000Z",
        phone: "(96) 94045-7063",
        telephone: "(96) 53835-12834",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam ni Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam ni Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam ni Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam ni",
        is_admin: false,
        type: "Shopkeeper",
        email_verified_at: "2023-05-03T18:23:58.000000Z",
        created_at: "2023-05-03 18:23:58",
        updated_at: "2023-05-03 18:23:58",
        services: {
            maintenance: true,
            bikeSale: true,
            hosting: true,
            partsSale: true,
            food: true,
            events: true,
            transport: true,
            accessories: true,
            guide: true
        },
        address: {
            id: 1,
            users_id: 1,
            street: "Travessa Aragão",
            number: "8833",
            neighborhood: "do Leste",
            city: "Santiago do Leste",
            state: "Pará",
            complement: null,
            cep: "15959-175",
            created_at: "2023-05-03 18:23:58",
            updated_at: "2023-05-03 18:23:58"
        }
      },
      {
        id: 2,
        name: "pedro",
        email: "lojista@adapti.info",
        cnpj: "99999999999999",
        cpf: "21339780119",
        rg: "047894938",
        birthday: "1972-01-16T00:00:00.000000Z",
        phone: "(96) 94045-7063",
        telephone: "(96) 53835-12834",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, eget aliquam ni",
        is_admin: false,
        type: "Shopkeeper",
        email_verified_at: "2023-05-03T18:23:58.000000Z",
        created_at: "2023-05-03 18:23:58",
        updated_at: "2023-05-03 18:23:58",
        services: {
            maintenance: true,
            bikeSale: true,
            hosting: false,
            partsSale: true,
            food: false,
            events: false,
            transport: false,
            accessories: true,
            guide: false
        },
        address: {
            id: 1,
            users_id: 1,
            street: "Travessa Aragão",
            number: "8833",
            neighborhood: "do Leste",
            city: "Santiago do Leste",
            state: "Pará",
            complement: null,
            cep: "15959-175",
            created_at: "2023-05-03 18:23:58",
            updated_at: "2023-05-03 18:23:58"
        }
      },
  ]

  return (
    <LojasScreen lojas={lojas}/>
  )
}

export default page