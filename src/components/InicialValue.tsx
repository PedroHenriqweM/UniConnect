import { Curso, Disciplina, Aluno, Matricula } from '../types'; 

// Dados iniciais padrão 
export const defaultCursos: Curso[] = [
  { id: 1, nome: "Ciência da Computação", descricao: "Curso de bacharelado em computação.", duracaoSemestres: 8, modalidade: "Presencial" },
  { id: 2, nome: "Matemática Aplicada", descricao: "Curso de bacharelado em matemática.", duracaoSemestres: 7, modalidade: "Presencial" },
];
export const defaultDisciplinas: Disciplina[] = [ 
  { id: 1, nome: "Introdução à Programação", codigo: "INF101", cargaHoraria: 60, cursoId: 1 },
  { id: 2, nome: "Banco de Dados", codigo: "BD202", cargaHoraria: 80, cursoId: 1 },
  { id: 3, nome: "Cálculo I", codigo: "MAT101", cargaHoraria: 90, cursoId: 2 },
];
export const defaultAlunos: Aluno[] = [ 
  { id: 1, nome: "João da Silva", email: "joao@email.com", dataNascimento: "2000-01-15", matricula: "202012345", cursoId: 1 },
  { id: 2, nome: "Maria Souza", email: "maria@email.com", dataNascimento: "2001-03-20", matricula: "202167890", cursoId: 2 },
];
export const defaultMatriculas: Matricula[] = [
  { id: 1, alunoId: 1, disciplinaId: 1, periodo: "2025.1", notaFinal: 8.5 },
  { id: 2, alunoId: 2, disciplinaId: 3, periodo: "2025.1", notaFinal: 7.0 },
];

