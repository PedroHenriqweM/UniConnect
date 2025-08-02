import { Disciplina } from '../../types';

interface DisciplinasTableProps {
    data: Disciplina[];
    onEdit: (disciplina: Disciplina) => void;
    onDelete: (id: number) => void;
}

function DisciplinasTable({ data, onEdit, onDelete }: DisciplinasTableProps) {
    return (
        <table className="generic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Código</th>
                    <th>Carga Horária</th>
                    <th>ID Curso</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(disciplina => (
                    <tr key={disciplina.id}>
                        <td>{disciplina.id}</td>
                        <td>{disciplina.nome}</td>
                        <td>{disciplina.codigo}</td>
                        <td>{disciplina.cargaHoraria}</td>
                        <td>{disciplina.cursoId}</td>
                        <td>
                            <button onClick={() => onEdit(disciplina)} className="edit-button">Editar</button>
                            <button onClick={() => onDelete(disciplina.id)} className="delete-button">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default DisciplinasTable;