import React, { useState, useEffect } from 'react';
import { Disciplina, Curso, Matricula } from '../types'; 
import DisciplinaForm from '../components/forms/DisciplinaForm';
import DisciplinaTable from '../components/tables/DisciplinaTable';
import { defaultCursos, defaultDisciplinas, defaultMatriculas } from '../components/InicialValue'


function DisciplinasPage() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(() => {
    const savedDisciplinas = localStorage.getItem('disciplinas');
    return savedDisciplinas ? JSON.parse(savedDisciplinas) : defaultDisciplinas;
  });

  const [cursos] = useState<Curso[]>(() => {
    const savedCursos = localStorage.getItem('cursos');
    return savedCursos ? JSON.parse(savedCursos) : defaultCursos;
  });

  const [matriculas, setMatriculas] = useState<Matricula[]>(() => {
    const savedMatriculas = localStorage.getItem('matriculas');
    return savedMatriculas ? JSON.parse(savedMatriculas) : defaultMatriculas;
  });

  const [editingDisciplina, setEditingDisciplina] = useState<Disciplina | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
  }, [disciplinas]);

  useEffect(() => {
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }, [matriculas]);

  const createOrUpdateDisciplina = (disciplina: Disciplina) => {
      const disciplinaToSave = {
        ...disciplina,
        cursoId: Number(disciplina.cursoId),
        cargaHoraria: Number(disciplina.cargaHoraria)
      };

      if (disciplinaToSave.id) {
        setDisciplinas(prevDisciplinas =>
          prevDisciplinas.map(d => (d.id === disciplinaToSave.id ? disciplinaToSave : d))
        );
      } else {
        const newId = disciplinas.length > 0 ? Math.max(...disciplinas.map(d => d.id)) + 1 : 1;
        setDisciplinas(prevDisciplinas => [...prevDisciplinas, { ...disciplinaToSave, id: newId }]);
      }
      setEditingDisciplina(undefined);

  };

  const deleteDisciplina = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta disciplina?Matriculas nessa Disciplina serão Apagadas")) {
      
        setMatriculas(prevMatriculas => prevMatriculas.filter(m => m.disciplinaId !== id));

        setDisciplinas(prevDisciplinas => prevDisciplinas.filter(disciplina => disciplina.id !== id));

    }
  };

  const editDisciplina = (disciplina: Disciplina) => {
    setEditingDisciplina(disciplina);
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Disciplinas</h1>

      <div className="form-section">
        <h2>{editingDisciplina ? 'Editar Disciplina' : 'Adicionar Nova Disciplina'}</h2>
        <DisciplinaForm
          initialData={editingDisciplina}
          onSubmit={createOrUpdateDisciplina}
          cursos={cursos}
        />
        {editingDisciplina && <button onClick={() => setEditingDisciplina(undefined)}>Cancelar Edição</button>}
      </div>

      <div className="table-section">
        <h2>Lista de Disciplinas</h2>
        <DisciplinaTable
          data={disciplinas}
          onEdit={editDisciplina}
          onDelete={deleteDisciplina}
        />
      </div>
    </div>
  );
}

export default DisciplinasPage;