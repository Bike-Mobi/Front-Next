import { DocumentTextIcon } from "@heroicons/react/24/outline";
import React from "react";
import NumberInput from '../inputs/NumberInput';
import RadioInput from '../inputs/RadioInput';
import TextInput from '../inputs/TextInput';

const ModalDetalhesManutencao = (props) => {
    const data = props.data

    return(
        <div className="modal-container">
            <label htmlFor={`my-modal-${data.id}`}  className='cursor-pointer'><DocumentTextIcon className={`w-7 h-7 lg:w-8 lg:h-w-8 hover:opacity-60 p-1 mx-1 rounded-md bg-success`}/></label>
            <input type="checkbox" id={`my-modal-${data.id}`} className="modal-toggle" />
            <label htmlFor={`my-modal-${data.id}`} className="modal cursor-pointer">
                <label className="rounded-lg modal-box relative" htmlFor="">
                    <label htmlFor={`my-modal-${data.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div className="flex flex-col justify-center items-center overflow-auto text-neutral-900">
                            <TextInput name="Manutenção"
                                width={`w-full`}
                                defaultValue={data?.title}
                                disabled={true}
                                required
                            />
                            <NumberInput name="Valor MDO"
                                width={`w-full`}
                                defaultValue={data?.value}
                                disabled={true}
                                required
                            />
                            <TextInput name="Descrição"
                                width={`w-full`}
                                defaultValue={data?.description}
                                disabled={true}
                                required
                            />
                            {/* <RadioInput name="Buscar e entregar a bicicleta?"
                                items={[
                                    { name: 'sim'},
                                    { name: 'não'},
                                ]}
                                value={data?.type}
                                disabled={true}
                                required
                            /> */}
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
                }
                `
            }</style>
        </div>
)}


export default ModalDetalhesManutencao