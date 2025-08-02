import { Aluno } from '../../types';

interface AlunosTableProps {
    data: Aluno[];
    onEdit: (aluno: Aluno) => void;
    onDelete: (id: number) => void;
}

function AlunosTable({ data, onEdit, onDelete }: AlunosTableProps) {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Matrícula</th>
                    <th>Curso ID</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(aluno => (
                    <tr key={aluno.id}>
                        <td>{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.email}</td>
                        <td>{aluno.matricula}</td>
                        <td>{aluno.cursoId}</td>
                        <td>
                            <button onClick={() => onEdit(aluno)}>Editar</button>
                            <button onClick={() => onDelete(aluno.id)}>Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AlunosTable;