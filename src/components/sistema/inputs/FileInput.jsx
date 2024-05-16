'use client'

import React, { useEffect, useState } from 'react'

const FileInput = (props) => {
    
    const [file, setFile] = useState()
    const [dataFile, setDataFile] = useState()
    
    const getFile = (setFile, file, onChange) => {
        setFile(URL.createObjectURL(event.target.files[0]))
        // let formData = new FormData()
        // formData.append('photo_1', event.target.files[0])
        console.log(file)
        // setDataFile(formData)
        onChange(event.target.files[0])
        // console.log('formData: ', formData)
    }
    // const [bikeData, setBikeData] = useState({
    //     nameBike: '',
    //     brand: '',
    //     // Outros campos da bicicleta
    //     photo_1: null,
    //     photo_2: null,
    //     photo_3: null
    //   });

    // useEffect(() => {
    //     console.log(file)
    //     // props.onChange(dataFile)
    // }, [dataFile])


    // const handleFileChange = (event) => {
    //     const { name, files } = event.target;
    //     setBikeData({ ...bikeData, [name]: files[0] });
    //     console.log(bikeData)
    // };

    let bg

    if (file || props.defaultValue) {
        bg = (
            <label htmlFor={props.name} className={`flex flex-col items-center max-w-lg ${props.size} mx-auto text-center bg-white border-2 border-cinza border-dashed cursor-pointer rounded-xl`}>
                <img src={file ? file : `${process.env.NEXT_PUBLIC_API}/${props.typeImgURL}/${props.defaultValue}`} alt="" className={`object-cover rounded-xl min-w-full min-h-full overflow-hidden ${props.className}`}/>
                <input id={props.name} onChange={() => getFile(setFile, file, props.onChange)} name='imagem' type="file" className="hidden" disabled={props.disabled}/>
            </label>
        )
    } else {
        bg = (
            <label htmlFor={props.name} className="flex flex-col items-center w-full max-w-lg p-5 mx-auto text-center bg-white border-2 border-cinza border-dashed cursor-pointer rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-cinza">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>

                <h2 className="mt-1 font-medium tracking-wide text-cinza">{props.text}</h2>

                <p className="mt-2 text-xs tracking-wide text-cinza">{props.description}</p>

                <input id={props.name} onChange={() => getFile(setFile, file, props.onChange)} name='imagem' type="file" className="hidden" disabled={props.disabled}/>
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