import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import KeysGrid from './components/KeysGrid';

// Componente da Homepage
function HomePage() {
  return (
    <div className="App">
      <header className="App-header">

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>

        <KeysGrid />
        <Link to="/UserForm" className="button2">Acessar Formulário de Usuário</Link>
       
      </header>
    </div>
  );
}

// App Component
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/UserForm" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;