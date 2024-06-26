'use client'

import React, { useState, useEffect, useContext } from 'react';
import { ApiContext } from '@/contexts/Api';
import { saveAs } from 'file-saver'; // Para salvar arquivos localmente
import XLSX from 'xlsx'; // Para manipular arquivos Excel
import jsPDF from 'jspdf'; // Para manipular PDFs
import 'jspdf-autotable'; // Plugin do jsPDF para gerar tabelas

const TableComponent = ({route, fields, cols, loading, setLoading}) => {
    const { instance } = useContext(ApiContext)

    const [data, setData] = useState()
    const [searchName, setSearchName] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    const query = async (currentPage, searchName) => {
        await instance.get(`${route}?page=${currentPage}&name=${searchName}`)
        .then(response => {
            setData(response.data.data);
            console.log('table',response)
            setLoading(0)
        })
        .catch(error => console.error(error));
    }

    useEffect(() => {
        query(currentPage, searchName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, loading]);

    // Função para exportar para Excel
    const exportToExcel = () => {
        // Criar uma planilha a partir dos dados
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        
        // Gerar um buffer de arquivo Excel
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        
        // Criar um Blob a partir do buffer e salvar o arquivo
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(dataBlob, 'tabela.xlsx');
    };

    // Função para exportar para PDF
    const exportToPDF = () => {
        const doc = new jsPDF();
        
        // Adicionar título ao PDF
        doc.text('Tabela de Dados', 20, 10);
        
        // Gerar tabela no PDF

        const populatedFields = []
        fields.map(i => i.indexes?.length > 0 ? populatedFields.push(i.indexes?.[1]) : null)
        console.log(populatedFields)

        console.log(data.map(item => populatedFields.map(i => item['user'][i])))

        doc.autoTable({
        head: [populatedFields],
        body: data.map(item => populatedFields.map(i => item['user'][i])),
        startY: 20,
        });
        
        // Salvar o PDF
        doc.save('tabela.pdf');
    };


    return (
        <div className='p-10'>
            <div className="join">
                <div>
                    <div>
                        <input className="input input-bordered join-item" placeholder="Pesquisar"  onChange={(e) => setSearchName(e.target.value)}/>
                    </div>
                </div>

                <div className="indicator">
                    <button className="btn join-item" onClick={() => query(currentPage, searchName)}>Pesquisar</button>
                </div>

                <div className='ml-auto w-full'>
                    <button className='btn mx-2' onClick={exportToExcel}>Exportar para Excel</button>
                    <button className='btn mx-2' onClick={exportToPDF}>Exportar para PDF</button>
                </div>
            </div>
            <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th></th>
                        {cols.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index )=> (
                        <tr key={index}>
                            <th>{item.id}</th>
                            {fields?.map((ind, i) => (
                                <td key={i}>
                                    {ind.component ? (
                                        <div>{<ind.component item={item}/>}</div>
                                    ) : 
                                        typeof ind.indexes == 'object' ? (
                                            <div>{item[ind.indexes[0]][ind.indexes[1]]}</div>
                                        ) : (
                                            <div>{item[ind.indexes]}</div>
                                        )
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>

            {!data ? (
                <div className='flex justify-center my-20'>
                    <div className="loading loading-spinner loading-lg text-primary mx-auto"></div>
                </div>
            ) : null}

            <div className="join grid grid-cols-2 my-10 w-64 mx-auto">
                <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous page</button>
                <button className="join-item btn btn-outline" onClick={() => setCurrentPage(currentPage + 1)} disabled={data?.length < 50}>Next</button>
            </div>
        </div>
    );
}

export default TableComponent