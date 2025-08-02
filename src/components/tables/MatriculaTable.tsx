import { Matricula } from '../../types';

interface MatriculasTableProps {
    data: Matricula[];
    onEdit: (matricula: Matricula) => void;
    onDelete: (id: number) => void;
}

function MatriculasTable({ data, onEdit, onDelete }: MatriculasTableProps) {
    return (
        <table className="generic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>ID Aluno</th>
                    <th>ID Disciplina</th>
                    <th>Período</th>
                    <th>Nota Final</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(matricula => (
                    <tr key={matricula.id}>
                        <td>{matricula.id}</td>
                        <td>{matricula.alunoId}</td>
                        <td>{matricula.disciplinaId}</td>
                        <td>{matricula.periodo}</td>
                        <td>{matricula.notaFinal !== undefined ? matricula.notaFinal : 'N/A'}</td>
                        <td>
                            <button onClick={() => onEdit(matricula)} className="edit-button">Editar</button>
                            <button onClick={() => onDelete(matricula.id)} className="delete-button">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default MatriculasTable;