import React from 'react'

const LoginButton = (props) => {

    if (props.isLoading) {
        return (
            <button disabled className={`w-full bg-azul font-bold text-white rounded-lg px-4 py-3 mt-10 md:mt-6 flex justify-center gap-10`}>
                <div>Login</div>
                <div className="inline-block h-5 w-5 mt-[2px] animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            </button>
        )
    } else {
        return (
            <button onClick={props.onClick} className={`w-full bg-azul font-bold text-white rounded-lg px-4 py-3 mt-10 md:mt-6 flex justify-center gap-10`}>
                <div>Login</div>
            </button>
        )
    }

}

export default LoginButton