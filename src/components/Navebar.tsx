import { Link } from 'react-router-dom';
function Navebar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" >Home</Link>
                </li>
                <li>
                    <Link to="/alunos" >Alunos</Link>
                </li>
                <li>
                    <Link to="/matriculas" >Matrículas</Link>
                </li>
                <li>
                    <Link to="/disciplinas" >Disciplinas</Link>
                </li>
                <li>
                    <Link to="/cursos" >Cursos</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navebar