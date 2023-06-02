import ManutencoesScreen from '@/components/sistema/screens/ManutencoesScreen'
import React from 'react'

const teste = [
  {
    id: '1',
    user: 'Usuário 1',
    value: '100.00',
    description: 'LLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    type: 'não',
    date: '2023-06-06'
  },
  {
    id: '2',
    user: 'Usuário 2',
    value: '190.00',
    description: 'ssssss',
    type: 'sim',
    date: '2023-06-10'
  },
  {
    id: '3',
    user: 'pedro',
    value: '190.00',
    description: 'ssssss',
    type: 'sim',
    date: '2023-06-10'
  },
  {
    id: '4',
    user: 'carlos',
    value: '190.00',
    description: 'ssssss',
    type: 'sim',
    date: '2023-06-10'
  },
  {
    id: '5',
    user: 'pedro',
    value: '190.00',
    description: 'ssssss',
    type: 'sim',
    date: '2023-06-06'
  },
  {
    id: '6',
    user: 'pedro',
    value: '190.00',
    description: 'ssssss',
    type: 'sim',
    date: '2023-06-06'
  },
  {
    id: '7',
    user: 'pedro',
    value: '190.00',
    description: 'ssssss',
    type: 'sim',
    date: '2023-06-06'
  },
]

const page = () => {
  return (
    <div className=''>
        <ManutencoesScreen manutencoes={teste}/>
    </div>
  )
}

export default page
