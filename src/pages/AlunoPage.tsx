import React, { useState, useEffect } from 'react';
import { Aluno, Curso } from '../types';
import AlunoForm from '../components/forms/AlunoForm';
import AlunoTable from '../components/tables/AlunoTable';
import { defaultCursos, defaultAlunos } from '../components/InicialValue'

function AlunosPage() {
    const [alunos, setAlunos] = useState<Aluno[]>(() => {
        const savedAlunos = localStorage.getItem('alunos');
        return savedAlunos ? JSON.parse(savedAlunos) : defaultAlunos;
    });

    const [cursos] = useState<Curso[]>(() => {
        const savedCursos = localStorage.getItem('cursos');
        return savedCursos ? JSON.parse(savedCursos) : defaultCursos;
    });

    const [editingAluno, setEditingAluno] = useState<Aluno | undefined>(undefined);
   
    useEffect(() => {
        localStorage.setItem('alunos', JSON.stringify(alunos));
    }, [alunos]);
    
    useEffect(() => {
        localStorage.setItem('cursos', JSON.stringify(cursos));
    }, [cursos]);

    const createOrUpdateAluno = (aluno: Aluno) => {
        if (aluno.id) {
            // Update
            setAlunos(prevAlunos =>
                prevAlunos.map(a => (a.id === aluno.id ? { ...aluno, cursoId: Number(aluno.cursoId) } : a))
            );
        } else {
            // Crate
            const newId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
            setAlunos(prevAlunos => [...prevAlunos, { ...aluno, id: newId, cursoId: Number(aluno.cursoId) }]);
        }
        setEditingAluno(undefined);  
    };

    const deleteAluno = (id: number) => {
        if (window.confirm("Tem certeza que deseja excluir este aluno?")) {
            setAlunos(prevAlunos => prevAlunos.filter(aluno => aluno.id !== id));
        }
    };

    const editAluno = (aluno: Aluno) => {
        setEditingAluno(aluno);
    };

    return (
        <div className="container">
            <h1>Gerenciamento de Alunos</h1>

            <div className="form-section">
                <h2>{editingAluno ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</h2>
                <AlunoForm
                    initialData={editingAluno}
                    onSubmit={createOrUpdateAluno}
                    cursos={cursos}
                />
                {editingAluno && <button onClick={() => setEditingAluno(undefined)}>Cancelar Edição</button>}
            </div>

            <div className="table-section">
                <h2>Lista de Alunos</h2>
                <AlunoTable
                    data={alunos}
                    onEdit={editAluno}
                    onDelete={deleteAluno}
                />
            </div>
        </div>
    );
}

export default AlunosPage;