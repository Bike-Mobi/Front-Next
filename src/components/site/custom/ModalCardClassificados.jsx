import React from "react";

const ModalCardClassificados = (props) => {
    return(
        <div className="modal-container">
            <label htmlFor={`my-modal-${props.id}`}  className='btn btn-primary text-white btn-sm xl:btn-sm'>Detalhes</label>
            <input type="checkbox" id={`my-modal-${props.id}`} className="modal-toggle" />
            <label htmlFor={`my-modal-${props.id}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative" htmlFor="">
                    <label htmlFor={`my-modal-${props.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col justify-center items-center overflow-auto">
                        <h3 className="text-3xl flex justify-center font-bold text-tomEscuro mb-6 break-all">{props.title}</h3>
                        <img src={props.photo} alt="Foto da mercadoria" className=' rounded-2xl object-cover'/>
                        <span></span>
                        <span className='font-normal text-cinza text-base break-all overflow-hidden my-10'>{props.description}</span>
                        <span className='text-base break-all font-bold text-tomEscuro'>Valor: {props.price}</span>
                    </div>
                </label>
            </label>
            <style jsx>{ `
                ::-webkit-scrollbar-track {
                    background: transparent;
                }
                ::-webkit-scrollbar {
                    width: 6px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #dad7d7;
                    border-radius: 0px 10px 10px 0px;
                }`
            }</style>
        </div>
)}


export default ModalCardClassificados