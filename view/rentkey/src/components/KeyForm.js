import React, { useState } from 'react';
import './KeyForm.css'; // Certifique-se de criar um CSS apropriado para este formulário

function KeyForm() {
  const [salaDaChave, setSalaDaChave] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const keyData = {
      SalaDaChave: salaDaChave,
      Descricao: descricao,
    };

    // Substitua a URL pela sua endpoint de API específica para criar a chave
    try {
      const response = await fetch('http://localhost:3000/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(keyData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar chave');
      }

      const data = await response.json();
      console.log('Chave criada com sucesso:', data);
      // Limpe o formulário ou redirecione o usuário conforme necessário
    } catch (error) {
      console.error('Erro ao criar chave:', error.message);
    }
  };

  return (
    <div className="App"> {/* Aplica o estilo geral do App */}
      <form onSubmit={handleSubmit} className='key-form-container'>
        <div className='form-field'>
          <label>
            Sala da Chave:
            <input type="text" value={salaDaChave} onChange={(e) => setSalaDaChave(e.target.value)} required />
          </label>
        </div>
        <div className='form-field'>
          <label>
            Descrição:
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </label>
        </div>
        <button type="submit" className="submit-button">Criar Chave</button>
      </form>
    </div>
  );
}

export default KeyForm;
