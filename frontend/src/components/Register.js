import React, { useState } from 'react';
import api from './Api';
import '../assets/Login.css';
import SudokuTitle from './SudokuTitle'; 

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      const response = await api.post('auth/register', {
        username,
        password
      });

      if (response.status === 201) {
        alert('Usuário registrado com sucesso!');
        onRegister(true); 
        setUsername('');
        setPassword('');
      }
    } catch (error) {
      if (error.response) {
        alert('Erro no registro: ' + error.response.data);
      } else if (error.request) {
        alert('Erro no registro: Nenhuma resposta do servidor');
      } else {
        alert('Erro no registro: ' + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <SudokuTitle />
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Nome de Usuário:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <div className="button-container">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
