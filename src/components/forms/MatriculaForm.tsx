import React, { useState, useEffect } from 'react';
import { Matricula, Aluno, Disciplina } from '../../types';

interface MatriculaFormProps {
    initialData?: Matricula;
    onSubmit: (matricula: Matricula) => void;
    alunos: Aluno[];//lista de Alunos para popular a seleção
    disciplinas: Disciplina[];//lista de Disciplinas para popular a seleção
}

function MatriculaForm({ initialData, onSubmit, alunos, disciplinas }: MatriculaFormProps) {
    const [formData, setFormData] = useState<Matricula>(initialData || {} as Matricula);

    useEffect(() => {
        setFormData(initialData || {} as Matricula);
    }, [initialData]);

    const manageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const manageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const matriculaToSubmit: Matricula = {
            ...formData,
            alunoId: Number(formData.alunoId),
            disciplinaId: Number(formData.disciplinaId),
            notaFinal: formData.notaFinal ? Number(formData.notaFinal) : undefined,
        };
        onSubmit(matriculaToSubmit);
        setFormData({} as Matricula);
    };

    return (
        <form onSubmit={manageSubmit}>
            <div>
                <label htmlFor="alunoId">Aluno:</label>
                <select
                    id="alunoId"
                    name="alunoId"
                    value={formData.alunoId || ''}
                    onChange={manageChange}
                    required
                >
                    <option value="">Selecione...</option>
                    {alunos.map(aluno => (
                        <option key={aluno.id} value={aluno.id}>
                            {aluno.nome} ({aluno.matricula})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="disciplinaId">Disciplina:</label>
                <select
                    id="disciplinaId"
                    name="disciplinaId"
                    value={formData.disciplinaId || ''}
                    onChange={manageChange}
                    required
                >
                    <option value="">Selecione...</option>
                    {disciplinas.map(disciplina => (
                        <option key={disciplina.id} value={disciplina.id}>
                            {disciplina.nome} ({disciplina.codigo})
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="periodo">Período:</label>
                <input
                    type="text"
                    id="periodo"
                    name="periodo"
                    value={formData.periodo || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="notaFinal">Nota Final:</label>
                <input
                    type="number"
                    id="notaFinal"
                    name="notaFinal"
                    value={formData.notaFinal || ''}
                    onChange={manageChange}
                />
            </div>
            <button type="submit">{initialData && initialData.id ? 'Atualizar Matrícula' : 'Criar Matrícula'}</button>
        </form>
    );
}

export default MatriculaForm;