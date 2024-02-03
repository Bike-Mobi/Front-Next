import React from "react";

const ModalCardClassificados = (props) => {

    function redirecionaWhats(telefone) {
        // Remover caracteres não numéricos
        const numero = telefone.replace(/\D/g, '');
        const linkWhatsApp = `https://wa.me/55${numero}`;

        // Redirecionar para o link
        window.location.href = linkWhatsApp;
    }

    return(
        <div className="modal-container">
            <label htmlFor={`my-modal-${props.data.id}`}  className='btn btn-primary text-white btn-sm xl:btn-sm'>Detalhes</label>
            <input type="checkbox" id={`my-modal-${props.data.id}`} className="modal-toggle" />
            <label htmlFor={`my-modal-${props.data.id}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative" htmlFor="">
                    <label htmlFor={`my-modal-${props.data.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col justify-center items-center overflow-auto">
                        <h3 className="text-3xl flex justify-center font-bold text-tomEscuro mb-6 break-all">{props.data.name}</h3>
                        <img src={`${process.env.NEXT_PUBLIC_API}/classificadoFoto/${props.data.photo}`} alt="Foto da mercadoria" className=' rounded-2xl object-cover'/>
                        <span className='font-normal text-cinza text-base break-all overflow-hidden my-10'>{props.data.description}</span>
                        <div className="flex justify-between w-full">
                            <div className='text-base break-all font-bold text-tomEscuro'>Valor: R$ {props.data.price}</div>
                            <button onClick={() => redirecionaWhats(props.data.contact)} className="btn btn-secondary">Enviar mensagem</button>
                        </div>
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