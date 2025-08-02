import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import AlunosPage from './pages/AlunoPage';
import MatriculasPage from './pages/MatriculaPage';
import DisciplinasPage from './pages/DisciplinaPage';
import CursosPage from './pages/CursoPage';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Navebar from './components/Navebar';


function App() {
  return (
    <Router>
      <div className="App">

        <Header />
        <Navebar />

        <div className="content">
          <Routes>
            <Route path="/alunos" element={<AlunosPage />} />
            <Route path="/matriculas" element={<MatriculasPage />} />
            <Route path="/disciplinas" element={<DisciplinasPage />} />
            <Route path="/cursos" element={<CursosPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>

        <Footer />

      </div>
    </Router>
  );
}

export default App;