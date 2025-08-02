import React, { useState, useEffect } from 'react';
import { Matricula, Aluno, Disciplina, } from '../types';
import MatriculaForm from '../components/forms/MatriculaForm';
import MatriculaTable from '../components/tables/MatriculaTable';
import { defaultMatriculas, defaultDisciplinas, defaultAlunos } from '../components/InicialValue'

function MatriculasPage() {
  const [matriculas, setMatriculas] = useState<Matricula[]>(() => {
    const savedMatriculas = localStorage.getItem('matriculas');
    return savedMatriculas ? JSON.parse(savedMatriculas) : defaultMatriculas;
  });

  const [alunos] = useState<Aluno[]>(() => {
    const savedAlunos = localStorage.getItem('alunos');
    return savedAlunos ? JSON.parse(savedAlunos) : defaultAlunos;
  });
  const [disciplinas] = useState<Disciplina[]>(() => {
    const savedDisciplinas = localStorage.getItem('disciplinas');
    return savedDisciplinas ? JSON.parse(savedDisciplinas) : defaultDisciplinas;
  });

  const [editingMatricula, setEditingMatricula] = useState<Matricula | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }, [matriculas]);

  const createOrUpdateMatricula = (matricula: Matricula) => {

    const matriculaToSave = {
      ...matricula,
      alunoId: Number(matricula.alunoId),
      disciplinaId: Number(matricula.disciplinaId),
      notaFinal: matricula.notaFinal ? Number(matricula.notaFinal) : undefined
    };

    if (matriculaToSave.id) {
      setMatriculas(prevMatriculas =>
        prevMatriculas.map(m => (m.id === matriculaToSave.id ? matriculaToSave : m))
      );
    } else {
      const newId = matriculas.length > 0 ? Math.max(...matriculas.map(m => m.id)) + 1 : 1;
      setMatriculas(prevMatriculas => [...prevMatriculas, { ...matriculaToSave, id: newId }]);
    }
    setEditingMatricula(undefined);

  };

  const deleteMatricula = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta matrícula?")) {
      setMatriculas(prevMatriculas => prevMatriculas.filter(matricula => matricula.id !== id));
    }
  };

  const editMatricula = (matricula: Matricula) => {
    setEditingMatricula(matricula);
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Matrículas</h1>

      <div className="form-section">
        <h2>{editingMatricula ? 'Editar Matrícula' : 'Adicionar Nova Matrícula'}</h2>
        <MatriculaForm
          initialData={editingMatricula}
          onSubmit={createOrUpdateMatricula}
          alunos={alunos}
          disciplinas={disciplinas}
        />
        {editingMatricula && <button onClick={() => setEditingMatricula(undefined)}>Cancelar Edição</button>}
      </div>

      <div className="table-section">
        <h2>Lista de Matrículas</h2>
        <MatriculaTable
          data={matriculas}
          onEdit={editMatricula}
          onDelete={deleteMatricula}
        />
      </div>
    </div>
  );
}

export default MatriculasPage;