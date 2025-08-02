import React, { useState, useEffect } from 'react';
import { Curso, Disciplina, Aluno, Matricula } from '../types';
import CursoForm from '../components/forms/CursoForm';
import CursoTable from '../components/tables/CursoTable';
import { defaultCursos, defaultDisciplinas, defaultAlunos, defaultMatriculas } from '../components/InicialValue'


function CursosPage() {
  const [cursos, setCursos] = useState<Curso[]>(() => {
    const savedCursos = localStorage.getItem('cursos');
    return savedCursos ? JSON.parse(savedCursos) : defaultCursos;
  });

  const [disciplinas, setDisciplinas] = useState<Disciplina[]>(() => {
    const savedDisciplinas = localStorage.getItem('disciplinas');
    return savedDisciplinas ? JSON.parse(savedDisciplinas) : defaultDisciplinas;
  });

  const [alunos, setAlunos] = useState<Aluno[]>(() => {
    const savedAlunos = localStorage.getItem('alunos');
    return savedAlunos ? JSON.parse(savedAlunos) : defaultAlunos;
  });

  const [matriculas, setMatriculas] = useState<Matricula[]>(() => {
    const savedMatriculas = localStorage.getItem('matriculas');
    return savedMatriculas ? JSON.parse(savedMatriculas) : defaultMatriculas;
  });

  const [editingCurso, setEditingCurso] = useState<Curso | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('cursos', JSON.stringify(cursos));
  }, [cursos]);

  useEffect(() => {
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
  }, [disciplinas]);

  useEffect(() => {
    localStorage.setItem('alunos', JSON.stringify(alunos));
  }, [alunos]);

  useEffect(() => {
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
  }, [matriculas]);

  const createOrUpdateCurso = (curso: Curso) => {
    const cursoToSave = {
      ...curso,
      duracaoSemestres: Number(curso.duracaoSemestres)
    };

    if (cursoToSave.id) {
      setCursos(prevCursos =>
        prevCursos.map(c => (c.id === cursoToSave.id ? cursoToSave : c))
      );
    } else {
      const newId = cursos.length > 0 ? Math.max(...cursos.map(c => c.id)) + 1 : 1;
      setCursos(prevCursos => [...prevCursos, { ...cursoToSave, id: newId }]);
    }
    setEditingCurso(undefined);
  };

  const deleteCurso = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este curso? Disciplinas e  associados a ele também serão afetados.")) {

      // Passo 1: Encontra os IDs das disciplinas que serão removidas
      const disciplinasParaExcluir = disciplinas.filter(d => d.cursoId === id).map(d => d.id);

      setMatriculas(prevMatriculas =>
        prevMatriculas.filter(m => !disciplinasParaExcluir.includes(m.disciplinaId))
      );
      setDisciplinas(prevDisciplinas => prevDisciplinas.filter(d => d.cursoId !== id));
      
      setAlunos(prevAlunos => prevAlunos.map(a =>
        a.cursoId === id ? { ...a, cursoId: 0 } : a
      ));
      
      setCursos(prevCursos => prevCursos.filter(curso => curso.id !== id));
    }
  };

  const editCurso = (curso: Curso) => {
    setEditingCurso(curso);
  };

  return (
    <div className="container">
      <h1>Gerenciamento de Cursos</h1>

      <div className="form-section">
        <h2>{editingCurso ? 'Editar Curso' : 'Adicionar Novo Curso'}</h2>
        <CursoForm
          initialData={editingCurso}
          onSubmit={createOrUpdateCurso}
        />
        {editingCurso && <button onClick={() => setEditingCurso(undefined)}>Cancelar Edição</button>}
      </div>

      <div className="table-section">
        <h2>Lista de Cursos</h2>
        <CursoTable
          data={cursos}
          onEdit={editCurso}
          onDelete={deleteCurso}
        />
      </div>
    </div>
  );
}

export default CursosPage;