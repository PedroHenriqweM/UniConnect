export interface Aluno {
  id: number;
  nome: string;
  email: string;
  dataNascimento: string; // ou Date
  matricula: string;
  cursoId: number;
}

export interface Matricula {
  id: number;
  alunoId: number;
  disciplinaId: number;
  periodo: string; 
  notaFinal?: number;
}

export interface Disciplina {
  id: number;
  nome: string;
  codigo: string; 
  cargaHoraria: number;
  cursoId: number;
}

export interface Curso {
  id: number;
  nome: string; 
  descricao: string;
  duracaoSemestres: number;
  modalidade: string;
}