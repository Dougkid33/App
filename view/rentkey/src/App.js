import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserForm from './components/UserForm';
import KeysGrid from './components/KeysGrid';
import LoginPage from './components/UserLogin';
import { Paper } from '@mui/material';
// Componente da Homepage
function HomePage() {
  return (
    <div className="App" component={Paper}>
      <header >  
        
        <div className="App">
          
          <h1 className='title'>RentKey</h1>
          <h2>Controle de chaves</h2>
        </div>
        <div>

  </div>

      </header>

      <body>
        <section className="App-header">
          <div className="App-header" component={Paper}>
            <KeysGrid />
          </div>
        </section>

        <section>
          <div className="container">
            <Link to="/UserForm" className="button2">Cadastro Usuário</Link>
            <Link to="/login" className="button2">Login Usuário</Link>
          </div>
        </section>

      </body>
    </div>
  );
}

// App Component
function App() {
  const handleLogin = async (username, password) => {
    const loginEndpoint = 'http://localhost:3333/api/usuario/login';

    try {
      const response = await fetch(loginEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: username,
          senha: password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro no login: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Aqui você pode fazer algo com os dados recebidos,
      // como salvar o token de autenticação.
    } catch (error) {
      console.error('Falha no login:', error.message);
      // Aqui você pode tratar o erro, como mostrar uma mensagem ao usuário.
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/UserForm" element={<UserForm />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} /> {/* Rota para a página de login adicionada */}
      </Routes>
    </Router>
  );
}

export default App;