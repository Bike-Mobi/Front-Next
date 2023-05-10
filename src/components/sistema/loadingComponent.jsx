import Image from 'next/image'
import React from 'react'

const LoadingComponent = () => {
    return (
        <div className='h-full py-40 grid justify-center'>
            <div className="inline-block h-20 w-20 mt-[2px] animate-spin rounded-full border-4 border-solid border-azul border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        </div>
    )
}

export default LoadingComponent