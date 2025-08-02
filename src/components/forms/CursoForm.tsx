import React, { useState, useEffect } from 'react';
import { Curso } from '../../types';

interface CursoFormProps {
    initialData?: Curso;
    onSubmit: (curso: Curso) => void;
}

function CursoForm({ initialData, onSubmit }: CursoFormProps) {
    const [formData, setFormData] = useState<Curso>(initialData || {} as Curso);

    useEffect(() => {
        setFormData(initialData || {} as Curso);
    }, [initialData]);

    const manageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const manageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Converte para número antes de submeter
        const cursoToSubmit: Curso = {
            ...formData,
            duracaoSemestres: Number(formData.duracaoSemestres),
        };
        onSubmit(cursoToSubmit);
        setFormData({} as Curso);
    };

    return (
        <form onSubmit={manageSubmit}>
            <div>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="descricao">Descrição:</label>
                <input
                    type="text"
                    id="descricao"
                    name="descricao"
                    value={formData.descricao || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="duracaoSemestres">Duração (Semestres):</label>
                <input
                    type="number"
                    id="duracaoSemestres"
                    name="duracaoSemestres"
                    value={formData.duracaoSemestres || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="modalidade">Modalidade:</label>
                <select
                    name="modalidade"
                    id="modalidade"
                    value={formData.modalidade || ''}
                    onChange={manageChange}
                >
                    <option value="" disabled selected>
                        Selecione uma Modalidade
                    </option>
                    <option value={"Presencial"}>Presencial</option>
                    <option value={"Online"}>Online</option>
                    <option value={"Hibrido"}>Hibrido</option>

                </select>

            </div>
            <button type="submit">{initialData && initialData.id ? 'Atualizar Curso' : 'Criar Curso'}</button>
        </form>
    );
}

export default CursoForm;