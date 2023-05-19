'use client'

import React, { useEffect, useState } from 'react'

const FileInput = (props) => {

    const [file, setFile] = useState()
    const [dataFile, setDataFile] = useState()

    useEffect(() => {
        console.log(file)
        // props.onChange(dataFile)
    }, [dataFile])

    const getFile = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]))
        let formData = new FormData()
        formData.append('cover', e.target.files[0]) //!!!!!
        console.log(file)
        setDataFile(formData)
        props.onChange(dataFile)
        console.log('dataFile: ', dataFile)
    }

    let bg

    if (file || props.defaultValue) {
        bg = (
            <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg mx-auto text-center bg-white border-2 border-cinza border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                <img src={props.defaultValue ? props.defaultValue : file} alt="" className=' object-cover rounded-xl'/>
                <input id="dropzone-file" onChange={getFile} type="file" className="hidden" />
            </label>
        )
    } else {
        bg = (
            <label htmlFor="dropzone-file" className="flex flex-col items-center w-full max-w-lg p-5 mx-auto text-center bg-white border-2 border-cinza border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-cinza dark:text-gray-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>

                <h2 className="mt-1 font-medium tracking-wide text-cinza dark:text-gray-200">{props.text}</h2>

                <p className="mt-2 text-xs tracking-wide text-tomEscuro dark:text-gray-400">{props.description}</p>

                <input id="dropzone-file" onChange={getFile} type="file" className="hidden" />
            </label>
        )
    }

    return (
        <div>
            <label className="label">
                <span className={`label-text font-medium`}>{props.name}</span>
            </label>
            {bg}
        </div>
    )
}

export default FileInput