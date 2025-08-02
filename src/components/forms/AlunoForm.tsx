import React, { useState, useEffect } from 'react';
import { Aluno, Curso } from '../../types'; 

interface AlunoFormProps {
    initialData?: Aluno;
    onSubmit: (aluno: Aluno) => void;
    cursos: Curso[];//lista de cursos para popular a seleção
}

function AlunoForm({ initialData, onSubmit, cursos }: AlunoFormProps) {
    const [formData, setFormData] = useState<Aluno>(initialData || {} as Aluno);

    useEffect(() => {
        setFormData(initialData || {} as Aluno);
    }, [initialData]);

    const manageChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const manageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({} as Aluno);
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="dataNascimento">Data de Nascimento:</label>
                <input
                    type="date"
                    id="dataNascimento"
                    name="dataNascimento"
                    value={formData.dataNascimento || ''}
                    onChange={manageChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="matricula">Matrícula:</label>
                <input
                    type="text"
                    id="matricula"
                    name="matricula"
                    value={formData.matricula || ''}
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
            <button type="submit">{initialData && initialData.id ? 'Atualizar Aluno' : 'Criar Aluno'}</button>
        </form>
    );
}

export default AlunoForm;