import { Curso } from '../../types';

interface CursosTableProps {
    data: Curso[];
    onEdit: (curso: Curso) => void;
    onDelete: (id: number) => void;
}

function CursosTable({ data, onEdit, onDelete }: CursosTableProps) {
    return (
        <table className="generic-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Duração (Semestres)</th>
                    <th>Modalidade</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.map(curso => (
                    <tr key={curso.id}>
                        <td>{curso.id}</td>
                        <td>{curso.nome}</td>
                        <td>{curso.descricao}</td>
                        <td>{curso.duracaoSemestres}</td>
                        <td>{curso.modalidade}</td>
                        <td>
                            <button onClick={() => onEdit(curso)} className="edit-button">Editar</button>
                            <button onClick={() => onDelete(curso.id)} className="delete-button">Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default CursosTable;