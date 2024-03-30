import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './UserForm.css';

function UserForm() {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sexo, setSexo] = useState('Masculino');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [cargo, setCargo] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Aluno');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      nome,
      idade,
      sexo,
      email,
      user,
      password,
      cargo,
      tipoUsuario,
    };

    try {
      const response = await fetch('http://localhost:3333/api/usuario/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      const data = await response.json();
      console.log('Usuário criado com sucesso:', data);
      
      // Mostra o Snackbar com a mensagem de sucesso
      setSnackbarMessage('Usuário criado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Limpa os campos do formulário após a criação bem-sucedida do usuário
      setNome('');
      setIdade('');
      setSexo('Masculino');
      setEmail('');
      setUser('');
      setPassword('');
      setCargo('');
      setTipoUsuario('Aluno');

    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      setSnackbarMessage('Erro ao criar usuário: ' + error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-field">
            <label>
              Nome:
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </label>
          </div>
          <div className="form-field">
            <label>
              Idade:
              <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required />
            </label>
          </div>
          <div className="form-field">
            <label>
              Sexo:
              <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
          </div>
          <div className="form-field">
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
          </div>
          <div className="form-field">
            <label>
              Username:
              <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
            </label>
          </div>
          <div className="form-field">
            <label>
              Senha:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
          </div>
          <div className="form-field">
            <label>
              Cargo:
              <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
            </label>
          </div>
          <div className="form-field">
            <label>
              Tipo de Usuário:
              <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} required>
                <option value="Administrador">Administrador</option>
                <option value="Aluno">Aluno</option>
                <option value="Professor">Professor</option>
              </select>
            </label>
          </div>
          <button type="submit" className="button2">Criar Usuário</button>
        </form>
      </header>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserForm;
