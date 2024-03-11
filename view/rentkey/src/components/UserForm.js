import React, { useState } from 'react';
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

 const handleSubmit = async (event) => {
    event.preventDefault();

    // Aqui você pode fazer a chamada para o seu endpoint de API para criar o usuário
    // Por exemplo, usando fetch:
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
      const response = await fetch('http://localhost:3000/api/users', {
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
      // Limpar o formulário ou redirecionar o usuário conforme necessário
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
    }
 };

 return (
  <div className="App"> {/* Aplica o estilo geral do App */}
  <header className="App-header"> {/* Pode querer remover ou ajustar isso dependendo do layout desejado */}
    <form onSubmit={handleSubmit} className='form-container'>
      <div className='form-field'>
      <label>
        Nome:
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
      </label>
      </div>
      <div className='form-field'>
      <label>
        Idade:
        <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} required />
      </label>
      </div>
      <div className='form-field'>
      <label>
        Sexo:
        <select value={sexo} onChange={(e) => setSexo(e.target.value)} required>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>
      </label>
      </div>
      <div className='form-field'>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      </div>
      <div className='form-field'>
      <label>
        Username:
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)} required />
      </label>
      </div>
      <div className='form-field'>
      <label>
        Senha:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      </div>
      <div className='form-field'>
      <label>
        Cargo:
        <input type="text" value={cargo} onChange={(e) => setCargo(e.target.value)} required />
      </label>
      </div>
      <div className='form-field'>
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
   </div>
 );
}



export default UserForm;
