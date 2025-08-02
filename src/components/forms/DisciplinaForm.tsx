import React, { useState, useEffect } from 'react';
import { Disciplina, Curso } from '../../types';

interface DisciplinaFormProps {
    initialData?: Disciplina;
    onSubmit: (disciplina: Disciplina) => void;
    cursos: Curso[];//lista de cursos que vai popular a seleção
}

function DisciplinaForm({ initialData, onSubmit, cursos }: DisciplinaFormProps) {
    const [formData, setFormData] = useState<Disciplina>(initialData || {} as Disciplina);

    useEffect(() => {
        setFormData(initialData || {} as Disciplina);
    }, [initialData]);

    const manageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const manageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const disciplinaToSubmit: Disciplina = {
            ...formData,
            cargaHoraria: Number(formData.cargaHoraria),
            cursoId: Number(formData.cursoId),
        };
        onSubmit(disciplinaToSubmit);
        setFormData({} as Disciplina);
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
                <label htmlFor="codigo">Código:</label>
                <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    value={formData.codigo || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="cargaHoraria">Carga Horária:</label>
                <input
                    type="number"
                    id="cargaHoraria"
                    name="cargaHoraria"
                    value={formData.cargaHoraria || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="cursoId">Curso:</label>
                <select
                    id="cursoId"
                    name="cursoId"
                    value={formData.cursoId || ''}
                    onChange={manageChange}
                    required
                >
                    <option value="">Selecione...</option>
                    {cursos.map(curso => (
                        <option key={curso.id} value={curso.id}>
                            {curso.nome}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">{initialData && initialData.id ? 'Atualizar Disciplina' : 'Criar Disciplina'}</button>
        </form>
    );
}

export default DisciplinaForm;